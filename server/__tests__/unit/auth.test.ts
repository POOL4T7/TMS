import { describe, it, expect, beforeAll } from '@jest/globals';
import { TokenInput } from '../../src/interfaces/Custum.inteface';
import JwtService from '../../src/services/Token.service';
import EmailService from '../../src/services/Email.service';

let validToken: string;
let invalidToken: string;

describe('JWT Token Service', () => {
  let validTokenData: TokenInput;
  let invalidTokenData: any;

  beforeAll(() => {
    validTokenData = {
      _id: 'gulahsxjanxanxaxaxax12@%',
      email: 'test@gmail.com',
      userId: 'gulahsxjanxanxaxaxax12@%',
      role: 'employee',
    };
    invalidTokenData = {
      _id: 'jhasbcsdjc scds',
      name: 'asbxjsbkj',
    };

    validToken = JwtService.generateToken(validTokenData);
    invalidToken = JwtService.generateToken(invalidTokenData);
  });

  it('should create a token with valid data', () => {
    expect(validToken).toBeDefined();
    expect(validToken).not.toBe('');
  });

  it('should create a token with invalid data', () => {
    expect(invalidToken).toBeDefined();
    expect(invalidToken).not.toBe('');
  });

  it('should verify a valid token', () => {
    const res = JwtService.verifyToken(validToken);
    expect(res).toHaveProperty('_id', validTokenData._id);
    expect(res).toHaveProperty('email', validTokenData.email);
    expect(res).toHaveProperty('userId', validTokenData.userId);
  });

  it('should verify an invalid token', () => {
    const res = JwtService.verifyToken(invalidToken);
    expect(res).toHaveProperty('_id', invalidTokenData._id);
    expect(res).toHaveProperty('name', invalidTokenData.name);
  });
});

describe('Email Service', () => {
  // const email = 'abhinavg90834@gmail.com';
  const subject = 'Jest testing';
  const textPart = 'Enjoy!';
  const link = `${process.env.WEB_URL}/jest-unit-testing`;

  // it('should send email successfully', async () => {
  //   const token = JwtService.generateToken({ email });
  //   const html = `Hey Admin, don't worry, we are testing the developer code.<br/><br/> <a href="${link}?token=${token}">Verify Email</a>`;

  //   const res = await EmailService.sendEmail(email, subject, textPart, html);

  //   expect(res).toBeUndefined();
  //   // console.log('Email sent successfully:');
  // });

  it('should handle email sending failure', async () => {
    expect.assertions(1);
    const token = JwtService.generateToken({ email: '' });
    const html = `Hey Admin, don't worry, we are testing the developer code.<br/><br/> <a href="${link}?token=${token}">Verify Email</a>`;

    try {
      await EmailService.sendEmail('', subject, textPart, html);
      // console.log('Unexpected success:', res);
    } catch (e: any) {
      // console.error('Email sending failed:', e.message);
      expect(e.message).toBeDefined();
    }
  });
});
