export interface ReportItemOptions<T> {
  value?: T;
  key: string;
  label?: string;
  required?: boolean;
  page?: number;
}

export abstract class ReportItemBase<T> {
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
    this.keyboardType = options.keyboardType || "";
    this.returnKeyType = options.returnKeyType || "";
  }
}

export class DatepickerReportItem extends ReportItemBase<Date> {
  controlType: string = "datepicker";
}

export interface SwitchReportItemOptions extends ReportItemOptions<boolean> {
  switchFor: string | string[];
}

export class SwitchReportItem extends ReportItemBase<boolean> {
  controlType: string = "switch";
  switchFor: string | string[];
  constructor(options: SwitchReportItemOptions) {
    super(options);
    this.switchFor = options.switchFor;
  }
}
