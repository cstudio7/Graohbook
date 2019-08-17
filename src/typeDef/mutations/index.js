import { GraphQLObjectType } from 'graphql';
import { addBookMutation } from './bookMutation';
import { addAuthorMutation } from './authorMutation';
import { signUpMutation, loginMutation } from './authUserMutation';

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: addBookMutation,
    addAuthor: addAuthorMutation,
    login: loginMutation,
    signup: signUpMutation
  })
});

export default RootMutationType;
