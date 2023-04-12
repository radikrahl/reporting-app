import {
  ReportFormArray,
  ReportFormGroup,
} from "~/app/shared/forms/classes/report-form";
import { DatepickerReportItem } from "~/app/shared/forms/components/datepicker/datepicker.component";
import { ListpickerReportItem } from "~/app/shared/forms/components/listpicker/listpicker.component";
import { SwitchReportItem } from "~/app/shared/forms/components/switch/switch.component";
import { TextboxReportItem } from "~/app/shared/forms/components/textbox/textbox.component";
import { TextViewReportItem } from "~/app/shared/forms/components/textview/textview.component";

export abstract class ReportFactory {
  abstract createReportForm(): ReportFormArray;
}

export class ChickenReportFactory extends ReportFactory {
  private readonly parentNames = [
    "Manana Moses",
    "Shere Lydia",
    "Rebecca Bilunji",
    "Francis Gimungu",
    "Kissa Joy",
    "Beatrice",
    "Kolya Martin",
    "Olivia Namagendo",
    "Nadundu Farida",
    "Sano Zaina",
    "Namajja, Suzan",
    "Nagudi Juliet",
    "Fazila Nawusanyi",
    "Zulha Kagaya",
    "Atim Sarah",
    "Margret Wazemba",
    "Witsulala John",
    "Katono",
    "Nasaka Jennipeher",
    "Nasaka Jennifa",
    "Hellen",
    "Magret",
  ];

  createReportForm(): ReportFormArray {
    return new ReportFormArray("chicken", [
      new ReportFormGroup([
        new ListpickerReportItem({
          key: "parentName",
          label: "Parent name",
          required: true,
          items: this.parentNames,
        }),
        new DatepickerReportItem({
          key: "date",
          label: "Enter Date",
          value: new Date(Date.now()),
          required: true,
        }),
      ]),

      /* Inventory */

      new ReportFormGroup([
        new TextboxReportItem({
          key: "chicken",
          label: "How many chicken this week?",
          hint: "How many chicken are at the parent's place.",
          placeholder: "1-3 digits",
          errorText: "0, 00, 000",
          required: true,
          keyboardType: "integer",
          min: 1,
          max: 1000,
          maxLength: 3,
        }),
      ]),

      /* FOOD */
      new ReportFormGroup([
        new TextboxReportItem({
          key: "foodQuantity",
          label: "Quantity of food this week?",
          hint: "How much food was needed this week?",
          placeholder: "1-3 digits",
          unit: "kg",
          keyboardType: "number",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 3,
        }),

        new TextboxReportItem({
          key: "foodPrice",
          label: "Price of food",
          unit: "ugx/kg",
          placeholder: "3-4 digits",
          hint: "How much does 1kg of food cost?",
          errorText: "000, 0000",
          keyboardType: "integer",
          required: true,
          min: 100,
          max: 10000,
        }),
      ]),

      /* NEW BIRDS */
      new ReportFormGroup([
        new TextboxReportItem({
          key: "eggs",
          label: "How many eggs?",
          hint: "How many eggs are in the shelter this week?",
          placeholder: "1-2 digits",
          keyboardType: "integer",
          required: true,
          min: 0,
          max: 100,
          maxLength: 2,
        }),

        new SwitchReportItem({
          key: "newBorn",
          label: "Any new born this week?",
          value: true,
          switchFor: "amountNewBorn",
        }),

        new TextboxReportItem({
          key: "amountNewBorn",
          label: "New Born",
          hint: "Amount of new born this week",
          placeholder: "1-3 digits",
          keyboardType: "integer",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 3,
        }),
      ]),

      /* SOLD */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "soldBirds",
          label: "Any sold birds this week?",
          value: true,
          switchFor: ["soldBirdsAmount", "amountReceived"],
        }),

        new TextboxReportItem({
          key: "soldBirdsAmount",
          label: "Sold birds",
          hint: "How many sold birds this week?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 4,
        }),

        new TextboxReportItem({
          key: "amountReceived",
          label: "Amount received",
          hint: "What is the amount received by the parents.",
          unit: "ugx",
          placeholder: "4-7 digits",
          errorText: "0000, 000000",
          keyboardType: "integer",
          required: true,
          min: 1000,
          minLength: 4,
        }),
      ]),

      /* SICKNESS */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "sickBirds",
          label: "Any sick birds this week?",
          value: true,
          switchFor: ["sickBirdsAmount", "sickness"],
        }),

        new TextboxReportItem({
          key: "sickBirdsAmount",
          label: "How many sick birds?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 4,
        }),

        new TextViewReportItem({
          key: "sickness",
          label: "Which sickness?",
          required: true,
          placeholder: "e.g. Newcastle, cough, etc...",
          errorText: "Please provide a sickness reason.",
          minLength: 3,
        }),
      ]),

      /* MEDICINE */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "medicineNeeded",
          label: "Any medicine needed this week?",
          value: true,
          switchFor: "medicineAmount",
        }),

        new TextboxReportItem({
          key: "medicineAmount",
          label: "Amount of medicine bought.",
          placeholder: "4-7 digits",
          unit: "ugx",
          errorText: "0000, 000000",
          keyboardType: "integer",
          required: true,
          min: 500,
          minLength: 4,
        }),
      ]),

      /* DEAD */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "deadBirds",
          label: "Any dead birds this week?",
          value: true,
          switchFor: ["deadBirdsAmount", "deathReason"],
        }),

        new TextboxReportItem({
          key: "deadBirdsAmount",
          label: "How many dead birds?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
          min: 1,
          maxLength: 3,
        }),

        new TextViewReportItem({
          key: "deathReason",
          label: "Reason of death",
          placeholder: "e.g. sickness, environment, food poisoning",
          required: true,
          minLength: 3,
        }),
      ]),
    ]);
  }
}

export class GoatReportFormFactory extends ReportFactory {
  private readonly goatParentNames = ["Zakia", "Zakia Wetikire"];

  createReportForm(): ReportFormArray {
    return new ReportFormArray("goats", [
      new ReportFormGroup([
        new ListpickerReportItem({
          key: "parentName",
          label: "Parent name",
          required: true,
          items: this.goatParentNames,
        }),
        new DatepickerReportItem({
          key: "date",
          label: "Enter Date",
          value: new Date(Date.now()),
          required: true,
        }),
      ]),

      /* Inventory */

      new ReportFormGroup([
        new TextboxReportItem({
          key: "goats",
          label: "How many goats this week?",
          hint: "How many goats are at the parent's place.",
          placeholder: "1-3 digits",
          errorText: "0, 00, 000",
          required: true,
          keyboardType: "integer",
          min: 1,
          max: 1000,
          maxLength: 3,
        }),
      ]),

      /* FOOD */
      new ReportFormGroup([
        new TextboxReportItem({
          key: "foodQuantity",
          label: "Quantity of food this week?",
          hint: "How much food was needed this week?",
          placeholder: "1-3 digits",
          unit: "kg",
          keyboardType: "number",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 3,
        }),

        new TextboxReportItem({
          key: "foodPrice",
          label: "Price of food",
          unit: "ugx/kg",
          placeholder: "3-4 digits",
          hint: "How much does 1kg of food cost?",
          errorText: "000, 0000",
          keyboardType: "integer",
          required: true,
          min: 100,
          max: 10000,
        }),
      ]),

      /* NEW BIRDS */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "newBorn",
          label: "Any new born this week?",
          value: true,
          switchFor: "amountNewBorn",
        }),

        new TextboxReportItem({
          key: "amountNewBorn",
          label: "New Born",
          hint: "Amount of new born this week",
          placeholder: "1-3 digits",
          keyboardType: "integer",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 3,
        }),
      ]),

      /* SOLD */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "soldGoats",
          label: "Any sold goats this week?",
          value: true,
          switchFor: ["soldGoatsAmount", "amountReceived"],
        }),

        new TextboxReportItem({
          key: "soldGoatsAmount",
          label: "Sold Goats",
          hint: "How many sold goats this week?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 4,
        }),

        new TextboxReportItem({
          key: "amountReceived",
          label: "Amount received",
          hint: "What is the amount received by the parents.",
          unit: "ugx",
          placeholder: "4-7 digits",
          errorText: "0000, 000000",
          keyboardType: "integer",
          required: true,
          min: 1000,
          minLength: 4,
        }),
      ]),

      /* SICKNESS */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "sickGoats",
          label: "Any sick goats this week?",
          value: true,
          switchFor: ["sickGoatsAmount", "sickness"],
        }),

        new TextboxReportItem({
          key: "sickGoatsAmount",
          label: "How many sick goats?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
          min: 1,
          max: 1000,
          maxLength: 4,
        }),

        new TextViewReportItem({
          key: "sickness",
          label: "Which sickness?",
          required: true,
          placeholder: "e.g. Newcastle, cough, etc...",
          errorText: "Please provide a sickness reason.",
          minLength: 3,
        }),
      ]),

      /* MEDICINE */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "medicineNeeded",
          label: "Any medicine needed this week?",
          value: true,
          switchFor: "medicineAmount",
        }),

        new TextboxReportItem({
          key: "medicineAmount",
          label: "Amount of medicine bought.",
          placeholder: "4-7 digits",
          unit: "ugx",
          errorText: "0000, 000000",
          keyboardType: "integer",
          required: true,
          min: 500,
          minLength: 4,
        }),
      ]),

      /* DEAD */
      new ReportFormGroup([
        new SwitchReportItem({
          key: "deadGoats",
          label: "Any dead goats this week?",
          value: true,
          switchFor: ["deadGoatsAmount", "deathReason"],
        }),

        new TextboxReportItem({
          key: "deadGoatsAmount",
          label: "How many dead goats?",
          placeholder: "1-3 digits",
          errorText: "0",
          keyboardType: "integer",
          required: true,
          min: 1,
          maxLength: 3,
        }),

        new TextViewReportItem({
          key: "deathReason",
          label: "Reason of death",
          placeholder: "e.g. sickness, environment, food poisoning",
          required: true,
          minLength: 3,
        }),
      ]),
    ]);
  }
}

export class MonthlyFormFactory extends ReportFactory {
  createReportForm(): ReportFormArray {
    return new ReportFormArray("monthly", [
      new ReportFormGroup([
        new DatepickerReportItem({
          key: "date",
          label: "Enter Date",
          value: new Date(Date.now()),
          required: true,
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
    ]);
  }
}
