export type CsvDataRecord = Record<string, unknown | unknown[]>;

export class CsvData {
  private _data: CsvDataRecord;

  public get data(): CsvDataRecord {
    return this._data;
  }

  public get text(): string {
    return this.writeToText();
  }

  constructor(data: CsvDataRecord) {
    this._data = data;
  }

  static createFromText(text: string) {
    var data: CsvDataRecord = {};
    var colDef = text.split("\n").shift()?.split(",");
    if (colDef) {
      for (let i = 0; i < colDef.length; i++) {
        const element = colDef[i];
        text.split("\n").forEach((row, index) => {
          if (index === 0) return;
          if (data[element]) {
            (<Array<unknown>>data[element]).push(row.split(",")[i]);
          } else {
            data[element] = [row.split(",")[i]];
          }
        });
      }
    }
    return new CsvData(data);
  }

  public combine(newData: CsvDataRecord) {
    for (const key in newData) {
      if (Object.prototype.hasOwnProperty.call(newData, key)) {
        if (this._data[key] && !Array.isArray(this._data[key]))
          this._data[key] = [this._data[key]];

        if (!Array.isArray(newData[key])) {
          newData[key] = [newData[key]];
        }

        (<Array<unknown>>newData[key]).forEach((value: any) => {
          if (this._data[key]) (<Array<unknown>>this._data[key]).push(value);
          else this._data[key] = [value];
        });
      }
    }

    return this._data;
  }

  private writeToText() {
    var keys: string[] = Object.keys(this._data);
    var rows: unknown[][] = [];
    var firstElement = this._data[keys[0]];
    if (Array.isArray(firstElement)) {
      for (let i = 0; i < firstElement.length; i++) {
        var row: unknown[] = [];

        keys.forEach((key, index) => {
          var value = this._data[key] as unknown[];
          row.push(value[i]);
        });
        rows.push(row);
      }
    } else {
      var row: unknown[] = [];

      keys.forEach((key, index) => {
        var value = this._data[key];
        if (Array.isArray(value)) {
          throw new Error("not implmented");
        } else if (value) {
          row.push(value);
        } else {
          row.push("");
        }
      });
      rows.push(row);
    }

    var csvText =
      keys.join(",") + "\n" + rows.map((x) => x?.join(",")).join("\n");
    return csvText;
  }
}
