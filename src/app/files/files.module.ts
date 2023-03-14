import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FilesComponent } from "./pages/files.component";

const routes: Routes = [{ path: "", component: FilesComponent }];

@NgModule({
  declarations: [FilesComponent],

  imports: [CommonModule, RouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FilesModule {}
