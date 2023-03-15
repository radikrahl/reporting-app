import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import * as XLSX from "xlsx";
import { File } from "@nativescript/core";
import { FileService } from "./file.service";

type ExcelData = {
  head: string[];
  rows: any[];
};

interface IFileService {
  share(args: { path: string; fileName: string }): Promise<boolean>;
  open(args: { path: string }): boolean;
  save(args: any): Promise<void>;
}

@Injectable()
export class ExcelFileService implements IFileService {
  constructor(private files: FileService) {}

  async getReports(): Promise<File[]> {
    const folder = this.files.getFolder();
    const entities = await folder.getEntities();

    return entities.map((x) => folder.getFile(x.name));
  }

  save(object: FormArray) {
    const fileDate = <Date>object.controls[0].get("date").value;
    const parentName = <string>object.controls[0].get("parentName").value;

    const fileName = `${parentName}-${fileDate.getUTCFullYear()}-${fileDate.getUTCMonth()}-${fileDate.getUTCDate()}.csv`;

    const content = this.createFileContent(
      this.createExcelData(object),
      parentName
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

  private createExcelData(form: FormArray): ExcelData {
    var head = [];
    var rows: any[] = [];

    for (let index = 0; index < form.controls.length; index++) {
      const group: FormGroup = <FormGroup>form.controls[index];
      for (var controlKey in group.controls) {
        var control = <FormControl>group.controls[controlKey];

        if (!control.disabled) {
          head.push(controlKey);
          rows.push(control.value);
        }
      }
    }

    return { head, rows };
  }
}
