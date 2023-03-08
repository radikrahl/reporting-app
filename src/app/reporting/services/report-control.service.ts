import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { QuestionBase } from "../models/report-item";

export type ReportPageControlMap = {
  [key: string]: FormGroup;
};

@Injectable()
export class ReportControlService {
  toFormGroup(
    questions: QuestionBase<unknown>[]
  ): FormGroup<ReportPageControlMap> {
    const group: ReportPageControlMap = {};
    questions.forEach((question) => {
      let control = question.required
        ? new FormControl(question.value || "", Validators.required)
        : new FormControl(question.value || "");

      if (group[question.page])
        group[question.page.toString()].addControl(question.key, control);
      else
        group[question.page.toString()] = new FormGroup({
          [question.key]: control,
        });
    });
    return new FormGroup(group);
  }

  toFormGroup2(questions: QuestionBase<unknown>[]) {
    const group: any = {};
    if (questions) {
      questions.forEach((question) => {
        group[question.key] = question.required
          ? new FormControl(question.value, Validators.required)
          : new FormControl(question.value);
      });
    }
    return new FormGroup(group);
  }
}
