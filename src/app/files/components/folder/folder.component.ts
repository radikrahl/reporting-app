import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, EventEmitter, Input, Output } from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { Folder } from "@nativescript/core";
import { ExcelFileService } from "~/app/core/services/excelfile.service";

@Component({
  selector: 'afriknow-folder',
  templateUrl: './folder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderComponent{
  @Input() fileSystemEntity!: Folder;
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  constructor(private files: ExcelFileService, private ngZone: NativeScriptNgZone) {

  }

  delete(folder: Folder) {
    this.ngZone.runTask(() => {

      this.files.deleteFolder(folder.name)?.then(() => {this.onDelete.emit()}).catch(console.error);
    })
  }
}
