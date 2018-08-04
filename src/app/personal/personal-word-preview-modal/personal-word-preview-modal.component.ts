import {Component, EventEmitter, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-personal-word-preview-modal',
  templateUrl: './personal-word-preview-modal.component.html',
  styleUrls: ['./personal-word-preview-modal.component.scss']
})
export class PersonalWordPreviewModalComponent implements OnInit {
  context: { data: string };
  dismiss: EventEmitter<string>;

  previewHtml: any;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.previewHtml = this.domSanitizer.bypassSecurityTrustHtml(this.context.data);
  }

  ok() {
    this.dismiss.emit("");
  }

  cancel() {
    this.dismiss.error(false);
  }
}
