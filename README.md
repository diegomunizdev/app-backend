<div align="center">
   <img src="https://user-images.githubusercontent.com/26802818/101092392-5ad2d600-3598-11eb-9bb2-9f90c1f79983.png" alt="gym" width="170" />
</div>

<div align="center">
   <img src="https://img.shields.io/github/package-json/v/diegomunizdev/app-backend?style=flat-square">
   <img src="https://img.shields.io/github/languages/top/diegomunizdev/app-backend?style=flat-square">
   <img src="https://img.shields.io/github/languages/count/diegomunizdev/app-backend?style=flat-square&color=0066ff">
   <img src="https://img.shields.io/github/repo-size/diegomunizdev/app-backend?style=flat-square&color=009933">
   <img src="https://img.shields.io/github/last-commit/diegomunizdev/app-backend/master?label=master&style=flat-square&color=0066ff">
   <img src="https://img.shields.io/github/last-commit/diegomunizdev/app-backend/develop?label=develop&style=flat-square&color=004466">
   <img src="https://img.shields.io/github/release-date/diegomunizdev/app-backend?style=flat-square">
</div>

<h2 align="center" id="#tecnology">Tecnology</h2>
<div align="center">
   <img src="https://img.shields.io/badge/visualstudiocode%20-%23007ACC.svg?&style=for-the-badge&logo=visual%20studio%20code&logoColor=white&color=004466">
   <img src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white">
   <img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white">
   <img src="https://img.shields.io/badge/mongodb%20-%2343853D.svg?&style=for-the-badge&logoColor=white">
</div>


# Application backend for Gym management

## Main Features

- User authentication;
- Registration of personal trainer and clients managed by the administrator:
    - Admins add and manage users
    - Personals can create the training of their clients
    - Users can view and print workouts
- Specials;
- Monthly payments;

## Code

This project was generated using NodeJS with Typescript.

## Prerequisites
- [Node 12.0.0+](https://nodejs.org/en/download/)
- [Typescript 3.9.7+](https://www.typescriptlang.org/)

## File Structure
open `filestructure.md` to see all the mapped files.

## Insomnia

Import `requests.json` into insomnia to make requests.

## Database 

Database used [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

You need to create a cluster on mangodb and put the link for connection in the `CONNECTION_DATABASE` variable.

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
npm run dev:server
```

#### Route and model documentation available on swagger
```
http://localhost:3001/gym/api
```

![image](https://user-images.githubusercontent.com/26802818/100518645-85c0c280-3171-11eb-9014-1c78d7c8c3af.png)

![image](https://user-images.githubusercontent.com/26802818/100518681-bef93280-3171-11eb-95cd-471691274b23.png)


