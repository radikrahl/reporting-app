import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CoreTypes } from "@nativescript/core";
import { QuestionOptions } from "~/app/core/models/report-item";
import { ReportControl } from "../../classes/report-control";

type TextboxType = string | number | "integer";

export interface TextViewReportItemOptions extends QuestionOptions<unknown> {
  hint?: string;
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  unit?: string;
  maxLength?: number;
  placeholder?: string;
}

export class TextViewReportItem extends ReportControl<unknown> {
  component = TextViewComponent;
  controlType: string = "textbox";
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  hint: string;
  unit: string;
  maxLength?: number;
  placeholder: string;
  constructor(options: TextViewReportItemOptions) {
    super(options);
    this.keyboardType = options.keyboardType;
    this.returnKeyType = options.returnKeyType;
    this.hint = options.hint || "";
    this.unit = options.unit || "";
    this.placeholder = options.placeholder || ""
    this.maxLength = options.maxLength;
  }
}

@Component({
  selector: "afriknow-textview",
  templateUrl: "./textview.component.html",
  styleUrls: ["./textview.component.scss"],
})
export class TextViewComponent {
  @Input() question!: TextViewReportItem;
  @Input() form!: FormGroup;

  get showError() {
    const control = this.question?.formControl;
    return control?.invalid && control?.touched;
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
