import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptNgZone,
} from "@nativescript/angular";

@NgModule({
  declarations: [],

  imports: [CommonModule, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [NativeScriptNgZone],
})
export class FilesModule {}
