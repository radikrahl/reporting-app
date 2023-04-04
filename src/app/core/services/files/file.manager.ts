import { Injectable } from "@angular/core";
import { ShareFile } from "@nativescript-community/ui-share-file";
import { File, Folder, knownFolders, Utils } from "@nativescript/core";

@Injectable({ providedIn: "root" })
export class FileManager {
  private get documents() {
    return knownFolders.documents();
  }

  private get reports() {
    return this.documents.getFolder("reports");
  }

  private get temp() {
    return knownFolders.temp();
  }

  private _base: Folder = this.reports;

  public set base(value: 'reports' | 'temp') {
    if (value === 'reports') {
      this._base = this.reports;
    }
    else if (value === 'temp')
      this._base = this.temp
  }

  public getEntities(path: string) {
    return this._base.getFolder(path).getEntities();
  }

  share(args: { path: string }) {
    try {
      return new ShareFile().open({
        path: this._base.getFile(args.path).path,
      });
    } catch (e) {
      console.error(e);
    }
  }

  open(args: { path: string }) {
    var file = this._base.getFile(args.path);
    return Utils.openFile(file.path);
  }

  delete(args: { path: string }) {
    var file = this._base.getFile(args.path);
    return file.remove();
  }

  deleteFolder(folderName: string) {
    const folder = this._base.getFolder(folderName);
    return folder.remove();
  }

  async writeText(args: {
    content: string;
    path: string;
  }): Promise<any> {

      var file = this._base.getFile(args.path);

    try {
      return await file.writeText(args.content);
    } catch (error) {
      return console.log(error);
    }
  }

  readText(args: { path: string}): Promise<string> {

      var file = this._base.getFile(args.path);

    return file.readText();
  }
}
