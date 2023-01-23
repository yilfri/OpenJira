# Next.js OpenJira App

To run app, need Database

```
docker-compose up -d
```

- The -d mean **detached**

- MongoDB URL Local

```
mongodb://localhost:27017/entriesdb
```

## Config enviroment variables

Rename **.env.template** to **.env**

## Fill DB with test info.

Get

```
http://localhost:3000/api/seed
```
