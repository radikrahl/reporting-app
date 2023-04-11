import { FormArray, FormGroup } from "@angular/forms";
import { ReportControl, ReportFormType } from "./report-control";
import { group } from "@angular/animations";

export type ReportFormRecord = Record<string, ReportFormType | null>;

export class ReportFormGroup {
  private _form: FormGroup;

  constructor(public questions: ReportControl<ReportFormType>[]) {
    this._form = this.toFormGroup()
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
  private _form: FormArray;

  constructor(public groups: ReportFormGroup[]) {
    this._form = this.toFormArray();
  }

  public get form() {
    return this._form;
  }

  private toFormArray() {
    const array = new FormArray<FormGroup<any>>([]);

    this.groups.forEach(group => array.push(group.form))

    return array;
  }

  public toFormRecord(): ReportFormRecord {
    let data: ReportFormRecord = {};
    this.groups.forEach((group) => Object.assign(data, group.toCsv()));
    return data;
  }
}
