import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit,
  ViewChildren,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ExcelFileService } from "../../core/services/excelfile.service";
import { File, FileSystemEntity } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { MockdataFactory } from "~/app/core/services/mock-data.factory";
import { FilesEntityComponent } from "../components/files.directive";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "afriknow-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"],
})
export class FilesComponent implements OnInit, AfterContentChecked {
  entities$?: BehaviorSubject<FileSystemEntity[]> = new BehaviorSubject<
    FileSystemEntity[]
  >([]);
  entities?: FileSystemEntity[];
  reports: File[] = [];
  folderName = this.route.snapshot.queryParams.folder || "";
  path = this.route.snapshot.queryParams.path || "";
  @ViewChildren(FilesEntityComponent)
  components?: ComponentRef<FilesEntityComponent>[];

  constructor(
    private files: ExcelFileService,
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private mockFactory: MockdataFactory,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.files.getEntites(this.folderName).then((x) => this.entities$?.next(x));
  }

  goBack() {
    this.router.back();
  }

  mock() {
    this.mockFactory.create().then((x) => {
      this.files
        .getEntites(this.folderName)
        .then((x) => this.entities$?.next(x));
    });
  }
}
