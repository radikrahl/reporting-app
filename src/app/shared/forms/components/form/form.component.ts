import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import { ReportForm } from "../../classes/report-form";

@Component({
  selector: "afriknow-report-form",
  templateUrl: "./form.component.html",
  providers: [],
})
export class ReportFormComponent implements AfterContentChecked {
  @Input() questionGroup!: ReportForm;
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
