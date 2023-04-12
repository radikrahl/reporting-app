import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FileSystemEntity, Folder } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { FileManager } from "~/app/shared/files/services/file.manager";

@Component({
  selector: "afriknow-my-reports",
  templateUrl: "./my-reports.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyReportsComponent {
  public get title() {
    return this.folder && !this.isRoot() ? this.folder.name : 'My reports';
  }

  entities$: BehaviorSubject<FileSystemEntity[]> = new BehaviorSubject<
    FileSystemEntity[]
  >([]);

  folder?: Folder;

  constructor(
    private files: FileManager,
    private router: RouterExtensions,
    private cdr: ChangeDetectorRef
  ) {
    inject(ActivatedRoute).queryParams.subscribe((x?: { folder?: string }) => {
      this.folder = this.files.getFolder(x?.folder || "");
      this.folder.getEntities().then((x) => {
        this.entities$.next(x.sort((a, b) => a.name.localeCompare(b.name)));
      });
    });
  }

  goBack() {
    this.router.back();
  }

  isRoot() {
    return this.folder && this.files.isRoot(this.folder);
  }

  mock() {
    // new MockdataFactory(this.files).create().then((x) => {
    //   this.folder?.getEntities().then((x) => {
    //     this.entities$.next(x.sort((a, b) => a.name.localeCompare(b.name)));
    //     this.cdr.detectChanges();
    //   });
    // });
  }

  shareAll() {
    if (this.folder) this.files.share(this.folder);
  }

  downloadAll() {
    if (this.folder) this.files.download(this.folder);
  }
}
