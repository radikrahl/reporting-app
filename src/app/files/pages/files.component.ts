import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit,
  ViewChildren,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { File, FileSystemEntity } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { FilesEntityComponent } from "../components/files.directive";
import { ActivatedRoute } from "@angular/router";
import { FileManager } from "~/app/core/services/files/file.manager";
import { MockdataFactory } from "../services/mock-data.factory";

@Component({
  selector: "afriknow-files",
  templateUrl: "./files.component.html",
})
export class FilesComponent implements OnInit {
  entities$?: BehaviorSubject<FileSystemEntity[]> = new BehaviorSubject<
    FileSystemEntity[]
  >([]);

  entities?: FileSystemEntity[];
  reports: File[] = [];
  folderName: string = "";
  path = "";
  @ViewChildren(FilesEntityComponent)
  components?: ComponentRef<FilesEntityComponent>[];

  constructor(
    private files: FileManager,
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private mockFactory: MockdataFactory,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((x) => {
      this.folderName = x.folder || "";
      this.path = x.path || "";
    });
  }

  ngOnInit(): void {
    this.files
      .getEntities(this.folderName)
      .then((x) =>
        this.entities$?.next(x.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }

  goBack() {
    this.router.back();
  }

  mock() {
    this.mockFactory.create().then((x) => {
      this.files.getEntities(this.folderName).then((x) => {
        this.entities$?.next(x.sort((a, b) => a.name.localeCompare(b.name)));
        this.cdr.detectChanges();
      });
    });
  }
}
