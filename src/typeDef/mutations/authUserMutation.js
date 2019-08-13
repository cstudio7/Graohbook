import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UserType } from '../types';
import { signUpUser, loginUser } from '../../resolvers/authResolver';

export const signUpMutation = {
  type: UserType,
  description: 'Sign up user',
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    isAdmin: { type: GraphQLNonNull(GraphQLBoolean) }
  },
  resolve: (parent, args) => signUpUser(args)
};

export const loginMutation = {
  type: UserType,
  description: 'Login user',
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args) => loginUser(args)
};
