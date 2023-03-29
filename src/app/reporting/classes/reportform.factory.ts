import { ReportForm } from "~/app/shared/forms/classes/report-form";
import { DatepickerReportItem } from "~/app/shared/forms/components/datepicker/datepicker.component";
import { SwitchReportItem } from "~/app/shared/forms/components/switch/switch.component";
import { TextboxReportItem } from "~/app/shared/forms/components/textbox/textbox.component";

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

      new ReportForm([
        new TextboxReportItem({
          key: "chicken",
          label: "How many chicken",
          hint: "How many chicken are at the parent's place.",
          errorText: "How many chicken are at the parent's place.",
          required: true,
          keyboardType: "integer",
        }),
      ]),

      /* FOOD */
      new ReportForm([
        new TextboxReportItem({
          key: "foodQuantity",
          label: "Quantity of food",
          hint: "How much food was needed today?",
          errorText: "How much extra food in kg was needed today? 0-100",
          unit: "kg",
          keyboardType: "number",
          required: true,
        }),

        new TextboxReportItem({
          key: "foodPrice",
          label: "Price of food",
          unit: "ugx",
          hint: "How much does 1kg of food cost?",
          errorText: "How much does 1kg of food cost?",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* NEW BIRDS */
      new ReportForm([
        new TextboxReportItem({
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

        new TextboxReportItem({
          key: "amountNewBorn",
          label: "Amount of new born",
          hint: "Amount of new born birds",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* SOLD */
      new ReportForm([
        new SwitchReportItem({
          key: "soldBirds",
          label: "Any sold Birds?",
          value: false,
          switchFor: ["soldBirdsAmount", "amountReceived"],
        }),

        new TextboxReportItem({
          key: "soldBirdsAmount",
          label: "How many sold birds",
          keyboardType: "integer",
          required: true,
        }),

        new TextboxReportItem({
          key: "amountReceived",
          label: "Amount received by the Parents",
          unit: "ugx",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* SICKNESS */
      new ReportForm([
        new SwitchReportItem({
          key: "sickBirds",
          label: "Any sick Birds?",
          value: false,
          switchFor: ["sickBirdsAmount", "sickness"],
        }),

        new TextboxReportItem({
          key: "sickBirdsAmount",
          label: "How many sick birds?",
          keyboardType: "integer",
          required: true,
        }),

        new TextboxReportItem({
          key: "sickness",
          label: "Which sickness?",
          required: true,
        }),
      ]),

      /* MEDICINE */
      new ReportForm([
        new SwitchReportItem({
          key: "medicineNeeded",
          label: "Any medicine needed?",
          value: false,
          switchFor: "medicineAmount",
        }),

        new TextboxReportItem({
          key: "medicineAmount",
          label: "Amount of medicine bought",
          keyboardType: "integer",
          required: true,
        }),
      ]),

      /* DEAD */
      new ReportForm([
        new SwitchReportItem({
          key: "deadBirds",
          label: "Any dead Birds?",
          value: false,
          switchFor: "deadBirdsAmount",
        }),

        new TextboxReportItem({
          key: "deadBirdsAmount",
          label: "How many dead birds",
          keyboardType: "integer",
          required: true,
        }),
      ]),
    ];
  }
}
