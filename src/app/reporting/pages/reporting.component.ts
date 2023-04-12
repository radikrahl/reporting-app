import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.scss"],
})
export class ReportingComponent {
  constructor(private router: RouterExtensions) {}

  navigate(route: string) {
    this.router.navigate(["reports/report/" + route]);
  }

  goBack() {
    this.router.back();
  }
}
