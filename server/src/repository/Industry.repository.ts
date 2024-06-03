import { Schema } from 'redis-om';
import RedisOM from '../services/RedisOm.service';
import Logger from '../helpers/Logger';

const IndustrySchema = new Schema(
  'Industry',
  {
    name: { type: 'string' },
    slug: { type: 'string' },
    descriptione: { type: 'string' },
  },
  {
    dataStructure: 'JSON',
  }
);

const repo = async () => {
  try {
    const Client = await RedisOM.initialize();
    const repo = Client?.fetchRepository(IndustrySchema);
    await repo?.createIndex();
    return repo;
  } catch (err: any) {
    Logger.error(`RedisOm Industry Repo error: ${err.message}`);
  }
};

export default repo;
