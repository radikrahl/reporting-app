import { Injectable } from "@angular/core";

import { of } from "rxjs";
import {
  DatepickerReportItem,
  QuestionBase,
  QuestionGroup,
  SwitchReportItem,
  TextboxReportItem,
} from "../../forms/classes/report-item";

@Injectable()
export class ReportItemFactory {
  private questions1: QuestionBase<unknown>[] = [
    new TextboxReportItem<string>({
      key: "parentName",
      label: "Parent name",
      required: true,
      page: 1,
      returnKeyType: "next",
    }),
    new DatepickerReportItem({
      key: "date",
      label: "Enter Date",
      value: new Date(Date.now()),
      required: true,
      page: 1,
    }),
  ];

  private questions2: QuestionBase<unknown>[] = [
    new TextboxReportItem<number>({
      key: "chicken",
      label: "How many chicken",
      required: true,
      page: 2,
      keyboardType: "integer",
    }),
  ];
  private questions3: QuestionBase<unknown>[] = [
    new TextboxReportItem<number>({
      key: "foodQuantity",
      label: "Quantity of food (kg)",
      page: 3,
      keyboardType: "number",
    }),

    new TextboxReportItem<number>({
      key: "foodPrice",
      label: "Price of food (ugx)",
      page: 3,
      keyboardType: "integer",
    }),
  ];
  private questions4: QuestionBase<unknown>[] = [
    new TextboxReportItem<number>({
      key: "eggs",
      label: "How many eggs",
      page: 4,
      keyboardType: "integer",
    }),

    new SwitchReportItem({
      key: "newBorn",
      page: 4,
      label: "Any new born bird?",
      value: false,
      switchFor: "amountNewBorn",
    }),

    new TextboxReportItem<number>({
      key: "amountNewBorn",
      page: 4,
      label: "How many?",
      keyboardType: "integer",
    }),
  ];
  private questions5: QuestionBase<unknown>[] = [
    new SwitchReportItem({
      key: "soldBirds",
      page: 5,
      label: "Any sold Birds?",
      value: false,
      switchFor: ["soldBirdsAmount", "amountReceived"],
    }),

    new TextboxReportItem<number>({
      key: "soldBirdsAmount",
      page: 5,
      label: "How many sold birds",
      keyboardType: "integer",
    }),

    new TextboxReportItem<number>({
      key: "amountReceived",
      page: 5,
      label: "Amount received by the Parents (ugx)",
      keyboardType: "integer",
    }),
  ];
  private questions6: QuestionBase<unknown>[] = [
    new SwitchReportItem({
      key: "sickBirds",
      page: 6,
      label: "Any sick Birds?",
      value: false,
      switchFor: "sickBirdsAmount",
    }),

    new TextboxReportItem<number>({
      key: "sickBirdsAmount",
      page: 6,
      label: "How many sick birds",
      keyboardType: "integer",
    }),

    new SwitchReportItem({
      key: "medicineNeeded",
      page: 6,
      label: "Any medicine needed?",
      value: false,
      switchFor: "medicineAmount",
    }),

    new TextboxReportItem<number>({
      key: "medicineAmount",
      page: 6,
      label: "Amount of medicine bought",
      keyboardType: "integer",
    }),
  ];
  private questions7: QuestionBase<unknown>[] = [
    new SwitchReportItem({
      key: "deadBirds",
      page: 7,
      label: "Any dead Birds?",
      value: false,
      switchFor: "deadBirdsAmount",
    }),

    new TextboxReportItem<number>({
      key: "deadBirdsAmount",
      page: 7,
      label: "How many dead birds",
      keyboardType: "integer",
    }),
  ];

  private get questions() {
    return [].concat.apply(
      [],
      [
        this.questions1,
        this.questions2,
        this.questions3,
        this.questions4,
        this.questions5,
        this.questions6,
        this.questions7,
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

    arr.push(new QuestionGroup('1', this.questions1));
    arr.push(new QuestionGroup('2', this.questions2));
    arr.push(new QuestionGroup('3', this.questions3));
    arr.push(new QuestionGroup('4', this.questions4));
    arr.push(new QuestionGroup('5', this.questions5));
    arr.push(new QuestionGroup('6', this.questions6));
    arr.push(new QuestionGroup('7', this.questions7));

    return arr;
  }
}
