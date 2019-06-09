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

}
