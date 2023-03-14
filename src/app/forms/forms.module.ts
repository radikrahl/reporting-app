import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { ReportFormItemComponent } from "./components/form-item/form-item.component";
import { ReportFormComponent } from "./components/form/form.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NativeScriptFormsModule],
  declarations: [ReportFormComponent, ReportFormItemComponent],
  exports: [ReportFormComponent, ReportFormItemComponent]
})
export class ReportFormsModule {}
