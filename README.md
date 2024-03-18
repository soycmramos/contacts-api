# Contacts API
Express application to manage contacts with SQLite database

## Development setup

```bash
git clone https://github.com/soycmramos/contacts-api.git
```

```bash
cd contacts-api
```

```bash
yarn install
```

```bash
yarn dev
```

## Testing

```bash
yarn test
```

Open ./mochawesome-report/mochawesome.html in browser

![Testing](./src/public/tests.jpeg)

Go to /api-docs to see the signature documentation

## ENV File

Check `.env.example` file

```properties
PORT
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
```
