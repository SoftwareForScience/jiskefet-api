import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as ejs from 'ejs';
import * as pdfMake from 'html-pdf';
import { getManager } from 'typeorm';
import { Log } from 'entities/log.entity';
import { Run } from 'entities/run.entity';

@Injectable()
export class CreatePdfService {
  /**
   * This function gets current
   * data to specify it in PDF
   * document
   */
  getDate(): string {
    const date = new Date();
    const day = date.getDate();
    let strDay: string;
    let strMonth: string;
    let strHour: string;
    let strMin: string;
    if (day < 10) {
    strDay = String(day);
    strDay = '0' + strDay;
    } else {
    strDay = String(day);
    }
    const month = date.getMonth() + 1;
    if (month < 10) {
    strMonth = String(month);
    strMonth = '0' + month;
    } else {
    strMonth = String(month);
    }
    const year = date.getFullYear();
    const hour = date.getHours();
    if (hour < 10) {
    strHour = String(hour);
    strHour = '0' + hour;
    } else {
    strHour = String(hour);
    }
    const min = date.getMinutes();
    if (min < 10) {
    strMin = String(min);
    strMin = '0' + min;
    } else {
    strMin = String(min);
    }
    const allDate = `${strHour}:${strMin} ${strDay}.${strMonth}.${year}`;
    return allDate;
  }
  /**
   * This function creates and sends
   * PDF document to client
   * @param params this is parameters that
   * puts in .ejs template
   * instead of vars
   * @param fileName it is the name of file
   * when it will be downloaded
   * @param pathToEjs this is path to the .ejs
   * template
   * @param res this is Response object, that used
   * for sending PDF to client
   */
  async createPdf(params: {}, fileName: string, pathToEjs: string, @Res() res: Response): Promise<void> {
    const html = await ejs.renderFile(join(__dirname, '..', pathToEjs), params); // rendering html string with params
    const options = { format : 'A4', orientation : 'portrait'}; // setting options for PDF
    // creating PDF
    pdfMake.create(html, options)
    .toBuffer(function returnPDF(err: NodeJS.ErrnoException, buffer: Buffer): void {
      if (err) {
        console.log(err);
        return res.end(err);
      }
      res.writeHead(200, {
        'Content-type': 'application/pdf',
        'Content-Disposition': 'attachment;filename="{name}.pdf"'.replace('{name}', fileName)
      });
      return res.end(buffer); // sendind ready PDF to client
    });
  }
  /**
   * This function gets params for
   * LogInfo template
   * from database
   * @param Id this is ID of log
   */
  async getLogInfoParams(Id: number): Promise<any> {
    const repository = getManager().getRepository(Log);

    const result = await repository.createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user_id, external_id, sams_id')
      .where('log.log_id = :id', {id: Id})
      .getOne();

    const params = { user : result.user.userId, external : result.user.externalUserId, sams : result.user.samsId,
      logId : result.logId, subsytemID : result.subsystemFkSubsystemId, subtype : result.subtype,
      origin : result.origin, creationTime : result.creationTime,
      title : result.title, text : result.text};
    return params;
  }
  /**
   * This function gets params for
   * RunConf template
   * from database
   * @param Id1 this is ID of the first run
   * @param Id2 this is ID of the second run
   */
  async getRunConfParams(Id1: number, Id2: number): Promise<any> {
    const repository = getManager().getRepository(Run);

    const firstResult = await repository.createQueryBuilder('run')
      .where('run.run_number = :number', {number: Id1})
      .getOne();
    const secondResult = await repository.createQueryBuilder('run')
      .where('run.run_number = :number', {number: Id2})
      .getOne();
    const params = {Run1 : firstResult.runNumber, O21 : firstResult.timeO2Start,
        TargetStart1 : firstResult.timeTrgStart, TargetEnd1 : firstResult.timeTrgEnd, o2End1 : firstResult.timeO2End,
        runType1 : firstResult.runType, RunQuality1 : firstResult.runQuality, NumbDetectors1 : firstResult.nDetectors,
        numberFlips1 : firstResult.nFlps, timeFrame1 : firstResult.nTimeframes,
        SubTimeFrame1 : firstResult.nSubtimeframes, Readout1 : firstResult.bytesReadOut,
        Bytestimeframe1 : firstResult.bytesTimeframeBuilder, Run2 : secondResult.runNumber,
        O22 : secondResult.timeO2Start, TargetStart2 : secondResult.timeTrgStart,
        TargetEnd2 : secondResult.timeTrgEnd, o2End2 : secondResult.timeO2End, runType2 : secondResult.runType,
        RunQuality2 : secondResult.runQuality, NumbDetectors2 : secondResult.nDetectors,
        numberFlips2 : secondResult.nFlps, timeFrame2 : secondResult.nTimeframes,
        SubTimeFrame2 : secondResult.nSubtimeframes, Readout2 : secondResult.bytesReadOut,
        Bytestimeframe2 : secondResult.bytesTimeframeBuilder, Data : this.getDate()};
    return params;
  }

}
