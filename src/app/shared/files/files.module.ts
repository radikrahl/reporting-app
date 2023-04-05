import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptNgZone,
} from "@nativescript/angular";
import { FileComponent } from "./components/file/file.component";
import { FilesEntityDirective } from "./components/files.directive";
import { FolderComponent } from "./components/folder/folder.component";

@NgModule({
  declarations: [    FolderComponent,
    FileComponent,
    FilesEntityDirective,],

  imports: [CommonModule, NativeScriptCommonModule],
  exports: [FilesEntityDirective],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [NativeScriptNgZone],
})
export class SharedFilesModule {}
