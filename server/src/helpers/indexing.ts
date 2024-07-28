// Import necessary modules
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });
import EsClient from '../services/EsClient';
import User from '../models/User.model';
import { IUser } from '../interfaces/User.interface';
import connectDB from '../../config/db';
import '../models/Department.model';

// Elasticsearch index settings and mappings
const settings = {
  number_of_shards: 1,
  number_of_replicas: 0,
};

const userMapping = {
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

// Function to create Elasticsearch index
async function createIndex() {
  try {
    const res = await EsClient.createIndex('users', settings, userMapping);
    console.log('Index creation response:', res);
  } catch (e) {
    console.error('Error creating index:', e);
    process.exit(1);
  }
}

// Function to add user data to Elasticsearch
async function addUserDataToES() {
  try {
    // Connect to the database
    await connectDB();
    const data: IUser[] = await User.find({})
      .select('firstName email lastName employeeId status departmentId')
      .populate({ path: 'departmentId', select: 'name' })
      .lean();
    const body = data.flatMap((item) => {
      const id = item._id;
      delete item._id;
      return [
        { index: { _index: 'users', _id: id } },
        {
          ...item,
        },
      ];
    });

    const res = await EsClient.bulkUpload('users', body);
    console.log('Users added response:', res);
  } catch (e) {
    console.error('Error adding users to Elasticsearch:', e);
  }
}

// Main execution flow
(async function main() {
  await createIndex();
  await addUserDataToES();
})();
