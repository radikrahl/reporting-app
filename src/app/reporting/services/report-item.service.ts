import { Injectable } from "@angular/core";

import { map, of } from "rxjs";
import {
  DatepickerReportItem,
  ReportItemBase,
  SwitchReportItem,
  TextboxReportItem,
} from "../models/report-item";

@Injectable()
export class ReportItemService {
  private questions: ReportItemBase<unknown>[] = [
    /* Page 1 */
    new DatepickerReportItem({
      key: "date",
      label: "Enter Date",
      value: new Date(Date.now()),
      required: true,
      page: 1,
    }),

    new TextboxReportItem<string>({
      key: "parentName",
      label: "Parent name",
      required: true,
      page: 1,
      returnKeyType: "next"
    }),

    /* Page 2 */
    new TextboxReportItem<number>({
      key: "chicken",
      label: "How many chicken",
      required: true,
      page: 2,
      keyboardType: 'integer'
    }),

    /* Page 3 */
    new TextboxReportItem<number>({
      key: "foodQuantity",
      label: "Quantity of food (kg)",
      page: 3,
      keyboardType: 'number'
    }),

    new TextboxReportItem<number>({
      key: "foodPrice",
      label: "Price of food (ugx)",
      page: 3,
      keyboardType: 'integer'
    }),

    /* Page 4 */

    new TextboxReportItem<number>({
      key: "eggs",
      label: "How many eggs",
      page: 4,
      keyboardType: 'integer'
    }),

    new SwitchReportItem({
      key: "newBorn",
      page: 4,
      label: "Any new born bird?",
      value: false
    }),

    new TextboxReportItem<number>({
      key: "amountNewBorn",
      page: 4,
      label: "How many?",
      keyboardType: 'integer'
    }),

    /* Page 5 */

    new SwitchReportItem({
      key: "soldBirds",
      page: 5,
      label: "Any sold Birds?",
      value: false
    }),

    new TextboxReportItem<number>({
      key: "soldBirdsAmount",
      page: 5,
      label: "How many sold birds",
      keyboardType: 'integer'
    }),

    new TextboxReportItem<number>({
      key: "amountReceived",
      page: 5,
      label: "Amount received by the Parents (ugx)",
      keyboardType: 'integer'
    }),

    /* Page 6 */

    new SwitchReportItem({
      key: "sickBirds",
      page: 6,
      label: "Any sick Birds?",
      value: false
    }),

    new TextboxReportItem<number>({
      key: "sickBirdsAmount",
      page: 6,
      label: "How many sick birds",
      keyboardType: 'integer'
    }),

    new SwitchReportItem({
      key: "medicineNeeded",
      page: 6,
      label: "Any medicine needed?",
      value: false
    }),

    new TextboxReportItem<number>({
      key: "medicineAmount",
      page: 6,
      label: "Amount of medicine bought",
      keyboardType: 'integer'
    }),

    /* Page 7 */

    new SwitchReportItem({
      key: "deadBirds",
      page: 7,
      label: "Any dead Birds?",
      value: false
    }),

    new TextboxReportItem<number>({
      key: "deadBirdsAmount",
      page: 7,
      label: "How many dead birds",
      keyboardType: 'integer'
    }),
  ];

  getQuestions() {
    //todo: evaluate if observable and set paging
    return of(this.questions.sort((a, b) => a.page - b.page));
  }

  getQuestions2(pageIndex: number) {
    return of(this.questions.filter((y) => y.page === pageIndex));
  }
}
