import { createFilePath } from "~/app/shared/files/classes/file";
import { FileManager } from "../../shared/files/services/file.manager";
import { ChickenReportFactory } from "../classes/reportform.factory";

export class MockdataFactory extends ChickenReportFactory {
  constructor(private files: FileManager) {
    super();
  }
  async create() {
    var data = super.createReportForm().toFormRecord();

    var path = createFilePath(data.parentName as string, data.date as Date);
    return this.files.save(path, data);
  }

  private createMockData() {
    var data: Record<string, unknown> = {
      parentName: "Parent " + randNumber(2),
      date: randomDate(new Date(2022, 0), new Date(2024, 0)),
      chicken: 4,
      foodQuantity: randNumber(100, 0),
      eggs: randNumber(10),
      newBorn: false,
      amountNewBorn: 4,
      soldBirds: true,
      soldBirdsAmount: randNumber(10, 0),
      amountReceived: randNumber(10000, 1000),
      sickBirds: true,
      sickBirdsAmount: randNumber(10),
      sickness: "Sickness",
      medicineNeeded: false,
      medicineAmount: undefined,
      deadBirds: false,
      deadBirdsAmount: 4,
    };
    return data;
  }

  private createMockArray() {
    var data: { [key: string]: any[] } = {
      parentName: ["Parent " + randNumber(20)],
      date: [new Date(Date.now())],
      chicken: [4],
      foodQuantity: [randNumber(100, 0)],
      eggs: [randNumber(10)],
      newBorn: [false],
      amountNewBorn: [4],
      soldBirds: [true],
      soldBirdsAmount: [randNumber(10, 0)],
      amountReceived: [randNumber(10000, 1000)],
      sickBirds: [true],
      sickBirdsAmount: [randNumber(10)],
      sickness: ["Sickness"],
      medicineNeeded: [false],
      medicineAmount: [randNumber(10)],
      deadBirds: [false],
      deadBirdsAmount: [4],
    };

    return data;
  }
}
function randNumber(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + 1;
}

function randomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}
