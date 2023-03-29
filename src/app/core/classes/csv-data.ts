export type CsvDataRecord = Record<string, any | any[]>;

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
            data[element].push(row.split(",")[i]);
          } else {
            data[element] = [row.split(",")[i]];
          }
        });
      }
    }
    return data;
  }

  public combine(newData: CsvDataRecord) {
    for (const key in newData) {
      if (Object.prototype.hasOwnProperty.call(newData, key)) {
        if (this._data[key] && !Array.isArray(this._data[key]))
          this._data[key] = [this._data[key]];

        if (!Array.isArray(newData[key])) {
          newData[key] = [newData[key]];
        }

        newData[key].forEach((x: any) => {
          if (this._data[key]) this._data[key].push(x);
          else this._data[key] = [x];
        });
      }
    }

    return this._data;
  }

  private writeToText() {
    var keys: string[] = Object.keys(this._data);
    var rows: string[][] = [];

    if (Array.isArray(this._data[keys[0]])) {
      for (let i = 0; i < this._data[keys[0]].length; i++) {
        var row: string[] = [];

        keys.forEach((key, index) => {
          var value = this._data[key];
          row.push(value[i]);
        });
        rows.push(row);
      }
    } else {
      var row: string[] = [];

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
