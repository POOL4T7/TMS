import { Schema } from 'redis-om';
import RedisOM from '../services/RedisOm.service';

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
  } catch (err) {
    console.log('err', err);
  }
};

export default repo;
