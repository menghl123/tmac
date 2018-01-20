import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CKEditorComponent} from 'ng2-ckeditor';
import {ArticleService} from '../service/article.service';
import {ArticleStatus} from '../article.model';
import {BreadcrumbService} from '../../core/breadcrumb/breadcrumb.service';
import {LteMessageService} from '../../components/message/message.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  strategy: string;
  form: FormGroup;
  editorConfig: { [key: string]: any };
  @ViewChild('ckeditor')
  ckeditor: CKEditorComponent;

  constructor(private fb: FormBuilder,
              private lteMessageService: LteMessageService,
              private breadcrumbService: BreadcrumbService,
              private router: Router,
              private route: ActivatedRoute,
              private articleService: ArticleService) {
    this.breadcrumbService.breadcrumbsEmitter.emit({
      pageInfo: {
        pageTitle: '博客',
        pageDescription: 'blog'
      },
      items: [{
        icon: 'fa-wordpress',
        label: '博客',
      },
        {
          icon: 'fa-edit',
          label: '博客编辑',
        }
      ]
    });
  }

  ngOnInit() {
    this.initCkeditor();
    this.initModifyForm();
    this.route.params.subscribe((params) => {
      if (params && params.strategy === 'modify') {
        this.strategy = 'modify';
        if (params.id) {
          this.articleService.find(params.id).subscribe((res) => {
            this.form.addControl('id', this.fb.control(res.id));
            this.form.patchValue({
              nature: res.nature,
              title: res.title,
              labels: res.labels,
              isPrivate: res.isPrivate,
              type: res.type,
              isAnonymous: res.isAnonymous,
              status: res.status,
              canComment: res.canComment,
              sortId: res.sortId,
              viewCount: res.viewCount,
            });
            setTimeout(() => {
              this.form.patchValue({
                text: res.text,
              });
            }, 1000);
          });
        }
      } else {
        this.strategy = 'create';
        this.initForm();
      }
    });
  }

  private initCkeditor() {
    this.editorConfig = {
      removeButtons: 'Source,Save,NewPage,Scayt',
      image_previewText: '',
      filebrowserBrowseUrl: 'http://127.0.0.1/',
      filebrowserUploadUrl: 'http://localhost:8080/api/upload/image',
      height: 300
    };
  }

  submit($event) {
    if (this.strategy === 'create') {
      this.articleService.save(this.form.value).subscribe(res => {
          this.lteMessageService.success('提交成功');
          this.router.navigate(['article/manage']);
        },
        res => this.lteMessageService.error('提交失败'));
    } else {
      this.articleService.modify(this.form.value).subscribe(res => {
          this.lteMessageService.success('提交成功');
          this.router.navigate(['article/manage']);
        },
        res => this.lteMessageService.error('提交失败'));
    }

  }

  saveAsDraft($event) {
    if (this.strategy === 'create') {
      this.form.patchValue({status: ArticleStatus.DRAFT});
      this.articleService.save(this.form.value).subscribe(res => {
          this.lteMessageService.success('保存草稿成功');
          this.router.navigate(['article/manage']);
        },
        res => this.lteMessageService.error('保存草稿失败'));
    } else {
      this.form.patchValue({status: ArticleStatus.DRAFT});
      this.articleService.modify(this.form.value).subscribe(res => {
          this.lteMessageService.success('保存草稿成功');
          this.router.navigate(['article/manage']);
        },
        res => this.lteMessageService.error('保存草稿失败'));
    }

  }

  private initForm() {
    this.form = this.fb.group({
      nature: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
      labels: [''],
      isPrivate: [0],
      type: ['', Validators.required],
      isAnonymous: [0],
      status: [ArticleStatus.NOT_EXAMINED],
      canComment: [1],
      sortId: [0],
      viewCount: [0]
    });
  }

  private initModifyForm() {
    this.form = this.fb.group({
      nature: [{value: '', disabled: true}, Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
      labels: [''],
      isPrivate: [0],
      type: [{value: '', disabled: true}, Validators.required],
      isAnonymous: [0],
      status: [ArticleStatus.NOT_EXAMINED],
      canComment: [1],
      sortId: [0],
      viewCount: [0]
    });
  }
}
