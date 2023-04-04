import { ReportForm } from "~/app/shared/forms/classes/report-form";
import { DatepickerReportItem } from "~/app/shared/forms/components/datepicker/datepicker.component";
import { SwitchReportItem } from "~/app/shared/forms/components/switch/switch.component";
import { TextboxReportItem } from "~/app/shared/forms/components/textbox/textbox.component";
import { TextViewReportItem } from "~/app/shared/forms/components/textview/textview.component";

export class ReportFormFactory {
  createForm() {
    return [
      new ReportForm([
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
      ]),

      /* Inventory */

      new ReportForm([
        new TextboxReportItem({
          key: "chicken",
          label: "How many chicken this week?",
          hint: "How many chicken are at the parent's place.",
          placeholder: "1-3 digits",
          errorText: "0, 00, 000",
          required: true,
          keyboardType: "integer",
        }),
      ]),

      /* FOOD */
      new ReportForm([
        new TextboxReportItem({
          key: "foodQuantity",
          label: "Quantity of food this week?",
          hint: "How much food was needed today?",
          placeholder: "1-3 digits",
          unit: "kg",
          keyboardType: "number",
          required: true,
        }),

        new TextboxReportItem({
          key: "foodPrice",
          label: "Price of food",
          unit: "ugx",
          placeholder: "3-4 digits",
          hint: "How much does 1kg of food cost?",
          errorText: "000, 0000",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* NEW BIRDS */
      new ReportForm([
        new TextboxReportItem({
          key: "eggs",
          label: "How many eggs are in the shelter this week?",
          placeholder: "1-2 digits",
          keyboardType: "integer",
          required: true,
        }),

        new SwitchReportItem({
          key: "newBorn",
          label: "Any new born this week?",
          value: false,
          switchFor: "amountNewBorn",
        }),

        new TextboxReportItem({
          key: "amountNewBorn",
          label: "Amount of new born this week",
          placeholder: "1-3 digits",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* SOLD */
      new ReportForm([
        new SwitchReportItem({
          key: "soldBirds",
          label: "Any sold birds this week??",
          value: false,
          switchFor: ["soldBirdsAmount", "amountReceived"],
        }),

        new TextboxReportItem({
          key: "soldBirdsAmount",
          label: "How many sold birds this week?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
        }),

        new TextboxReportItem({
          key: "amountReceived",
          label: "Amount received by the Parents",
          unit: "ugx",
          placeholder: "4-7 digits",
          errorText: "0000, 000000",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* SICKNESS */
      new ReportForm([
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
        }),
      ]),

      /* MEDICINE */
      new ReportForm([
        new SwitchReportItem({
          key: "medicineNeeded",
          label: "Any medicine needed this week?",
          value: false,
          switchFor: "medicineAmount",
        }),

        new TextboxReportItem({
          key: "medicineAmount",
          label: "Amount of medicine bought.",
          placeholder: "4-7 digits",
          errorText: "0000, 000000",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* DEAD */
      new ReportForm([
        new SwitchReportItem({
          key: "deadBirds",
          label: "Any dead birds this week?",
          value: false,
          switchFor: "deadBirdsAmount",
        }),

        new TextboxReportItem({
          key: "deadBirdsAmount",
          label: "How many dead birds?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
        }),
      ]),
    ];
  }
}
