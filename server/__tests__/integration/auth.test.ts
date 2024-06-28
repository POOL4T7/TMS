import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import connectDB, { disconnectDB } from '../../config/db';
import dotenv from 'dotenv';
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Is Server is working', () => {
  it('should fetch data from /api endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.body.success).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveLength(0);
  });
});

describe('JWT Token', () => {
  
});
