export interface QuestionOptions<T> {
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

  constructor(options: QuestionOptions<T>) {
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.errorText = options.errorText || "";
  }
}
