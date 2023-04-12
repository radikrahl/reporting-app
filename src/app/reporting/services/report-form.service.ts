import { Inject, Injectable } from "@angular/core";
import { createFilePath } from "~/app/shared/files/classes/file";
import { FileManager } from "~/app/shared/files/services/file.manager";
import {
  REPORT_FACTORY,
  ReportFormArray,
} from "~/app/shared/forms/classes/report-form";
import { ReportFactory } from "../classes/reportform.factory";

@Injectable()
export class ReportFormService {
  public reportForm: ReportFormArray;

  constructor(
    @Inject(REPORT_FACTORY) public factory: ReportFactory,
    private files: FileManager
  ) {
    this.reportForm = factory.createReportForm();
  }

  save(type: "chicken" | "goats" | "monthly") {
    let date: Date = this.reportForm.date;
    const parentName: string = this.reportForm.name || "";

    const data = this.reportForm.toFormRecord();
    var path = createFilePath(parentName, date);

    return this.files.save(
      type.charAt(0).toUpperCase() + type.slice(1) + "/" + path,
      data
    );
  }
}
