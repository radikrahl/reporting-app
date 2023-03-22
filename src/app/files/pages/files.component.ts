import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  NgZone,
  OnInit,
  Query,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from "@angular/core";
import { BehaviorSubject, from, Observable, Subscription, tap } from "rxjs";
import { ExcelFileService } from "../../core/services/excelfile.service";
import { File, FileSystemEntity, Folder, Template } from "@nativescript/core";
import { NativeScriptNgZone, RouterExtensions } from "@nativescript/angular";
import { MockdataFactory } from "~/app/shared/forms/services/mock-data.factory";
import { FileComponent } from "../components/file/file.component";
import { FolderComponent } from "../components/folder/folder.component";
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
  folderName = this.route.snapshot.params.folder || "";
  @ViewChildren(FilesEntityComponent)
  components?: ComponentRef<FilesEntityComponent>[];

  constructor(
    private files: ExcelFileService,
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private mockFactory: MockdataFactory,
    private cdr: ChangeDetectorRef,
    private ngZone: NativeScriptNgZone
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
