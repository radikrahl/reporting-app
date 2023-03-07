
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ReportItemBase } from "../../models/report-item";
import { ReportControlService } from "../../services/report-control.service";

@Component({
  selector: "afriknow-report-page",
  templateUrl: "./report-page.component.html",
  styleUrls: ["./report-page.component.css"],
  providers: [ReportControlService]
})
export class ReportPageComponent {

  @Input() controls: ReportItemBase<unknown>[];


  constructor(private service: ReportControlService) {
  }
}
