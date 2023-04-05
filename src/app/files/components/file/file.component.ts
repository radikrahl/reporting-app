import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { File } from "@nativescript/core";
import { FileManager } from "~/app/core/services/files/file.manager";

@Component({
  selector: "afriknow-file",
  templateUrl: "./file.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent {
  @Input() fileSystemEntity!: File;
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  public get title() {
    return this.fileSystemEntity.parent.name;
  }

  public get subtitle() {
    var fileName = this.fileSystemEntity.name;
    var dateStr= fileName.substring(fileName.indexOf('-') + 1, fileName.indexOf('.'));
    return new Date(dateStr).toLocaleDateString();
  }

  constructor(private files: FileManager, private ngZone: NativeScriptNgZone) {}

  onShare() {
    this.files.share({
      path:
        this.fileSystemEntity.parent.name + "/" + this.fileSystemEntity.name,
    });
  }

  onOpen() {
    this.files.open({
      path:
        this.fileSystemEntity.parent.name + "/" + this.fileSystemEntity.name,
    });
  }

  onDelete() {
    this.ngZone.runTask(() => {
      this.files
        .delete({
          path:
            this.fileSystemEntity.parent.name +
            "/" +
            this.fileSystemEntity.name,
        })
        ?.then(() => {
          this.deleteEvent.emit();
        })
        .catch(console.error);
    });
  }
}
