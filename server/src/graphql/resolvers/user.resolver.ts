import { GraphQLError } from 'graphql';
import User from '../../models/User.model';

export const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find().populate({ path: 'departmentId' });
      } catch (e) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: 'id',
          },
        });
      }
    },
    user: async (_: any, { id }: { id: string }) => {
      try {
        return await User.findById(id);
      } catch (e) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: 'id',
          },
        });
      }
    },
    isHealty: () => 'Healthy',
  },
};
