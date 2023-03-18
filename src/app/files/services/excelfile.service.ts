import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import * as XLSX from "xlsx";
import { File } from "@nativescript/core";
import { FileService } from "./file.service";

export type ExcelData = {
  head: string[];
  rows: any[];
};

interface IFileService {
  share(args: { path: string; fileName: string }): Promise<boolean> | undefined;
  open(args: { path: string }): boolean;
  save(args: any): Promise<any> | undefined;
}

@Injectable()
export class ExcelFileService implements IFileService {
  constructor(private files: FileService) {}

  async getReports(): Promise<File[]> {
    const folder = this.files.getFolder();
    const entities = await folder?.getEntities();
    if (folder && entities) {
      return entities.map((x) => folder.getFile(x.name));
    }
    return []
  }

  save(args :{date: Date, fileName: string, data: ExcelData}) {
    const fileDate = args.date;
    const fileName = `${args.fileName}-${fileDate.getUTCFullYear()}-${fileDate.getUTCMonth()}-${fileDate.getUTCDate()}.csv`;

    const content = this.createFileContent(
      args.data,
      args.fileName
    );

    return this.files.save({ content, fileName });
  }

  share(args: { path: string; fileName: string }) {
    return this.files.share(args);
  }
  open(args: { path: string }): boolean {
    return this.files.open(args);
  }

  delete(args: { fileName: string }) {
    return this.files.delete(args);
  }

  private createFileContent(data: ExcelData, sheetName: string) {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([data.head, data.rows]);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    return XLSX.write(workbook, { type: "string", bookType: "csv" });
  }
}
