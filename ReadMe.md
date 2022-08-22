# Express PG rest API 🛡️

This is a rest API repository to ask and answer questions related to a product.

## Development

We use `node` version `14.9.0`

```
nvm install 14.9.0
```

```
nvm use 14.9.0
```

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```
It uses nodemon for livereloading :peace-fingers:

## Online one-click setup

You can use Gitpod for the one click online setup. With a single click it will launch a workspace and automatically:

- clone the `product-support-forum` repo.
- install the dependencies.
- run `cp .env.example .env`.
- configure database credentials with yours in ` .env` file
- run `npm run start`.

## Data seed
- run `npm run seed:config` then `npm run seed:run`.
- To drop all tables run `npm run schema:drop`.
- To sync the database run `npm run schema:sync`.


 **Example error**

 ```json
 {
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
 }
 ```

[Read more about celebrate here](https://github.com/arb/celebrate) and [the Joi validation API](https://github.com/hapijs/joi/blob/v15.0.1/API.md)

# ED Diagram
[Check here for ERD](https://drive.google.com/file/d/15JlbeHnqiLxJEirG9f2oQrf9pHAyCMyP/view?usp=sharing)



# FAQ
