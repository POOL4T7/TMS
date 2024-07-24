
const settings = {
  number_of_shards: 1,
  number_of_replicas: 0,
};

const projectMapping = {
  properties: {
    firstName: { type: 'text' },
    email: { type: 'keyword' },
    lastName: { type: 'text' },
    employeeId: { type: 'keyword' },
    status: { type: 'keyword' },
    departmentId: {
      properties: {
        _id: { type: 'keyword' },
        name: { type: 'text' },
      },
    },
  },
};

import EsClient from '../services/EsClient';

async function createIndex() {
  try {
    const res = await EsClient.createIndex('project', settings, projectMapping);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

createIndex();
