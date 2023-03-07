import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReportingModule } from "./reporting/reporting.module";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    ReportingModule,
    NativeScriptModule,
  ],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
