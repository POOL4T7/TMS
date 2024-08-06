import { GraphQLError } from 'graphql';
import User from '../../models/User.model';
import { UserFilter } from 'src/interfaces/User.interface';

export const resolvers = {
  Query: {
    users: async (_: any, { filter }: { filter: UserFilter }) => {
      try {
        return await User.find(filter).populate({ path: 'departmentId' });
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
