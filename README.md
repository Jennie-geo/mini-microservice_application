# Mini microservice-Project

# Quotes API

Quote API is a nodejs/typescript api that generate quotes at random. There are two services in this quote project.
### 1. Auth Service
Auth Service is the service that is in charge of user authentication. It is an endpoint for user signup. The required validated fields that the user
needs are firstName, lastName, email, and password. A user who successfully signed up will have the details saved in the userDb.json file, a local database for this project with a unique id attached. 
There is an endpoint for login using email and password. There are checks for an already existing email to make the email unique in JSON DB.

### 2. Quotes Service
Quote Service is the service that displays random quotes to a logged-in user. This endpoint is protected and allows only authenticated users.
This service contains two routes. Routes that generate a token for the user and another route that accept a token before sending a randon quote.

## Installation

Use the package manager [npm](https://docs.npmjs.com/) or [yarn](https://classic.yarnpkg.com/lang/en/docs/) to install the dependencies used in this project after it has been clone to your local machine.

```bash
npm install 
```
## Build

This project made use of typescript. Therefore, The src typescript folder will be compiled into a javascript folder with the use 
[tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) command to watch the changing in the project folder.

```bash
tsc -w 
```

## Usage

```python
After installation of all the dependencies of the two services

# Start the two service tsc compilation
tsc -w

# start the Auth Service
npm run dev

# start the Quote Service
npm run dev
```

## Finally
Go to the Auth Service route and copy the endpoint that will create a user. Also, get the endpoint that will log in a user. Go to the Quotes Service route
to access the endpoint that will generate a bearer token for you. This bearer token will be placed in the Authorization section in the postman to check 
for authorization of a particular user. Once done current, you will start generating random quotes with the Author name attached when the request gets sent.
