const graphql = require('graphql');
const _=require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy data
var books = [
    {name:'Name of the Wind', genre:'Fantasy', id :'1', authorId: '1'},
    {name:'The Final Empire', genre:'Fantasy', id :'2', authorId: '2'},
    {name:'The Long Earth', genre:'Sci-Fi', id :'3', authorId: '2'},
];

var authors = [
  {name:'Patrick Rothfuss', age:44 , id :'1'},
  {name:'Brandon Sanderson', age:42 , id :'2'},
  {name:'Terry Partchett', age:66 , id :'3'},
];

// order is important in BookType so adding fields inside a function
const BookType = new GraphQLObjectType({ 
name: 'Book',
fields: () =>({
  id : {type: GraphQLID},
  name : {type: GraphQLString},
  genre : {type: GraphQLString},
  author : {
    type: AuthorType,
    resolve(parent, args){
      // console.log(parent);
      // return _.find(authors, {id:parent.authorId });
    }
  }
})
});

const AuthorType = new GraphQLObjectType({ 
  name: 'Author',
  fields: () =>({
    id : {type: GraphQLID},
    name : {type: GraphQLString},
    age : {type: GraphQLInt}, 
    books: {
      type: new GraphQLList(BookType), 
      resolve(parent, args){
        // console.log(parent);
        // return _.filter(books, {authorId: parent.id} )
    }
    }
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
          args : {id: {type: GraphQLID}},
          resolve(parent, args){
            // console.log(typeof(args.id));
              // return _.find(books, {id:args.id});
          }
      },
      author: {
        type: AuthorType, 
        args : {id: {type: GraphQLID}},
        resolve(parent, args){
          // return _.find(authors, {id:args.id});
        }
      },
      books: {
        type: new GraphQLList(BookType), 
        resolve(parent, args){
          // return books;
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
          // return authors;
        }
      }
    }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age : {type: GraphQLInt}
      },
      resolve(parent, args ){
        let author = new Author({
          name: args.name,
          age : args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre : {type: GraphQLString},
        authorId: {type: GraphQLID}
      },
      resolve(parent, args){
        let  book = new Book({
          name: args.name, 
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});
   
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});   
