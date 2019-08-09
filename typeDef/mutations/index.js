import { GraphQLObjectType } from 'graphql';
import { addBookMutation } from './bookMutation';
import { addAuthorMutation } from './authorMutation';

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: addBookMutation,
    addAuthor: addAuthorMutation
  })
});

export default RootMutationType;
