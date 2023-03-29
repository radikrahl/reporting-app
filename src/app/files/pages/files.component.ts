import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit,
  ViewChildren,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { File, FileSystemEntity } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { MockdataFactory } from "~/app/core/services/mock-data.factory";
import { FilesEntityComponent } from "../components/files.directive";
import { ActivatedRoute } from "@angular/router";
import { FileManager } from "~/app/core/services/files/file.manager";

@Component({
  selector: "afriknow-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"],
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
