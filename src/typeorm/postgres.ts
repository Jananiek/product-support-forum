import { Connection, createConnection } from 'typeorm';

export default class Database {
  public connection: Connection;

  constructor() {
    this.connectToDB();
  }

  private connectToDB(): void {
    createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [`${__dirname}/entities/**/*`],
      migrations: [`${__dirname}/migrations/*`],
      synchronize: true,
      //logging: true,
    })
      .then(_con => {
        this.connection = _con;
        console.log('Connected to db!!');
      })
      .catch(e => {
        console.error(e);
      });
  }
}
