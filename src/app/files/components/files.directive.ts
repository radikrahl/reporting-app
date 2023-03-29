import {
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { FileSystemEntity, Folder, File } from "@nativescript/core";
import { take } from "rxjs";
import { FileComponent } from "./file/file.component";
import { FolderComponent } from "./folder/folder.component";

@Directive({
  selector: "[fileEntity]",
})
export class FilesEntityComponent implements OnInit, OnDestroy {
  @Input("fileEntity") fileEntity?: FileSystemEntity;

  componentRef?: ComponentRef<any>;
  constructor(private view: ViewContainerRef) {}
  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  ngOnInit(): void {
    if (this.fileEntity instanceof File) {
      this.componentRef = this.view.createComponent(FileComponent);
    } else if (this.fileEntity instanceof Folder) {
      this.componentRef = this.view.createComponent(FolderComponent);
    }
    this.componentRef?.setInput("fileSystemEntity", this.fileEntity);
    var deleteEvent = <EventEmitter<void>>(
      this.componentRef?.instance.deleteEvent
    );

    deleteEvent
      ?.asObservable()
      .pipe(take(1))
      .subscribe(() => this.componentRef?.destroy());
  }
}
