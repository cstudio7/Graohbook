import { GraphQLObjectType } from 'graphql';
import { singleBookQuery, allBooksQuery } from './bookQuery';
import { singleAuthorQuery, allAuthorsQuery } from './authorQuery';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: singleBookQuery,
    books: allBooksQuery,
    author: singleAuthorQuery,
    authors: allAuthorsQuery
  })
});

export default RootQueryType;
