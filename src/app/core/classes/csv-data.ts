import { WorkSheet, read, utils, write } from "xlsx";

export class CsvData {
  constructor(public head: string[], public rows: string[][]) {}

  toFileContent(): string {
    const workbook = utils.book_new();

    const worksheet = utils.aoa_to_sheet([this.head, this.rows]);

    utils.book_append_sheet(workbook, worksheet);
    return write(workbook, { type: "string", bookType: "csv" });
  }
}

export class CsvWorkSheetAdapter implements WorkSheet {
  private readonly _sheet: WorkSheet;

  constructor(sheet: WorkSheet) {
    this._sheet = sheet;
  }

  append(sheet: WorkSheet) {
    const json = utils.sheet_to_json(sheet);
    var currentSheetJson = utils.sheet_to_json(this._sheet);

    currentSheetJson.push(json[0]);

    return utils.sheet_add_json(sheet, currentSheetJson);
  }

  combine(entities: string[]) {
    let sheet: WorkSheet | undefined;
    entities.forEach((entity) => {
      const data = read(entity, { type: "string" }).Sheets["Sheet1"];
      this.append(data);
    });
    return sheet ? this.toCsvData() : undefined;
  }

  toCsvData() {
    var csvText = utils.sheet_to_csv(this._sheet).split("\n");
    var head = csvText.shift()!.split(",");
    var rows = csvText.map((rowText) => rowText.split(","));
    return new CsvData(head, rows);
  }

  static createSheet(csvText: string[]): CsvWorkSheetAdapter | undefined {
    let sheet: CsvWorkSheetAdapter | undefined;
    csvText.forEach((entity) => {
      if (!sheet) {
        sheet = new CsvWorkSheetAdapter(
          read(entity, { type: "string" }).Sheets["Sheet1"]
        );
      } else {
        const data = read(entity, { type: "string" }).Sheets["Sheet1"];
        sheet.append(data);
      }
    });
    return sheet ? new CsvWorkSheetAdapter(sheet) : undefined;
  }
}
