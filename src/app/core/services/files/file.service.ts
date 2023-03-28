import { Injectable } from "@angular/core";
import { ShareFile } from "@nativescript-community/ui-share-file";
import { File, Folder, knownFolders, Utils } from "@nativescript/core";

@Injectable({ providedIn: "root" })
export class FileService {
  private readonly _documents: Folder = knownFolders.documents();

  public get documents() {
    return knownFolders.documents();
  }

  public get reports() {
    return this.documents.getFolder("reports");
  }

  public get temp() {
    return knownFolders.temp();
  }

  public getEntities(path: string) {
    return this.reports.getFolder(path).getEntities();
  }

  share(args: { path: string }) {
    try {
      return new ShareFile().open({
        path: this.reports.getFile(args.path).path,
      });
    } catch (e) {
      console.error(e);
    }
  }

  open(args: { path: string }) {
    var file = this.reports.getFile(args.path);
    return Utils.openFile(file.path);
  }

  delete(args: { path: string }) {
    var file = this.reports.getFile(args.path);
    return file.remove();
  }

  deleteFolder(folderName: string) {
    const folder = this.reports.getFolder(folderName);
    return folder.remove();
  }

  async writeText(args: { content: string; path: string }): Promise<any> {
    var file = this.reports.getFile(args.path);
    try {
      return await file.writeText(args.content);
    } catch (error) {
      return console.log(error);
    }
  }

  readText(args: { path: string }): Promise<string> {
    var file = this.reports.getFile(args.path);
    return file.readText();
  }
}
