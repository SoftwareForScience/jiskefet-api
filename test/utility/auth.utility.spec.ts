// ******************
// TODO: TESTS NEED TO BE AUTHENTICATED IN SOME WAY
// ******************

// import * as request from 'supertest';
// import { Test, TestingModule } from '@nestjs/testing';
// import { RunModule } from '../../src/modules/run.module';
// import { RunService } from '../../src/services/run.service';
// import { AuthUtility } from '../../src/utility/auth.utility';
// import { INestApplication } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Run } from '../../src/entities/run.entity';
// import { expect } from 'chai';
// import { CreateRunDto } from '../../src/dtos/create.run.dto';
// import { plainToClass } from 'class-transformer';

// describe('AuthUtility', () => {
//     let app: INestApplication;
//     let authUtility: AuthUtility;

//     before(async () => {
//         const module: TestingModule = await Test.createTestingModule({}).compile();
//         app = module.createNestApplication();
//         await app.init();
//     });

//     after(async () => {
//         await app.close();
//     });

//     describe('getJwtFromHeaders', () => {
//         const headersWithAuth = {
//             'host': 'localhost:3000',
//             'connection': 'keep-alive',
//             'accept': 'application/json, text/*',
//             'origin': 'http://localhost:8080',
//             'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImViYWNhODQxOGRjOGRhZmQ3YmFmZTZmZWZlZTJkZTczODcwYjNiOWQiLCJpYXQiOjE1NDI4NDI4NzUsImV4cCI6MTU0Mjg0NjQ3NX0.NjlUBIyEvFR0XzQ3Fk5Svj25itbCCAcyfyGpMPSrn2I',
//             'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
//             'dnt': '1',
//             'referer': 'http://localhost:8080/logs',
//             'accept-encoding': 'gzip, deflate, br',
//             'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7'
//         };

//         const headersWithCookieToken = {
//             'host': 'localhost:3000',
//             'connection': 'keep-alive',
//             'upgrade-insecure-requests': '1',
//             'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
//             'dnt': '1',
//             'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//             'accept-encoding': 'gzip, deflate, br',
//             'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
//             'cookie': '_ga=GA1.1.1745498335.1542716010; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImViYWNhODQxOGRjOGRhZmQ3YmFmZTZmZWZlZTJkZTczODcwYjNiOWQiLCJpYXQiOjE1NDI4NDI4NzUsImV4cCI6MTU0Mjg0NjQ3NX0.NjlUBIyEvFR0XzQ3Fk5Svj25itbCCAcyfyGpMPSrn2I'
//         };

//         it('should return JWT from authorization headers', () => {
//             return chai.expect(authUtility.getJwtFromHeaders(headersWithAuth)).to.be.a('string');
//         });

//         it('should return JWT from cookie headers with a token', () => {
//             return chai.expect(authUtility.getJwtFromHeaders(headersWithCookieToken)).to.be.a('string');
//         });
//     });

// });
