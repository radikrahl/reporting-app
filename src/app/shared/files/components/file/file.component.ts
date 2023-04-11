import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { File } from "@nativescript/core";
import { CsvFile } from "../../classes/file";

@Component({
  selector: "afriknow-file",
  templateUrl: "./file.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent {
  @Input() fileSystemEntity!: File;
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  public get title() {
    var fileName = this.fileSystemEntity.name;

    return fileName.substring(0, fileName.indexOf("-"));
  }

  public get subtitle() {
    var fileName = this.fileSystemEntity.name;
    var dateStr = fileName.substring(
      fileName.indexOf("-") + 1,
      fileName.indexOf(".")
    );
    return new Date(dateStr).toLocaleDateString();
  }

  constructor(private ngZone: NativeScriptNgZone) {}

  onShare() {
    new CsvFile(this.fileSystemEntity).share();
  }

  onOpen() {
    new CsvFile(this.fileSystemEntity).download();
  }

  onDelete() {
    this.ngZone.runTask(() => {
      new CsvFile(this.fileSystemEntity)
        .delete()
        ?.then(() => {
          this.deleteEvent.emit();
        })
        .catch(console.error);
    });
  }
}
