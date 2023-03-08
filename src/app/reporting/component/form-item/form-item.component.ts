import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase, SwitchReportItem } from "../../models/report-item";

@Component({
  selector: "afriknow-report-form-item",
  templateUrl: "./form-item.component.html",
  styleUrls: ["./form-item.component.css"],
})
export class ReportFormItemComponent implements OnInit {
  @Input() question!: QuestionBase<unknown>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  ngOnInit(): void {
    this.setFormControls();
  }

  onCheckedChange(event: { value: boolean }) {
    this.setFormControls(event.value);
  }

  setFormControls(enable: boolean = false) {
    if (this.question instanceof SwitchReportItem && this.question.switchFor) {
      if (Array.isArray(this.question.switchFor)) {
        this.question.switchFor.forEach((x) => {
          if (enable) this.form.get(x).enable();
          else this.form.get(x).disable();
        });
      } else {
        if (enable) this.form.get(this.question.switchFor).enable();
        else this.form.get(this.question.switchFor).disable();
      }
    }
  }
}
