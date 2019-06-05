import { Controller, Get, Res, Post, Body, Render, Param, Query} from '@nestjs/common';
import {Response} from 'express';
import {createUserData, createLogInfo,createRunConf} from '../dtos/createpdf.dto';
import {CreatePdfService} from "../services/createpdf.service";
import { Log } from '../entities/log.entity';
import { getManager } from 'typeorm';
import { Run } from '../entities/run.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('createpdf')
@Controller('createpdf')
export class CreatepdfController {
  constructor(public createPdfService: CreatePdfService){};

  @Get('getlog')
  async getLogInfo(@Query() query: createLogInfo, @Res() res: Response): Promise<void>{
    var allDate = this.createPdfService.getDate();

    const repository = getManager().getRepository(Log);
    
    const result = await repository.createQueryBuilder("log")
      .leftJoinAndSelect("log.user", "user_id, external_id, sams_id")
      .where("log.log_id = :id", {id: query.id})
      .getOne();

    let params = {user:result["user"]["userId"], external:result["user"]["externalUserId"], sams:result["user"]["samsId"], logId:result["logId"],
    subsytemID:result["subsystemFkSubsystemId"], subtype:result["subtype"], origin:result["origin"], creationTime:result["creationTime"],
    title:result["title"], text:result["text"]};
    return this.createPdfService.createPdf(params, `Log ${allDate}.pdf`, "/templates/LogInfoTemplate.ejs", res);   
  }

  @Get('getrunconf')
  async runconf(@Query() query:createRunConf, @Res() res: Response): Promise<void>{
    var allDate = this.createPdfService.getDate();
   const repository = getManager().getRepository(Run);
   
  const result = await repository.createQueryBuilder("run")
    .where("run.run_number = :number",{number: query.id1})
    .getOne();
    const result2 = await repository.createQueryBuilder("run")
    .where("run.run_number = :number",{number: query.id2})
    .getOne();
    let params={Run1: result["runNumber"],O21: result["timeO2Start"],TargetStart1: result["timeTrgStart"],TargetEnd1: result["timeTrgEnd"],
    o2End1:result["timeO2End"],runType1:result["runType"],RunQuality1: result["runQuality"],NumbDetectors1: result["nDetectors"],
    numberFlips1: result["nFlps"],timeFrame1:result["nTimeframes"],SubTimeFrame1:result["nSubtimeframes"],Readout1: result["bytesReadOut"],
    Bytestimeframe1: result["bytesTimeframeBuilder"],
    Run2: result2["runNumber"],O22: result2["timeO2Start"],TargetStart2: result2["timeTrgStart"],TargetEnd2: result2["timeTrgEnd"],
    o2End2:result2["timeO2End"],runType2:result2["runType"],RunQuality2: result2["runQuality"],NumbDetectors2: result["nDetectors"],
    numberFlips2: result2["nFlps"],timeFrame2:result2["nTimeframes"],SubTimeFrame2:result2["nSubtimeframes"],Readout2: result2["bytesReadOut"],
    Bytestimeframe2: result2["bytesTimeframeBuilder"],
    Data:allDate
    
    }
  
    return this.createPdfService.createPdf(params, `Run ${allDate}`, "/templates/RunTemplate.ejs", res);  
   
  }

  @Post('downloadPDF')
  makePdf(@Res() res: Response, @Body() userData: createUserData): void {
    
    var allDate = this.createPdfService.getDate();
    let fname = userData.fname;
    let lname = userData.lname;
    let occupation = userData.occupation;
    let bugReport = userData.bugReport;
   
    const params = {firstname : fname, lastname: lname, occupation: occupation, bugReport:bugReport, date:allDate};
    return this.createPdfService.createPdf(params, `BugReport ${allDate}.pdf`, "/templates/BugReportTemplate.ejs", res);   
   }

   @Get()
   @Render("index")
   func(){
  
   return {};
   }

   @Get("loginfo")
   @Render("logInfo")
   LogInfo(){
      return{};
   }

   @Get("runconf")
   @Render("runinfo")
   RunInfo(){
      return{};
   }


}
