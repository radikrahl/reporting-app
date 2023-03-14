import { Component } from "@angular/core";
import { BehaviorSubject, from, Observable, tap } from "rxjs";
import { ExcelFileService } from "../services/excelfile.service";
import { File, Utils } from "@nativescript/core";
import { ad } from "@nativescript/core/utils";

@Component({
  selector: "afriknow-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"],
  providers: [ExcelFileService],
})
export class FilesComponent {
  reports$: Observable<File[]>;
  constructor(private files: ExcelFileService) {
    this.reports$ = from(this.files.getReports());
  }

  onShare(file: File) {
    this.files.share({ path: file.path, fileName: file.name });
  }

  onOpen(file: File) {
    this.files.open({ path: file.path });
  }

  onDelete(file: File) {
    this.files.delete({fileName: file.name}).then(console.log).catch(console.error);
    this.reports$ = from(this.files.getReports());
  }
}
