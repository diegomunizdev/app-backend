# Application backend for Gym management

## Main Features

- User authentication;
- Registration of personal trainer and clients managed by the administrator:
    - Admins add and manage users
    - Personals can create the training of their clients
    - Users can view and print workouts
- Specials;
- Monthly payments;


## Prerequisites
- [Node 12.0.0+](https://nodejs.org/en/download/)
- [Typescript 3.9.7+](https://www.typescriptlang.org/)

## Code

This project was generated using NodeJS with Typescript.

## Database 

Database used [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

## Ruuning the application

Choose a directory on your machine and in the terminal run

Using the password protected SSH key.

```sh
git clone git@github.com:diegomunizdev/app-backend.git
```
or

Use Git or checkout with SVN using the web URL.

```sh
git clone https://github.com/diegomunizdev/app-backend.git
```

Right after enter the root directory and run 

```sh
npm install
```

In the root directory look for the `.env.example` file and generate a copy with the name `.env`. Change the data to your settings.

| VARIABLE | DESCRIPTION  | DEFAULT |
|-----|-----|-----|
| `PORT` | Defines which http port the application will run on. | `4000` |
| `TOKEN_SECRET` | Encryption key used to encrypt data stored in localStorage. | `s3cr3tk3y` |
| `CONNECTION_DATABASE` | URI used to connect to the database. | `mongodb+srv://<username>:<password>@cluster0.ncil7.mongodb.net/<dbname>?retryWrites=true&w=majority` |


## Run `npm run dev` for a dev server.