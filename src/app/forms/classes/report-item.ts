import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { CoreTypes } from "@nativescript/core";

export interface ReportItemOptions<T> {
  value?: T;
  key: string;
  label?: string;
  required?: boolean;
  page?: number;
}

export abstract class QuestionBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  page: number;
  abstract controlType: string;

  constructor(options: ReportItemOptions<T>) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.page = options.page === undefined ? 1 : options.page;
  }
}

export class QuestionGroup {
  private _form: FormGroup;

  constructor(
    public readonly key: string,
    public questions: QuestionBase<unknown>[]
  ) {}

  public get form() {
    if (!this._form) this._form = this.toFormGroup();
    return this._form;
  }

  private toFormGroup() {
    const group: any = {};
    if (this.questions) {
      this.questions.forEach((question) => {
        group[question.key] = question.required
          ? new FormControl(question.value, Validators.required)
          : new FormControl(question.value);
      });
    }
    return new FormGroup(group);
  }
}

type TextboxType = string | number | "integer";

export interface TextboxReportItemOptions<T> extends ReportItemOptions<T> {
  hint?: string;
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
}

export class TextboxReportItem<T extends TextboxType> extends QuestionBase<T> {
  controlType: string = "textbox";
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  hint: string;

  constructor(options: TextboxReportItemOptions<T>) {
    super(options);
    this.keyboardType = options.keyboardType;
    this.returnKeyType = options.returnKeyType;
    this.hint = options.hint || "";
  }
}

export class DatepickerReportItem extends QuestionBase<Date> {
  controlType: string = "datepicker";
}

export interface SwitchReportItemOptions extends ReportItemOptions<boolean> {
  switchFor: string | string[];
}

export class SwitchReportItem extends QuestionBase<boolean> {
  controlType: string = "switch";
  switchFor: string | string[];
  constructor(options: SwitchReportItemOptions) {
    super(options);
    this.switchFor = options.switchFor;
  }
}
