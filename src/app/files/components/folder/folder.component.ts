import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NativeScriptNgZone } from "@nativescript/angular";
import { Folder } from "@nativescript/core";
import { ExcelFileService } from "~/app/core/services/excelfile.service";

@Component({
  selector: "afriknow-folder",
  templateUrl: "./folder.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input() fileSystemEntity!: Folder;
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private files: ExcelFileService,
    private ngZone: NativeScriptNgZone,
    private router: Router
  ) {
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
