import { Injectable } from "@angular/core";
import { Folder, knownFolders } from "@nativescript/core";

@Injectable({
  providedIn: "root",
})
export class FolderService {
  getFolder(path: string): Folder | null {
    const documents = knownFolders.documents();

    return documents.getFolder(path);
  }
}
