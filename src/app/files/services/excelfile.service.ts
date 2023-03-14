import { Injectable } from "@angular/core";
import { FormRecord } from "@angular/forms";
import { ShareFile } from "@nativescript-community/ui-share-file";
import { knownFolders, path, File, Folder, Utils } from "@nativescript/core";

type ExcelData = {
  head: string[];
  rows: any[][];
};

interface IFileService {
  share(args: { path: string; fileName: string }): Promise<boolean>;
  open(args: { path: string }): boolean;
  save(args: any): Promise<void>;
}

@Injectable()
export class ExcelFileService implements IFileService {
  constructor(private files: FileService) {}

  async getReports(): Promise<File[]> {
    const folder = this.files.getFolder();
    const entities = await folder.getEntities();

    return entities.map((x) => folder.getFile(x.name));
  }

  save(object: FormRecord) {
    const fileDate = <Date>object.get("1").get("date").value;
    const parentName = <string>object.get("1").get("parentName").value;

    const fileName = `report-${parentName}-${fileDate.getUTCFullYear()}-${fileDate.getUTCMonth()}-${fileDate.getUTCDate()}.csv`;
    const content = JSON.stringify(object.value);

    return this.files.save({ content, fileName });
  }

  share(args: { path: string; fileName: string }) {
    return this.files.share(args);
  }
  open(args: { path: string }): boolean {
    return this.files.open(args);
  }

  delete(args: {fileName:string}){
    return this.files.delete(args);
  }
}

@Injectable({ providedIn: 'root' })
export class FileService {
  getFolder(): Folder | null {
    const documents = knownFolders.documents();

    return documents.getFolder("reports");
  }

  share(args: { path: string; fileName: string }) {
    try {
      return new ShareFile().open({
        path: args.path,
      });
    } catch (e) {
      console.error(e);
    }
  }

  open(args: { path: string }) {
    return Utils.openFile(args.path);
  }

  save(args: { content: string; fileName: string }) {
    const folder = this.getFolder();
    var file = folder.getFile(args.fileName);

    return file.writeText(args.content);
  }

  delete(args: {fileName:string}) {
    const folder = this.getFolder();
    var file = folder.getFile(args.fileName);
    return file.remove();
  }
}
