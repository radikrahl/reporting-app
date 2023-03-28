import {
  AfterViewInit,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  ViewContainerRef,
} from "@angular/core";
import { FileSystemEntity, Folder, File } from "@nativescript/core";
import { FileComponent } from "./file/file.component";
import { FolderComponent } from "./folder/folder.component";

@Directive({
  selector: "[fileEntity]",
})
export class FilesEntityComponent implements AfterViewInit, OnDestroy {
  @Input("fileEntity") fileEntity?: FileSystemEntity;

  componentRef?: ComponentRef<any>;

  constructor(private view: ViewContainerRef) {}
  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  ngAfterViewInit(): void {
    if (this.fileEntity instanceof File) {
      this.componentRef = this.view.createComponent(FileComponent);
    } else if (this.fileEntity instanceof Folder) {
      this.componentRef = this.view.createComponent(FolderComponent);
    }
    this.componentRef?.setInput("fileSystemEntity", this.fileEntity);
    (<EventEmitter<void>>this.componentRef?.instance.onDelete)
      ?.asObservable()
      .subscribe(() => this.componentRef?.destroy());
  }
}
