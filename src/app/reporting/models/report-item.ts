import { FormArray, FormControl, FormControlOptions, FormControlState, FormGroup } from "@angular/forms";

export interface ReportItem {
  controls: FormControl[];
  formStep?: number;
}

export class ReportItem_c extends FormControl<any> {

constructor(value: FormControlState<any> | any, type: 'date' | 'double' | 'int' | 'text' | 'switch') {
  super(value)
}
}
