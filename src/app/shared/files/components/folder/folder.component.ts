import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { NativeScriptNgZone, RouterExtensions } from "@nativescript/angular";
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

  constructor(
    private ngZone: NativeScriptNgZone,
    private router: RouterExtensions,
    private route: ActivatedRoute
  ) {}

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
    var folderName = this.route.snapshot.queryParams.folder;

    if (folderName) {
      folderName = folderName + "/" + folder.name;
    } else {
      folderName = folder.name;
    }
    const extras: NavigationExtras = {
      queryParams: { folder: folderName },
      relativeTo: this.route,
    };
    this.router.navigate([this.route.pathFromRoot], extras);
  }

  onShare() {
    new CsvFolder(this.fileSystemEntity).share();
  }

  onDownload() {
    new CsvFolder(this.fileSystemEntity).download();
  }

  canDelete() {
    return this.fileSystemEntity.parent.name !== "reports";
  }
}
