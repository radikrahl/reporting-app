import { NgModule } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { ReportItemFactory } from "../reporting/services/report-item.factory";

@NgModule({
  imports: [NativeScriptModule],
  providers: [ReportItemFactory],
  exports: [],
  declarations: [],
})
export class CoreModule {}
