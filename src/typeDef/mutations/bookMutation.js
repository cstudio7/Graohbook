import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { BookType } from '../types';
import { addBook } from '../../resolvers/bookResolver';

export const addBookMutation = {
  type: BookType,
  description: 'Add a book',
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    coverImage: { type: GraphQLString },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args, context) => addBook(parent, args, context)
};

export const editBookMutation = {};
