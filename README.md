Setup the app : 
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
* if you faced problem in caches in git
`git rm --cached server -f`

