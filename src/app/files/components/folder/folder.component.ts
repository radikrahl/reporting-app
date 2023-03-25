import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { NavigationEnd, NavigationExtras, Router } from "@angular/router";
import { NativeScriptNgZone } from "@nativescript/angular";
import { Folder } from "@nativescript/core";
import { Subscription } from "rxjs";
import { ExcelFileService } from "~/app/core/services/excelfile.service";

@Component({
  selector: "afriknow-folder",
  templateUrl: "./folder.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input() fileSystemEntity!: Folder;
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  private readonly routerEventSub: Subscription;

  constructor(
    private files: ExcelFileService,
    private ngZone: NativeScriptNgZone,
    private router: Router
  ) {
    this.routerEventSub = this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
      }
    });
  }
  ngOnDestroy() {
    this.routerEventSub.unsubscribe();
  }

  delete() {
    this.ngZone.runTask(() => {
      this.files
        .deleteFolder(this.fileSystemEntity.name)
        ?.then(() => {
          this.onDelete.emit();
        })
        .catch(console.error);
    });
  }
  onOpen(folder: Folder) {
    const extras: NavigationExtras = {
      queryParams: { folder: folder.name, path: folder.path },
    };

    this.router.navigate(["/files"], extras);
  }

  onShare() {
    this.files.shareFolder(this.fileSystemEntity);
  }

  onDownload() {
    this.files.openFolder(this.fileSystemEntity);
  }
}
