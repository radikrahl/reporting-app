import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import {
  NativeScriptCommonModule,
  NativeScriptNgZone,
  NativeScriptRouterModule,
} from "@nativescript/angular";
import { FilesComponent } from "./pages/files.component";
import { MockdataFactory } from "./services/mock-data.factory";
import { FolderComponent } from "../shared/files/components/folder/folder.component";
import { FileComponent } from "../shared/files/components/file/file.component";
import { FilesEntityComponent } from "../shared/files/components/files.directive";

const routes: Routes = [
  { path: "", component: FilesComponent },
  {
    path: "folder",
    component: FilesComponent,
    data: { noReuse: true },
  },
];

@NgModule({
  declarations: [
    FilesComponent,
    FolderComponent,
    FileComponent,
    FilesEntityComponent,
  ],

  imports: [
    CommonModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [NativeScriptNgZone, MockdataFactory],
})
export class FilesModule {}
