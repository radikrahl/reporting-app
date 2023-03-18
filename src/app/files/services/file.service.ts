import { Injectable } from "@angular/core";
import { ShareFile } from "@nativescript-community/ui-share-file";
import { Folder, knownFolders, Utils } from "@nativescript/core";

@Injectable({ providedIn: "root" })
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

  save(args: { content: any; fileName: string }) {
    const folder = this.getFolder();
    var file = folder?.getFile(args.fileName);

    if (file)
    {
      return file.writeText(args.content).catch((error) => console.log(error));
    }

  }

  delete(args: { fileName: string }) {
    const folder = this.getFolder();
    var file = folder?.getFile(args.fileName);
    return file?.remove();
  }
}
