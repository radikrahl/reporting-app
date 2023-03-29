import { FormControl, Validators } from "@angular/forms";
import { QuestionBase, QuestionOptions } from "~/app/core/models/report-item";

export abstract class ReportControl<T> extends QuestionBase<T> {
  abstract component: any;
  formControl: FormControl<T | null>;
  public get value(): T | null {
    return this.formControl.value;
  }
  constructor(options: QuestionOptions<T>) {
    super(options);
    this.formControl = options.required
      ? new FormControl<T | null>(options.value ?? null)
      : new FormControl<T | null>(options.value ?? null, Validators.required);
  }
}
