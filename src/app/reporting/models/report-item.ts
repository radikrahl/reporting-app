export interface ReportItemOptions<T> {
  value?: T;
  key: string;
  label?: string;
  required?: boolean;
  page?: number;
  options?: { key: string; value: string }[];
}

export abstract class ReportItemBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  page: number;
  abstract controlType: string;
  options: { key: string; value: string }[];

  constructor(options: ReportItemOptions<T>) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.page = options.page === undefined ? 1 : options.page;
    this.options = options.options || [];
  }
}

type KeyboardType =
  | ""
  | "datetime"
  | "email"
  | "integer"
  | "number"
  | "phone"
  | "url";

type ReturnKeyType = "" | "done" | "go" | "next" | "search" | "send";

type TextboxType = string | number | "integer";

export interface TextboxReportItemOptions<T> extends ReportItemOptions<T> {
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
}

export class TextboxReportItem<
  T extends TextboxType
> extends ReportItemBase<T> {
  controlType: string = "textbox";
  keyboardType: KeyboardType;
  returnKeyType: ReturnKeyType;

  constructor(options: TextboxReportItemOptions<T>) {
    super(options);
    this.keyboardType = options.keyboardType|| '';
    this.returnKeyType = options.returnKeyType|| '';
  }
}

export class DatepickerReportItem extends ReportItemBase<Date> {
  controlType: string = "datepicker";
}

export class SwitchReportItem extends ReportItemBase<boolean> {
  controlType: string = "switch";
}
