import { Injectable } from "@angular/core";

import { of } from "rxjs";
import {
  ReportControl,
  TextboxReportItem,
  DatepickerReportItem,
  SwitchReportItem,
  QuestionGroup,
} from "~/app/shared/forms/classes/report-item";

@Injectable()
export class ReportItemFactory {
  private questions1: ReportControl<unknown>[] = [
    new TextboxReportItem<string>({
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
  ];

  private questions2: ReportControl<unknown>[] = [
    new TextboxReportItem<number>({
      key: "chicken",
      label: "How many chicken",
      hint: "How many chicken are at the parent's place.",
      errorText: "How many chicken are at the parent's place.",
      required: true,
      keyboardType: "integer",
    }),
  ];

  /* FOOD */
  private questions3: ReportControl<unknown>[] = [
    new TextboxReportItem<number>({
      key: "foodQuantity",
      label: "Quantity of food",
      hint: "How much food was needed today?",
      errorText: "How much extra food in kg was needed today? 0-100",
      unit: "kg",
      keyboardType: "number",
      required: true,
    }),

    new TextboxReportItem<number>({
      key: "foodPrice",
      label: "Price of food",
      unit: "ugx",
      hint: "How much does 1kg of food cost?",
      errorText: "How much does 1kg of food cost?",
      keyboardType: "integer",
      required: true,
    }),
  ];

  /* NEW BIRDS */
  private questions4: ReportControl<unknown>[] = [
    new TextboxReportItem<number>({
      key: "eggs",
      label: "How many eggs are in the shelter?",
      keyboardType: "integer",
      hint: "X-XX",
      errorText: "How many eggs are in the shelter?",
      required: true,
    }),

    new SwitchReportItem({
      key: "newBorn",
      label: "Any new born bird?",
      value: false,
      switchFor: "amountNewBorn",
    }),

    new TextboxReportItem<number>({
      key: "amountNewBorn",
      label: "Amount of new born",
      hint: "Amount of new born birds",
      keyboardType: "integer",
      required: true,
    }),
  ];

  /* SOLD */
  private questions5: ReportControl<unknown>[] = [
    new SwitchReportItem({
      key: "soldBirds",
      label: "Any sold Birds?",
      value: false,
      switchFor: ["soldBirdsAmount", "amountReceived"],
    }),

    new TextboxReportItem<number>({
      key: "soldBirdsAmount",
      label: "How many sold birds",
      keyboardType: "integer",
      required: true,
    }),

    new TextboxReportItem<number>({
      key: "amountReceived",
      label: "Amount received by the Parents",
      unit: "ugx",
      keyboardType: "integer",
      required: true,
    }),
  ];

  /* SICKNESS */
  private questions6: ReportControl<unknown>[] = [
    new SwitchReportItem({
      key: "sickBirds",
      label: "Any sick Birds?",
      value: false,
      switchFor: ["sickBirdsAmount", "sickness"],
    }),

    new TextboxReportItem<number>({
      key: "sickBirdsAmount",
      label: "How many sick birds?",
      keyboardType: "integer",
      required: true,
    }),

    new TextboxReportItem<string>({
      key: "sickness",
      label: "Which sickness?",
      required: true,
    }),
  ];

  /* MEDICINE */
  private questions7: ReportControl<unknown>[] = [
    new SwitchReportItem({
      key: "medicineNeeded",
      label: "Any medicine needed?",
      value: false,
      switchFor: "medicineAmount",
    }),

    new TextboxReportItem<number>({
      key: "medicineAmount",
      label: "Amount of medicine bought",
      keyboardType: "integer",
      required: true,
    }),
  ];

  /* DEAD */
  private questions8: ReportControl<unknown>[] = [
    new SwitchReportItem({
      key: "deadBirds",
      label: "Any dead Birds?",
      value: false,
      switchFor: "deadBirdsAmount",
    }),

    new TextboxReportItem<number>({
      key: "deadBirdsAmount",
      label: "How many dead birds",
      keyboardType: "integer",
      required: true,
    }),
  ];

  private get questions() {
    return Array.prototype.concat.apply(
      [],
      [
        this.questions1,
        this.questions2,
        this.questions3,
        this.questions4,
        this.questions5,
        this.questions6,
        this.questions7,
        this.questions8,
      ]
    );
  }

  getQuestions() {
    //todo: evaluate if observable and set paging
    return of(this.questions.sort((a, b) => a.page - b.page));
  }

  getQuestions2(pageIndex: number) {
    return of(this.questions.filter((y) => y.page === pageIndex));
  }

  getQuestions3(): QuestionGroup[] {
    const arr: QuestionGroup[] = [];

    arr.push(new QuestionGroup(this.questions1));
    arr.push(new QuestionGroup(this.questions2));
    arr.push(new QuestionGroup(this.questions3));
    arr.push(new QuestionGroup(this.questions4));
    arr.push(new QuestionGroup(this.questions5));
    arr.push(new QuestionGroup(this.questions6));
    arr.push(new QuestionGroup(this.questions7));
    arr.push(new QuestionGroup(this.questions8));

    return arr;
  }
}
