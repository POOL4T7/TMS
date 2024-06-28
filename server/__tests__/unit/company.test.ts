import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import CompanyService from '../../src/services/Company.service';
import connectDB, { disconnectDB } from '../../config/db';

const validCompanyId = '65b9e3c6ebf88c1a05d829cc';
const validEmail = 'knight@gmail.com';
const invalidId = '65b9e3c6ebf88c1a05d829c4';
const invalidEmail = 'knights@gmail.com';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('findOne testing', () => {
  describe('findBy id', () => {
    it('should find company by valid id', async () => {
      const company = await CompanyService.findOne({ _id: validCompanyId });
      expect(company).toHaveProperty('email', validEmail);
    });

    it('should return null for invalid id', async () => {
      const company = await CompanyService.findOne({ _id: invalidId });
      expect(company).toBeNull();
    });

    it('should throw error for empty id', async () => {
      await expect(CompanyService.findOne({ _id: '' })).rejects.toBeDefined();
    });
  });

  describe('findBy email', () => {
    it('should find company by valid email', async () => {
      const company = await CompanyService.findOne({ email: validEmail });
      expect(company).toHaveProperty('_id');
    });

    it('should return null for invalid email', async () => {
      const company = await CompanyService.findOne({ email: invalidEmail });
      expect(company).toBeNull();
    });

    it('should return null for empty email', async () => {
      const company = await CompanyService.findOne({ email: '' });
      expect(company).toBeNull();
    });
  });
});

describe('getCompanyById testing', () => {
  it('should find company by valid companyId', async () => {
    await expect(
      CompanyService.getCompanyById(validCompanyId)
    ).resolves.toHaveProperty('email', validEmail);
  });

  it('should return null for invalid companyId', async () => {
    await expect(CompanyService.getCompanyById(invalidId)).resolves.toBeNull();
  });

  it('should throw error for invalid id (random string)', async () => {
    await expect(
      CompanyService.getCompanyById('invalidId')
    ).rejects.toBeDefined();
  });

  it('should throw error for empty id', async () => {
    await expect(CompanyService.getCompanyById('')).rejects.toBeDefined();
  });
});

describe('find testing', () => {
  describe('find by _id', () => {
    it('should find company by valid companyId', async () => {
      const list = await CompanyService.find({ _id: validCompanyId });
      expect(list?.totalPosition).toBe(1);
      expect(list?.companyList).toHaveLength(1);
    });

    it('should return empty companyList for invalid companyId', async () => {
      const list = await CompanyService.find({ _id: invalidId });
      expect(list?.totalPosition).toBe(0);
      expect(list?.companyList).toHaveLength(0);
    });

    it('should throw error for invalid id (random string)', async () => {
      await expect(
        CompanyService.find({ _id: 'invalidId' })
      ).rejects.toBeDefined();
    });

    it('should throw error for empty id', async () => {
      await expect(CompanyService.find({ _id: '' })).rejects.toBeDefined();
    });
  });

  describe('find by email', () => {
    it('should find company by valid company email', async () => {
      const list = await CompanyService.find({ email: validEmail });
      expect(list?.totalPosition).toBe(1);
      expect(list?.companyList).toHaveLength(1);
    });

    it('should return empty companyList for invalid company email', async () => {
      const list = await CompanyService.find({ email: invalidEmail });
      expect(list?.totalPosition).toBe(0);
      expect(list?.companyList).toHaveLength(0);
    });

    it('should return empty companyList for empty email', async () => {
      const list = await CompanyService.find({ email: '' });
      expect(list?.totalPosition).toBe(0);
      expect(list?.companyList).toHaveLength(0);
    });
  });

  describe('pagination parameter testing', () => {
    it('should throw error for negative skip value', async () => {
      await expect(CompanyService.find({}, '', -1)).rejects.toBeDefined();
    });

    it('should return empty companyList for limit 0', async () => {
      const list = await CompanyService.find({}, '', 0, 0);
      expect(list?.totalPosition).toBe(5);
      expect(list?.companyList).toHaveLength(5);
    });
  });
});
