import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadCsvFileUseCase } from '../../application/use-cases/upload-csv-file.use-case';

@Controller('upload')
export class UploadController {
  constructor(private readonly useCase: UploadCsvFileUseCase) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    await this.useCase.execute(file);
    return { message: 'File uploaded and processed' };
  }
}