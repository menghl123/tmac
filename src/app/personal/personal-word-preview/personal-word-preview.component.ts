import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from '../../core/fileUpload/file-upload.service';
import {ModalService} from '../../components/modal/modal.service';
import {PersonalWordPreviewModalComponent} from '../personal-word-preview-modal/personal-word-preview-modal.component';

@Component({
  selector: 'app-personal-word-preview',
  templateUrl: './personal-word-preview.component.html',
  styleUrls: ['./personal-word-preview.component.scss']
})
export class PersonalWordPreviewComponent implements OnInit {
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
    this.fileUploadService.wordPreviewHtml(formData).subscribe((res) => {
      this.modalService.open<string>({
        component: PersonalWordPreviewModalComponent,
        componentFactoryResolver: this.componentFactoryResolver,
        resolve: {
          data: res.data
        },
        size: 'lg'
      })
        .subscribe(selectUrl => {
        }, error => {
          console.error('no change img', error);
        });
    });
  }
}
