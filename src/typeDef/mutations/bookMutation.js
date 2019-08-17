import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { BookType } from '../types';
import { addBook } from '../../resolvers/bookResolver';

export const addBookMutation = {
  type: BookType,
  description: 'Add a book',
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args) => addBook(args)
};

export const editBookMutation = {};
