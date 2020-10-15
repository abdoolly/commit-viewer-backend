# Commit viewer backend

A system to allow to query the github api commits
and check for a repository availability publicly

  

## Installation
to be able to install the system and use it please follow the steps below

### Prerequisite

Please make sure you have those dependencies installed to be able to run the system properly.

- node js
- yarn or npm

#### installing system dependencies

now make sure your terminal is on the root directory of the project then run.
```
yarn

or

npm install
```

  

#### configuring the env file

  

For the system to get up and work properly you need to create the .`env` file
there is a file called `.env.example` you can copy and rename it to `.env`

then you can fill in the values by your desired values below is an example `.env` to make things easy for you

```
NODE_ENV=development
GITHUB_USERNAME=
GITHUB_TOKEN=
GITHUB_URL=https://api.github.com
```

now your environment configs are ready

#### Running the server

for running the server you just need to run the below command

```
yarn build:run
or
npm run build:run
```

this will compile the typescript then run the node server you should now see this message

```
Server is running on http://localhost:3000/health
```

#### Running tests

This will run tests and output the coverage for the project

```
yarn test:coverage
```