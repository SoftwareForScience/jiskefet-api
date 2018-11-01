// import { LogService } from '../../src/services/log.service';
// import { Test, TestingModule } from '@nestjs/testing';
// import { CreateLogDto } from '../../src/dtos/create.log.dto';
// import * as chai from 'chai';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Log } from '../../src/entities/log.entity';
// import sinon from 'sinon';
// import { create } from 'domain';

// // This repo is not reached for some reason, and it uses create in the real repo.
// const mockRepository = {
//     create(log: Log) {
//         return log;
//     },
//     save() {
//         return 'hi';
//     }
// };

// describe('LogService', () => {
//     let logService: LogService;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 LogService,
//                 {
//                     provide: 'LogRepository',
//                     useClass: Repository,
//                 }
//             ],
//         })
//             .overrideProvider(getRepositoryToken(Log))
//             .useValue(mockRepository)
//             .compile();

//         logService = module.get<LogService>(LogService);
//     });

//     describe('create()', () => {
//         let log: CreateLogDto;
//         let createLog: any;

//         beforeEach(() => {
//             log = new CreateLogDto();
//             log.title = 'title';
//             log.text = 'text';
//             log.subtype = 'run';
//             log.origin = 'human';
//             log.creationTime = new Date('2018-10-29T18:13:24.789Z');

//             createLog = sinon.stub(new LogService(new Repository()), 'create' as any);
//         });

//         afterEach(() => {
//             createLog.restore();
//         });

//         it('should return a Log', () => {
//             createLog(log).yields(log);
//         });

//     });

//     // describe('findAll()', () => {

//     //     it('should return a Log', () => {
//     //         return chai.expect(logService.create(log)).to.not.be.null;
//     //     });

//     // });
// });
