import { Component, NgZone, OnInit } from "@angular/core";
import { from, Observable, tap } from "rxjs";
import { ExcelFileService } from "../services/excelfile.service";
import { File } from "@nativescript/core";

@Component({
  selector: "afriknow-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"],
  providers: [ExcelFileService],
})
export class FilesComponent implements OnInit {
  reports$?: Observable<File[]>;
  reports: File[] = [];
  constructor(private files: ExcelFileService, private ngZone: NgZone) {
  }
  ngOnInit(): void {
    this.reports$ = from(this.files.getReports());
  }

  onShare(file: File) {
    this.files.share({ path: file.path, fileName: file.name });
  }

  onOpen(file: File) {
    this.files.open({ path: file.path });
  }

  onDelete(file: File) {
    this.files.delete({fileName: file.name})?.then(console.log).catch(console.error);
    this.reports$ = from(this.files.getReports()).pipe(tap(x => this.reports = x));
  }
}
