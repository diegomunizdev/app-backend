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

## File Structure

```
filestructure.md
```

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
| `PORT` | Defines which http port the application will run on. | `3001` |
| `TOKEN_SECRET` | Encryption key used to encrypt data stored in localStorage. | `s3cr3tk3y` |
| `CONNECTION_DATABASE` | URI used to connect to the database. | `mongodb+srv://<username>:<password>@cluster0.ncil7.mongodb.net/<dbname>?retryWrites=true&w=majority` |




### Start the server and access the swagger api
```
npm run dev
```

#### Route and model documentation available on swagger
```
http://localhost:3001/gym/api
```

![image](https://user-images.githubusercontent.com/26802818/100518645-85c0c280-3171-11eb-9014-1c78d7c8c3af.png)

![image](https://user-images.githubusercontent.com/26802818/100518681-bef93280-3171-11eb-95cd-471691274b23.png)


