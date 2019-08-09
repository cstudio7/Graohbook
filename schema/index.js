import { GraphQLSchema } from 'graphql';
import RootQueryType from './../typeDef/query';
import RootMutationType from '../typeDef/mutations';

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;
