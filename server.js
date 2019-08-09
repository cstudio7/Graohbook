/* eslint-disable no-undef */
const express = require('express');
const expressGraphQL = require('express-graphql');
const env = require('dotenv');

env.config();

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const authors = [
  { id: 1, name: 'J.K Rowlings' },
  { id: 2, name: 'J.R.R Tolkien' },
  { id: 3, name: 'Brien Weeks' }
];
const books = [
  { id: 1, name: 'Harry Potter 1', authorId: 1 },
  { id: 2, name: 'Harry Potter 2', authorId: 1 },
  { id: 3, name: 'Harry Potter 3', authorId: 1 },
  { id: 4, name: 'Fellowship of the ring 1', authorId: 2 },
  { id: 5, name: 'Fellowship of the ring 2', authorId: 2 },
  { id: 6, name: 'Fellowship of the ring 3', authorId: 2 },
  { id: 7, name: 'Fellowship of the soul 1', authorId: 3 },
  { id: 8, name: 'Fellowship of the soul 2', authorId: 3 }
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This is the list of authors',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      books: {
        type: new GraphQLList(BookType),
        resolve: author => {
          return books.filter(book => book.authorId === author.id);
        }
      }
    })
  });

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This is the list of Books written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: new GraphQLList(AuthorType),
      resolve: book => {
        return authors.find(author => author.id === book.id);
      }
    }
  })
});
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
        type: BookType,
        description: 'A single Book',
        args:{
            id:{type:GraphQLInt},
            name:{type: GraphQLString}
        },
        resolve: (parent, args) =>{
            if (args ==='id'){
               return books.find(book=>book.id===args.id)
            }
            return books.find(book=>book.name===args.name)
        }
      },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all Books',
      resolve: () => books
    },
    author: {
        type: AuthorType,
        description: 'Single authors',
        args:{
            id:{type:GraphQLInt}
        },
        resolve: (parent,args) => authors.find(author=>author.id===args.id)
      },
    authors: {
        type: new GraphQLList(AuthorType),
        description: 'List of all authors',
        resolve: () => authors
      }
  })
});
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})


const app = express();
app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
