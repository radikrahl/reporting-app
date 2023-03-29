import { FormGroup } from "@angular/forms";
import { CsvDataRecord } from "~/app/core/classes/csv-data";
import { ReportControl } from "./report-control";

export class ReportForm {
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

  public toCsv(): CsvDataRecord {
    const data: CsvDataRecord = {};

    for (let index = 0; index < this.questions.length; index++) {
      const element = this.questions[index];

      if (!element.formControl.disabled && element.controlType !== "switch") {
        data[element.label] = element.value;
      }
    }
    return data;
  }
}
