import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { CoreTypes } from "@nativescript/core";
import { ReportControl } from "../../classes/report-control";
import { QuestionOptions } from "../../classes/question-base";

type TextboxType = string | number | "integer";

export interface TextViewReportItemOptions
  extends QuestionOptions<string | number> {
  hint?: string;
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  unit?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export class TextViewReportItem extends ReportControl<string | number> {
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
    this.placeholder = options.placeholder || "";
    this.maxLength = options.maxLength;

    if (options.maxLength) {
      this.formControl.addValidators(Validators.maxLength(options.maxLength));
    }

    if (options.minLength) {
      this.formControl.addValidators(Validators.minLength(options.minLength));
    }
  }
}

@Component({
  selector: "afriknow-textview",
  templateUrl: "./textview.component.html",
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
