import { Component } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptModule, NativeScriptRouterModule } from "@nativescript/angular";

@Component({
  templateUrl: './grid.component.html',
  standalone: true,
  imports: [NativeScriptModule, NativeScriptRouterModule]
})
export class GridLayoutComponent {

}
