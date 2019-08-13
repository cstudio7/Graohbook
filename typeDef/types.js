import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import { findBookAuthor } from './../resolvers/authorResolver';
import { findAuthorsBooks } from './../resolvers/bookResolver';

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This is the list of Books written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: book => findBookAuthor(book)
    }
  })
});

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This is the list of authors',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: author => findAuthorsBooks(author)
    }
  })
});
