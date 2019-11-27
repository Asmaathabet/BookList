## Setup Server Locally : 
* `mkdir server`
* `cd server`
* `npm init -y`
* `npm install express`
* install nodemon 
`npm i nodemon --D`
* install graphql for express
`npm install graphql express-graphql`
* install Lodash Library to retrieve data and edit on it 
`npm install lodash`
* to open Graphiql in `http://localhost:5000/graphql` you should add assign value to true
```
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));
```
### Advices
* if you faced problem in caches in git
`git rm --cached server -f`

* to install MonogoDB 
`npm install mongoose`

* create react app 
`create react-app client`

* MongoDB website
`https://cloud.mongodb.com`

* Apolo client website
` https://www.apollographql.com/docs/react/ `

## BookList Image:     

![bookList](https://user-images.githubusercontent.com/29041512/69756806-0d8d7e80-1164-11ea-9214-59a0a97f5bf0.png)


