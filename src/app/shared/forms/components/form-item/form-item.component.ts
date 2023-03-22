import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  QuestionBase,
  ReportControl,
  SwitchReportItem,
} from "../../classes/report-item";

@Component({
  selector: "afriknow-report-form-item",
  templateUrl: "./form-item.component.html",
  styleUrls: ["./form-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReportFormItemComponent implements OnInit{
  ngOnInit(): void {
    if (this.question instanceof SwitchReportItem && this.question.switchFor) {
      this.setFormControls(this.question.formControl.value ?? false);
    }

  }
  @Input() question!: ReportControl<unknown>;
  @Input() form!: FormGroup;

  get showError() {
    const control = this.question.formControl;

    return control?.invalid && control?.touched;
  }

  constructor(private ngZone: NgZone){}

  onCheckedChange(event: { value: boolean }) {
    this.setFormControls(event.value);
  }

  setFormControls(enable: boolean) {
    this.ngZone.run(() => {
    if (this.question instanceof SwitchReportItem && this.question.switchFor) {
      if (Array.isArray(this.question.switchFor)) {
        this.question.switchFor.forEach((x) => {
          if (enable) this.form.get(x)?.enable();
          else this.form.get(x)?.disable();
        });
      } else {
        if (enable) this.form.get(this.question.switchFor)?.enable();
        else this.form.get(this.question.switchFor)?.disable();
      }
    }
    })
  }
}
