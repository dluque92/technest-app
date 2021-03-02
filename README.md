# technest-app

For this project, I followed the following steps:
1. Create a Docker container to be able to alocate the MongoDB.
2. Using Robot 3T create a new MongoDB.
3. Create a BE application ussing NestJS, @nestjs/graphql, apollo-server-express and @nestjs/websocket. Also calling a real API to get currentExchange (cryptocompare.com).
4. Create a FE application using Angular (with Lazy Loading), Angular Material, ngx-transale, momentjs, apollo-angular, graphql and socker.io-client.

All cases has been tested using GraphQL playgroud.

The testing on the BE side has been fully covered based on the requirements, on the other hand, on the FE side, all test has been fixed but no one new has been implemented appart of the cli auto generated onces. 

Followed angular commit convention (please check commit history).

In addition, the internationalization is already implemented with a custom pagination translations.

Steps to run the project: 

Install docker: docker run —name mongo -p 27017:27017 -d mongo
Go to robot 3T an create a new local
clone project and run npm install

For FE side: 
Just clone the repository and run npm install

Also if you want, you can run ng serve --hmr
To enable Hot module replacement during execution