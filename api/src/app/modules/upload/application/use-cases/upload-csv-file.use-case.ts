import { Injectable, Inject } from '@nestjs/common';
import type { CsvProcessorPort } from '../../domain/ports/csv-processor.port';
import type { FileStoragePort } from '../../domain/ports/file-storage.port';
import { FILE_STORAGE_TOKEN, CSV_PROCESSOR_TOKEN } from '../../upload.constants';

@Injectable()
export class UploadCsvFileUseCase {
  constructor(
    @Inject(FILE_STORAGE_TOKEN) private readonly fileStorage: FileStoragePort,
    @Inject(CSV_PROCESSOR_TOKEN) private readonly csvProcessor: CsvProcessorPort,
  ) {}

  async execute(file: any): Promise<void> {
    const path = await this.fileStorage.saveTemp(file);
    await this.csvProcessor.process(path);
  }
}
