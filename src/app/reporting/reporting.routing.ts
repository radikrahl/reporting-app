import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ReportingComponent } from "./pages/reporting.component";

const routes: Routes = [{ path: "", component: ReportingComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  declarations: [],
})
export class ReportingRoutingModule {}
