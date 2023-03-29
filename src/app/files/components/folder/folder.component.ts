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
import { FolderService } from "../../services/folder.service";

@Component({
  selector: "afriknow-folder",
  templateUrl: "./folder.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FolderService],
})
export class FolderComponent {
  @Input() fileSystemEntity!: Folder;
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private files: FolderService,
    private ngZone: NativeScriptNgZone,
    private router: Router
  ) {}

  onDelete() {
    this.ngZone.runTask(() => {
      this.files
        .delete(this.fileSystemEntity)
        ?.then(() => {
          this.deleteEvent.emit();
        })
        .catch(console.error);
    });
  }
  onOpen(folder: Folder) {
    const extras: NavigationExtras = {
      queryParams: { folder: folder.name, path: folder.path },
    };
    this.router.navigate(["/files/folder"], extras);
  }

  onShare() {
    this.files.share(this.fileSystemEntity);
  }

  onDownload() {
    this.files.open(this.fileSystemEntity);
  }
}
