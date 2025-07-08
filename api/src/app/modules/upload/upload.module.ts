import { Module } from '@nestjs/common';
import { UploadController } from './infrastructure/controllers/upload.controller';
import { UploadCsvFileUseCase } from './application/use-cases/upload-csv-file.use-case';
import { LocalFileStorageAdapter } from './infrastructure/adapters/file-storage.adapter';
import { FastCsvProcessorAdapter } from './infrastructure/adapters/csv-processor.adapter';
import { FILE_STORAGE_TOKEN, CSV_PROCESSOR_TOKEN } from './upload.constants';

@Module({
  controllers: [UploadController],
  providers: [
    UploadCsvFileUseCase,
    {
      provide: FILE_STORAGE_TOKEN,
      useClass: LocalFileStorageAdapter,
    },
    {
      provide: CSV_PROCESSOR_TOKEN,
      useClass: FastCsvProcessorAdapter,
    },
  ],
})
export class UploadModule {}
