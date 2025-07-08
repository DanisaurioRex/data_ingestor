export interface CsvProcessorPort {
    process(filePath: string): Promise<void>;
}