import {Component, EventEmitter, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-personal-excel-preview-modal',
  templateUrl: './personal-excel-preview-modal.component.html',
  styleUrls: ['./personal-excel-preview-modal.component.scss']
})
export class PersonalExcelPreviewModalComponent implements OnInit {
  context: { data: string };
  dismiss: EventEmitter<string>;

  excelNames: string[];
  activeExcelName: string;

  constructor(private domSanitizer: DomSanitizer) {
  }

  changeActiveExcel(name: string) {
    this.activeExcelName = name;
  }

  get previewHtml() {
    let html = this.context[this.activeExcelName];
    // html = "<iframe style='width: 100%;height: 100%;overflow: auto'>" +
    //   html +
    // "</iframe>";
    // debugger
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.excelNames = Object.keys(this.context) || [];
    this.activeExcelName = this.excelNames[0];
  }

  ok() {
    this.dismiss.emit("");
  }

  cancel() {
    this.dismiss.error(false);
  }

}
