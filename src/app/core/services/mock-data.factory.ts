import { Inject, Injectable } from "@angular/core";
import { REPORT_FORM_DATA } from "~/app/core/constants/mockdata";
import { QuestionGroup } from "~/app/core/models/report-item";
import { CsvData } from "../classes/csv-data";
import { FileManager } from "./files/file.manager";

@Injectable({
  providedIn: "root",
})
export class MockdataFactory {
  constructor(
    @Inject(REPORT_FORM_DATA) private data: QuestionGroup[],
    private csv: FileManager
  ) {}
  async create(): Promise<CsvData> {
    var parentControl = this.data[0].form.get("parentName");
    parentControl?.setValue(
      "mockparent" + (Math.floor(Math.random() * (20 - 1 + 1)) + 1)
    );

    const date = <Date>this.data[0].form.get("date")?.value;
    var data = new CsvData(this.createMockData());
    const fileName = `${
      data.data.parentName
    }-${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${this.randNumber(
      20
    )}.csv`;

    return this.csv.writeText({
      content: data.text,
      path: data.data.parentName + "/" + fileName,
    });
  }

  private createMockData() {
    var data: { [key: string]: any } = {
      parentName: "mockparent" + this.randNumber(10),
      date: new Date(Date.now()),
      chicken: 4,
      foodQuantity: this.randNumber(100, 0),
      eggs: this.randNumber(10),
      newBorn: false,
      amountNewBorn: 4,
      soldBirds: true,
      soldBirdsAmount: this.randNumber(10, 0),
      amountReceived: this.randNumber(10000, 1000),
      sickBirds: true,
      sickBirdsAmount: this.randNumber(10),
      sickness: "Sickness",
      medicineNeeded: false,
      medicineAmount: undefined,
      deadBirds: false,
      deadBirdsAmount: 4,
    };
    return data;
  }

  private createMockArray() {
    var data: { [key: string]: any } = {
      parentName: ["mockparent" + this.randNumber(20)],
      date: [new Date(Date.now())],
      chicken: [4],
      foodQuantity: [this.randNumber(100, 0)],
      eggs: [this.randNumber(10)],
      newBorn: [false],
      amountNewBorn: [4],
      soldBirds: [true],
      soldBirdsAmount: [this.randNumber(10, 0)],
      amountReceived: [this.randNumber(10000, 1000)],
      sickBirds: [true],
      sickBirdsAmount: [this.randNumber(10)],
      sickness: ["Sickness"],
      medicineNeeded: [false],
      medicineAmount: [this.randNumber(10)],
      deadBirds: [false],
      deadBirdsAmount: [4],
    };

    return data;
  }

  private randNumber(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + 1;
  }
}
