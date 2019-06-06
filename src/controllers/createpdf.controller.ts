import { Controller, Get, Res, Post, Body, Render, Param, Query } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserData } from '../dtos/createpdf.userdata.dto';
import { CreateLogInfo } from '../dtos/createpdf.loginfo.dto';
import { CreateRunConf } from '../dtos/createpdf.runconf.dto';
import { CreatePdfService } from '../services/createpdf.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('createpdf')
@Controller('createpdf')
export class CreatepdfController {
  constructor(public createPdfService: CreatePdfService) {}

  /**
   * Get Log information in pdf by id. /createpdf/getlog
   * @param query there must be one id
   * @param res response to client
   */
  @Get('getlog')
  // query is needed, with body or param doesn't works
  async getLogInfo(@Query() query: CreateLogInfo, @Res() res: Response): Promise<void> {
    const epochTime = new Date();
    let params;
    // checking does id exists
    try {
      params = await this.createPdfService.getLogInfoParams(query.id);
    } catch (err) {
      return res.end('No such ID!');
    }
    return this.createPdfService
    .createPdf(params, `Log_${query.id}_${epochTime.getTime()}.pdf`, '/templates/LogInfoTemplate.ejs', res);
  }
  /**
   * Get differense between two runs in pdf
   * by their id. /createpdf/getrunconf
   * @param query there must be two id of runs
   * @param res response to client
   */
  @Get('getrunconf')
  // query is needed, with body or param doesn't works
  async runconf(@Query() query: CreateRunConf, @Res() res: Response): Promise<void> {
    const epochTime = new Date();
    let params;
    // checking does id exists
    try {
      params = await this.createPdfService.getRunConfParams(query.id1, query.id2);
    } catch (err) {
      return res.end('No such ID!');
    }
    return this.createPdfService
    .createPdf(params, `Run_${query.id1}_and_${query.id2}_${epochTime.getTime()}`, '/templates/RunTemplate.ejs', res);
  }
  /**
   * Post bug report in pdf from html form
   * that located in /createpdf. /createpdf/downloadPDF
   * @param res response to client
   * @param userData it is data that is taken from html form
   */
  @Post('downloadPDF')
  makePdf(@Res() res: Response, @Body() userData: CreateUserData): Promise<void> {

    const allDate = this.createPdfService.getDate();
    const epochTime = new Date();
    const fname = userData.fname;
    const lname = userData.lname;
    const occupationData = userData.occupation;
    const bugReportData = userData.bugReport;

    const params = {firstname : fname, lastname : lname, occupation : occupationData, bugReport : bugReportData,
      date : allDate};
    return this.createPdfService
    .createPdf(params, `BugReport_${epochTime.getTime()}.pdf`, '/templates/BugReportTemplate.ejs', res);
   }
   /**
    * Get html form for bug report. /createpdf
    */
   @Get()
   @Render('index')
   showIndex(): string {
   return 'Index';
   }
   /**
    * Get html form for Log information. /createpdf/loginfo
    */
   @Get('loginfo')
   @Render('logInfo')
   LogInfo(): string {
      return 'Log info';
   }
   /**
    * Get html form for differense between two runs. /createpdf/runconf
    */
   @Get('runconf')
   @Render('runinfo')
   RunInfo(): string {
      return 'Run info';
   }
}
