export interface FileStoragePort {
    saveTemp(file: any): Promise<string>;
}
  