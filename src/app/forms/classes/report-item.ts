import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CoreTypes } from "@nativescript/core";
import { ExcelData } from "~/app/files/services/excelfile.service";

export interface ReportItemOptions<T> {
  value?: T;
  key: string;
  label?: string;
  required?: boolean;
  errorText?: string;
}

export abstract class QuestionBase<T> {
  key: string;
  label: string;
  required: boolean;
  errorText: string;
  abstract controlType: string;

  constructor(options: ReportItemOptions<T>) {
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.errorText = options.errorText || "";
  }
}

export abstract class ReportControl<T> extends QuestionBase<T> {
  formControl: FormControl<T | null>;
  public get value(): T | null {
    return this.formControl.value;
  }
  constructor(options: ReportItemOptions<T>) {
    super(options);
    this.formControl = options.required
      ? new FormControl<T | null>(options.value ?? null)
      : new FormControl<T | null>(options.value ?? null, Validators.required);
  }
}

export class QuestionGroup {
  private _form?: FormGroup;

  constructor(public questions: ReportControl<unknown>[]) {}

  public get form() {
    if (!this._form) this._form = this.toFormGroup();
    return this._form;
  }

  private toFormGroup() {
    const group: FormGroup = new FormGroup({});

    this.questions.forEach((question) => {
      group.addControl(question.key, question.formControl);
    });

    return group;
  }

  private toCsv(): ExcelData {
    const data: { head: string[]; rows: any[] } = { head: [], rows: [] };

    // for (let index = 0; index < this.questionGroups.length; index++) {
    //   const group: QuestionGroup = this.questionGroups[index];

      for (let index = 0; index < this.questions.length; index++) {
        const element = this.questions[index];

        if (!element.formControl.disabled && element.controlType !== "switch") {
          data.head.push(element.label);
          data.rows.push(element.value);
        }
      }
    // }
    console.log(data);
    return data;

  }
}

type TextboxType = string | number | "integer";

export interface TextboxReportItemOptions<T> extends ReportItemOptions<T> {
  hint?: string;
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  unit?: string;
  maxLength?: number;
}

export class TextboxReportItem<T extends TextboxType> extends ReportControl<T> {
  controlType: string = "textbox";
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  hint: string;
  unit: string;
  maxLength?: number;

  constructor(options: TextboxReportItemOptions<T>) {
    super(options);
    this.keyboardType = options.keyboardType;
    this.returnKeyType = options.returnKeyType;
    this.hint = options.hint || "";
    this.unit = options.unit || "";
    this.maxLength = options.maxLength;
  }
}

export class DatepickerReportItem extends ReportControl<Date> {
  controlType: string = "datepicker";
}

export interface SwitchReportItemOptions extends ReportItemOptions<boolean> {
  switchFor: string | string[];
}

export class SwitchReportItem extends ReportControl<boolean> {
  controlType: string = "switch";
  switchFor: string | string[];
  constructor(options: SwitchReportItemOptions) {
    super(options);
    this.switchFor = options.switchFor;
  }
}
