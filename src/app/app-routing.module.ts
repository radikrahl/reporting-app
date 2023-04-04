import { NgModule } from "@angular/core";
import { RouteReuseStrategy, Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ForceReloadRouteReuseStrategy } from "./core/force-reload.strategy";
import { StyleguideComponent } from "./shared/styleguide/styleguide.component";

const routes: Routes = [
  // {
  //   path: "",
  //   component: StyleguideComponent
  // },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "report",
    loadChildren: () =>
      import("./reporting/reporting.module").then((m) => m.ReportingModule),
  },
  {
    path: "files",
    loadChildren: () =>
      import("./files/files.module").then((m) => m.FilesModule),
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  providers: [
    { provide: RouteReuseStrategy, useClass: ForceReloadRouteReuseStrategy },
  ],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
