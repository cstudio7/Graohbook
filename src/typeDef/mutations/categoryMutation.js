import { GraphQLString, GraphQLNonNull } from 'graphql';
import { CategoryType } from '../types';
import { addCategory } from '../../resolvers/categoryResolver';

export const addCategoryMutation = {
  type: CategoryType,
  description: 'Add an category',
  args: {
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args, context) => addCategory(parent, args, context)
};

export const editCategoryMutation = {};
export const deleteCategoryMutation = {};
