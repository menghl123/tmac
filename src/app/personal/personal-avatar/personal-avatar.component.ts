import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from '../../core/fileUpload/file-upload.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-personal-avatar',
  templateUrl: './personal-avatar.component.html',
  styleUrls: ['./personal-avatar.component.scss']
})
export class PersonalAvatarComponent implements OnInit {
  context: { selectUrl: string };
  dismiss: EventEmitter<string>;
  headImgData: any[];
  selectUrl: string;
  @ViewChild('fileChoose')
  fileChoose: ElementRef;

  constructor(private fileUploadService: FileUploadService) {
    this.headImgData = [
      '/1.jpg',
      '/2.jpg',
      '/3.jpg',
      '/4.jpg',
      '/5.jpg',
      '/6.jpg',
      '/7.jpg',
      '/8.jpg',
      '/9.jpg',
      '/10.jpg',
      '/11.jpg',
      '/12.jpg',
    ];
  }

  ngOnInit(): void {
    this.selectUrl = this.context.selectUrl;
  }


  ok() {
    this.dismiss.emit(this.selectUrl);
  }

  cancel() {
    this.dismiss.error(false);
  }

  selectImg(data) {
    if (this.selectUrl === data) {
      this.selectUrl = null;
      return;
    }
    this.selectUrl = data;
  }

  chooseImg() {
    const fileInput = this.fileChoose.nativeElement;
    fileInput.value = null;
    fileInput.click();
  }

  importImg() {
    const file = this.fileChoose.nativeElement.files[0];
    const formData = new FormData();
    formData.set('file', file);
    this.fileUploadService.upload(formData).subscribe((res) => {
      this.selectUrl = `${res.name}`;
      this.headImgData.push(this.selectUrl);
    });
  }

}
