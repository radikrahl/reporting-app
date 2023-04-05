import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FileSystemEntity, knownFolders } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { MockdataFactory } from "../services/mock-data.factory";
import { FileManager } from "~/app/core/services/files/file.manager";
import { CsvFolder } from "~/app/shared/files/classes/folder";

@Component({
  selector: "afriknow-files",
  templateUrl: "./files.component.html",
})
export class FilesComponent implements OnInit {
  entities$: BehaviorSubject<FileSystemEntity[]> = new BehaviorSubject<
    FileSystemEntity[]
  >([]);

  folderName: string = "";

  constructor(
    private files: FileManager,
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private mockFactory: MockdataFactory,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((x) => {
      this.folderName = x.folder || "";
    });
  }

  ngOnInit(): void {
    this.files
      .getEntities(this.folderName)
      .then((x) =>
        this.entities$.next(x.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }

  goBack() {
    this.router.back();
  }

  mock() {
    this.mockFactory.create().then((x) => {
      this.files.getEntities(this.folderName).then((x) => {
        this.entities$.next(x.sort((a, b) => a.name.localeCompare(b.name)));
        this.cdr.detectChanges();
      });
    });
  }

  shareAll() {
    new CsvFolder(
      this.entities$.value[0].parent || knownFolders.externalDocuments()
    ).share();
  }

  downloadAll() {
    new CsvFolder(
      this.entities$.value[0].parent || knownFolders.externalDocuments()
    ).download();
  }
}
