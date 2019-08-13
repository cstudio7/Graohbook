import { UserType } from '../types';
import { currentUser } from '../../resolvers/authResolver';

export const userQuery = {
  type: UserType,
  description: 'Current User',
  resolve: () => currentUser()
};

export default {
  me: userQuery
};
