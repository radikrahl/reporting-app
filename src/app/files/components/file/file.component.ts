import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
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
  constructor(private files: FileManager) {}

  onShare(file: File) {
    this.files.share({ path: file.parent.name + "/" + file.name });
  }

  onOpen(file: File) {
    this.files.open({ path: file.parent.name + "/" + file.name });
  }

  onDelete(file: File) {
    this.files
      .delete({ path: file.parent.name + "/" + file.name })
      ?.then(this.deleteEvent.emit)
      .catch(console.error);
  }
}
