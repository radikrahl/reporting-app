import { FormArray, FormGroup } from "@angular/forms";
import { ReportControl, ReportFormType } from "./report-control";
import { InjectionToken } from "@angular/core";
import { ReportFactory } from "~/app/reporting/classes/reportform.factory";

export type ReportFormRecord = Record<string, ReportFormType | null>;

export class ReportFormGroup {
  private _form: FormGroup;

  constructor(public questions: ReportControl<ReportFormType>[]) {
    this._form = this.toFormGroup();
  }

  public get form() {
    return this._form;
  }

  private toFormGroup() {
    const group: FormGroup = new FormGroup({});
    this.questions.forEach((question) => {
      group.addControl(question.key, question.formControl);
    });

    return group;
  }

  public toCsv(): ReportFormRecord {
    const data: ReportFormRecord = {};

    for (let index = 0; index < this.questions.length; index++) {
      const element = this.questions[index];

      if (!element.formControl.disabled && element.controlType !== "switch") {
        data[element.label] = element.value;
      }
    }
    return data;
  }
}

export class ReportFormArray {
  private _form: FormArray<FormGroup<any>>;
  nameKey = "parentName";
  dateKey = "date";
  type: "chicken" | "goats" | "monthly";
  constructor(
    type: "chicken" | "goats" | "monthly",
    public groups: ReportFormGroup[]
  ) {
    this._form = this.toFormArray();
    this.type = type;
  }

  public get date(): Date {
    const fg = this._form.controls.find((x) => x.get(this.dateKey));
    return fg?.get(this.dateKey)?.value;
  }

  public get name(): string | undefined {
    const fg = this._form.controls.find((x) => x.get(this.nameKey));
    return fg?.get(this.nameKey)?.value;
  }

  public reset(): void {
    this._form.reset();
  }

  public get valid(): boolean {
    return this._form.valid;
  }

  isCurrentValid(index: number) {
    return this.groups[index].form.valid;
  }

  private toFormArray() {
    const array = new FormArray<FormGroup<any>>([]);

    this.groups.forEach((group) => array.push(group.form));

    return array;
  }

  public toFormRecord(): ReportFormRecord {
    let data: ReportFormRecord = {};
    this.groups.forEach((group) => Object.assign(data, group.toCsv()));
    return data;
  }
}

export const REPORT_FACTORY = new InjectionToken<ReportFactory>(
  "report.factory"
);
export const REPORT_FORM = new InjectionToken<ReportFormArray>("report.form");
