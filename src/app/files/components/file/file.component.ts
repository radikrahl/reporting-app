
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { File, FileSystemEntity } from "@nativescript/core";
import { ExcelFileService } from "~/app/core/services/excelfile.service";
import { FilesEntityComponent } from "../files.directive";

function Required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true
  });
}

@Component({
  selector: 'afriknow-file',
  templateUrl: './file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
  @Input() fileSystemEntity!: File;
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  constructor(private files: ExcelFileService) {
  }


  onShare(file: File) {
    this.files.share({ path: file.path, fileName: file.name });
  }

  onOpen(file: File) {
      this.files.open({ path: file.path });

  }

  delete(file: File) {
    this.files.delete({fileName: file.name})?.then(this.onDelete.emit).catch(console.error);
  }

}
