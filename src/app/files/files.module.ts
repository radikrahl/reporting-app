import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouteReuseStrategy, Routes } from "@angular/router";
import {
  NativeScriptCommonModule,
  NativeScriptNgZone,
  NativeScriptRouterModule,
} from "@nativescript/angular";
import { FileComponent } from "./components/file/file.component";
import { FilesEntityComponent } from "./components/files.directive";
import { FolderComponent } from "./components/folder/folder.component";
import { FilesComponent } from "./pages/files.component";

const routes: Routes = [
  { path: "", component: FilesComponent, data: { noReuse: true } },
  {
    path: ":folder",
    component: FilesComponent,
    providers: [{ provide: RouteReuseStrategy, useFactory: () => false }],
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
  providers: [NativeScriptNgZone],
})
export class FilesModule {}
