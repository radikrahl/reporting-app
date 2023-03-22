import { NgModule } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ReportFormsModule } from "./forms/forms.module";

@NgModule({
imports: [NativeScriptCommonModule, ReportFormsModule],
exports: [NativeScriptCommonModule, ReportFormsModule]
})
export class SharedModule {}
