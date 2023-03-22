import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { GridLayoutComponent } from "./core/layout/grid/grid.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "report",
    loadChildren: () => import("./reporting/reporting.module").then((m) => m.ReportingModule),
  },
  {
    path: "files",
    loadChildren: () => import("./files/files.module").then((m) => m.FilesModule),
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
