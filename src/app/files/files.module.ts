import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NativeScriptCommonModule, NativeScriptNgZone, NativeScriptRouterModule } from "@nativescript/angular";
import { MockdataFactory } from "../shared/forms/services/mock-data.factory";
import { FileComponent } from "./components/file/file.component";
import { FilesEntityComponent } from "./components/files.directive";
import { FolderComponent } from "./components/folder/folder.component";
import { FilesComponent } from "./pages/files.component";

const routes: Routes = [{ path: "", component: FilesComponent }, {path:":folder", component: FilesComponent}];

@NgModule({
  declarations: [FilesComponent, FolderComponent, FileComponent, FilesEntityComponent],

  imports: [CommonModule, NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MockdataFactory, NativeScriptNgZone]
})
export class FilesModule {}
