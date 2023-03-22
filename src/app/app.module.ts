import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { FilesModule } from "./files/files.module";
import { ReportingModule } from "./reporting/reporting.module";

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, CoreModule],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
