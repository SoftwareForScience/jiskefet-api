import { Injectable, Res } from '@nestjs/common';
import {Response} from 'express';
import {join} from "path";
import * as ejs from "ejs";
import * as pdfMake from "html-pdf";

@Injectable()
export class CreatePdfService {
  getDate(): string {
    var date = new Date(); 
    var day = date.getDate();
    var strDay : string;
    var strMonth : string;
    var strHour : string;
    var strMin : string;
    if (day < 10){
    strDay = String(day);
    strDay = "0" + strDay;
    } else { 
    strDay = String(day);
    }
    var month = date.getMonth() + 1;
    if (month < 10){
    strMonth = String(month);
    strMonth = "0" + month;
    } else{
    strMonth = String(month);
    }
    const year = date.getFullYear();
    var hour = date.getHours();
    if (hour < 10){
    strHour = String(hour);
    strHour = "0" + hour;
    } else {
    strHour = String(hour);
    }
    var min = date.getMinutes();
    if (min < 10){
    strMin = String(min);
    strMin = "0" + min;
    } else {
    strMin = String(min);
    }
    var allDate = strHour + ":" + strMin + " " + strDay + "." + strMonth + "." + String(year);
    return allDate;
  }
  createPdf(params, fileName: string, pathToEjs:string, @Res() res: Response): void{
    ejs.renderFile(join(__dirname, '..', pathToEjs), params, function(err, html) {
        if(err){
            console.log(err);
        }
       
        const options = { format: 'A4', orientation: 'portrait'};
          pdfMake.create(html, options).toBuffer(function(err, buffer){
            if (err){
              res.end("Error");
              console.log(err);
            }
           
    
            res.writeHead(200, {
              "Content-type": "application/pdf",
              "Content-Disposition": 'attachment;filename="{name}.pdf"'.replace('{name}', fileName)
            });
           return res.end(buffer);
    });
    });
  }

  getRandomInt(min: number, max: number): number{
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
}