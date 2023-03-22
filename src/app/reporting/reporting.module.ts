import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ExcelFileService } from "../core/services/excelfile.service";
import { FileService } from "../files/services/file.service";
import { MockdataFactory } from "../shared/forms/services/mock-data.factory";
import { SharedModule } from "../shared/shared.module";
import { ReportingComponent } from "./pages/reporting.component";
import { ReportingRoutingModule } from "./reporting.routing";


@NgModule({
  imports: [
    SharedModule,
    ReportingRoutingModule,
  ],
  declarations: [ReportingComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}
