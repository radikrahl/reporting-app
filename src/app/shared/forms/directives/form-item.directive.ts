import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ComponentRef,
  ViewContainerRef,
} from "@angular/core";
import { FormRecord } from "@angular/forms";
import { ReportControl } from "../classes/report-control";

@Directive({
  selector: "[formItem]",
})
export class FormItemDirective implements OnInit, OnDestroy {
  @Input() formItem?: ReportControl<unknown>;
  @Input() form?: FormRecord<any>;

  componentRef?: ComponentRef<any>;
  constructor(private view: ViewContainerRef) {}

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  ngOnInit(): void {
    this.componentRef = this.view.createComponent(this.formItem?.component);
    this.componentRef.setInput("question", this.formItem);
    this.componentRef.setInput("form", this.form);
  }
}
