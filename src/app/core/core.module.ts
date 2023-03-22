import { NgModule } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { ExcelFileService } from "./services/excelfile.service";

@NgModule({
  imports: [NativeScriptModule],
  providers: [ExcelFileService],
  exports: [],
  declarations: [],
})
export class CoreModule {}
