import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from '../../core/fileUpload/file-upload.service';
import {ModalService} from '../../components/modal/modal.service';
import {PersonalWordPreviewModalComponent} from '../personal-word-preview-modal/personal-word-preview-modal.component';
import {PersonalExcelPreviewModalComponent} from '../personal-excel-preview-modal/personal-excel-preview-modal.component';

@Component({
  selector: 'app-personal-excel-preview',
  templateUrl: './personal-excel-preview.component.html',
  styleUrls: ['./personal-excel-preview.component.scss']
})
export class PersonalExcelPreviewComponent implements OnInit {

  @ViewChild('fileChoose')
  fileChoose: ElementRef;

  constructor(private fileUploadService: FileUploadService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

  chooseWord() {
    const fileInput = this.fileChoose.nativeElement;
    fileInput.value = null;
    fileInput.click();
  }

  importImg() {
    const file = this.fileChoose.nativeElement.files[0];
    const formData = new FormData();
    formData.set('file', file);
    this.fileUploadService.excelPreviewHtml(formData).subscribe((res) => {
      this.modalService.open<string>({
        component: PersonalExcelPreviewModalComponent,
        componentFactoryResolver: this.componentFactoryResolver,
        resolve: res,
        size: 'lg'
      })
        .subscribe(selectUrl => {
        }, error => {
          console.error('no change img', error);
        });
    });
  }
}
