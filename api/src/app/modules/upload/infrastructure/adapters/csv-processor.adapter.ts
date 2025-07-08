import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import { CsvProcessorPort } from '../../domain/ports/csv-processor.port';

@Injectable()
export class FastCsvProcessorAdapter implements CsvProcessorPort {
  async process(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath);
      const parser = fastCsv.parse({ headers: true })
        .on('data', (row) => {
          console.log('Parsed row:', row);
        })
        .on('end', resolve)
        .on('error', reject);

      stream.pipe(parser);
    });
  }
}
