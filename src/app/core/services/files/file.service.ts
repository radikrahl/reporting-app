import { Injectable } from "@angular/core";
import { ShareFile } from "@nativescript-community/ui-share-file";
import { Folder, knownFolders, Utils } from "@nativescript/core";

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

  delete(args: { path: string; fileName: string }) {
    // const folder = this._documents.getFolder(args.path);
    var file = this.reports.getFile(args.path);
    return file?.remove();
  }

  deleteFolder(folderName: string) {
    const folder = this.reports.getFolder(folderName);
    return folder?.remove();
  }

  save(args: { content: any; folderName?: string; fileName: string }) {
    // const folder = this._documents.getFolder(args.folderName || "");
    var file = this.reports.getFile(args.folderName + "/" + args.fileName);
    // should there be only one file?
    if (file) {
      return file.writeText(args.content).catch((error) => console.log(error));
    }
  }
}
