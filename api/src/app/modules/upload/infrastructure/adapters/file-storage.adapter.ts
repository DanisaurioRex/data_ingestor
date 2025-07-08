import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { FileStoragePort } from '../../domain/ports/file-storage.port';

@Injectable()
export class LocalFileStorageAdapter implements FileStoragePort {
  async saveTemp(file: any): Promise<string> {
    const dir = './tmp';
    await fs.mkdir(dir, { recursive: true });
    const filePath = join(dir, `${Date.now()}-${file.originalname}`);
    await fs.writeFile(filePath, file.buffer);
    return filePath;
  }
}
