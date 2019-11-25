const graphql = require('graphql');
const _=require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// dummy data
var books = [
    {name:'Name of the Wind', genre:'Fantasy', id :'1'},
    {name:'The Final Empire', genre:'Fantasy', id :'2'},
    {name:'The Long Earth', genre:'Sci-Fi', id :'3'},
];
// order is important in BookType so adding fields inside a function
const BookType = new GraphQLObjectType({ 
name: 'Book',
fields: () =>({
  id : {type: GraphQLString},
  name : {type: GraphQLString},
  genre : {type: GraphQLString}
})
});
// order is not important so there is no need to add field in the function 
//code to get data from db / other source
// find , change data from array using lodash
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      book: { 
          type: BookType,
          args : {id: {type: GraphQLString}},
          resolve(parent, args){
              return _.find(books, {id:args.id});
          }
      } 
    }
});
   
module.exports = new GraphQLSchema({
query: RootQuery
});   
