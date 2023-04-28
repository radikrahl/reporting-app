import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReportFormGroup } from "../forms/classes/report-form";
import { DatepickerReportItem } from "../forms/components/datepicker/datepicker.component";
import { SwitchReportItem } from "../forms/components/switch/switch.component";
import { TextboxReportItem } from "../forms/components/textbox/textbox.component";
import { TextViewReportItem } from "../forms/components/textview/textview.component";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { FormArray, FormGroup } from "@angular/forms";
import { SharedModule } from "../shared.module";

@Component({
  templateUrl: "./styleguide.component.html",
  standalone: true,
  imports: [NativeScriptCommonModule, SharedModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class StyleguideComponent {
  formData = formData();
  form: FormArray<FormGroup<any>> = new FormArray<FormGroup<any>>([]);
  pageIndex = 1;

  constructor() {
    this.formData.forEach((group) => this.form.push(group.form));
  }
}

function formData() {
  return [
    new ReportFormGroup([
      new TextboxReportItem({
        key: "parentName",
        label: "Parent name",
        hint: "Enter name of parent.",
        required: true,
        returnKeyType: "next",
      }),
      new DatepickerReportItem({
        key: "date",
        label: "Enter Date",
        value: new Date(Date.now()),
        required: true,
      }),
      new TextboxReportItem({
        key: "amountReceived",
        label: "Amount received by the Parents",
        unit: "ugx",
        hint: "Enter name of parent.",
        placeholder: "4-7 digits",
        errorText: "0000, 000000",
        keyboardType: "integer",
        required: true,
      }),
      new TextboxReportItem({
        key: "chicken",
        label: "How many chicken this week?",
        hint: "How many chicken are at the parent's place.",
        placeholder: "1-3 digits",
        errorText: "0, 00, 000",
        required: true,
        keyboardType: "integer",
      }),
      new SwitchReportItem({
        key: "sickBirds",
        label: "Any sick birds this week?",
        value: false,
        switchFor: ["sickBirdsAmount", "sickness"],
      }),

      new TextboxReportItem({
        key: "sickBirdsAmount",
        label: "How many sick birds?",
        placeholder: "1-3 digits",
        errorText: "0",
        keyboardType: "integer",
        required: true,
      }),

      new TextViewReportItem({
        key: "sickness",
        label: "Which sickness?",
        required: true,
        placeholder: "e.g. newcastle, cough, etc...",
        errorText: "Please provide a sickness reason.",
      }),
      new TextViewReportItem({
        key: "birds",
        label: "How are the parents and her birds doing this month?",
        hint: "Explain the general situation in the field and the devlopment of the project.",
        required: true,
      }),
      new TextViewReportItem({
        key: "goats",
        label: "How are the parents and her goats doing this month?",
        hint: "Explain the general situation in the field and the devlopment of the project.",
        required: true,
      }),
      new TextViewReportItem({
        key: "challenges",
        label: "What challenges did you face this month?",
        hint: "Are the some changes this month in the project? Why?",
        required: true,
      }),
      new TextViewReportItem({
        key: "health",
        label: "Health status",
        hint: "Please explain why some chicken got sick or died this month.",
        required: true,
      }),
      new TextViewReportItem({
        key: "economy",
        label: "Economy status",
        hint: "Did the parents have any savings?\nDid some parents take out a loan?\nWhat is Marting saying about the situation right now?",
        required: true,
      }),
      new TextViewReportItem({
        key: "learnings",
        label: "Anything else?",
        hint: "Is there any more learnings from the parents and yourself which you want to share with us?",
        required: true,
      }),
    ]),
  ];
}
