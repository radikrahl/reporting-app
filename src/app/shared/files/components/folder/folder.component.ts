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
import { CsvFolder } from "../../classes/folder";

@Component({
  selector: "afriknow-folder",
  templateUrl: "./folder.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input() fileSystemEntity!: Folder;
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private ngZone: NativeScriptNgZone, private router: Router) {}

  onDelete() {
    this.ngZone.runTask(() => {
      new CsvFolder(this.fileSystemEntity)
        .delete()
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
    new CsvFolder(this.fileSystemEntity).share();
  }

  onDownload() {
    new CsvFolder(this.fileSystemEntity).download();
  }
}
