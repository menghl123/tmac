import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article, CommentType} from '../article.model';
import {ArticleService} from '../service/article.service';
import {BreadcrumbService} from '../../core/breadcrumb/breadcrumb.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogService} from '../../components/dialog/dialog.service';
import {LteMessageService} from '../../components/message/message.service';
import {CommentService} from '../service/comment.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  article: Article;
  articleBody: any;
  comment: any;
  editorConfig: { [key: string]: any };
  commentPager = {number: 1, size: 10, totalElements: 0} as any;
  showReplyCommentId: string;
  showReplyFormId: string;

  constructor(private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              private domSanitizer: DomSanitizer,
              private dialogService: DialogService,
              private router: Router,
              private commentService: CommentService,
              private lteMessageService: LteMessageService,
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
          icon: 'fa-book',
          label: '博客详情',
        }
      ]
    });
  }

  ngOnInit() {
    this.initCkeditor();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.articleService.increaseViewCount(params.id);
        this.initData(params.id);
      }
    });
  }

  private initData(id) {
    this.articleService.find(id).subscribe(res => {
      this.article = res;
      this.initHmtl();
      this.initComments();
    });
  }

  private initHmtl() {
    this.articleBody = this.domSanitizer.bypassSecurityTrustHtml(this.article.text);
  }

  deleteArticle(article: Article) {
    if (article && article.id) {
      this.dialogService.confirm({
        cssClass: 'modal-default',
        title: '警告',
        content: '确认删除？',
        yes: '确定',
        no: '取消',
      })
        .subscribe(
          data => {
            this.articleService.delete([article.id]).subscribe(res => {
              this.lteMessageService.success('删除成功！');
              if (article.status === 'DELETED') {
                this.router.navigate(['article/manage']);
              } else {
                this.article.status = 'DELETED';
              }
            }, res => {
              this.lteMessageService.error('删除失败！');
            });
          },
          error => null
        );
    }
  }

  private initCkeditor() {
    this.editorConfig = {
      removeButtons: 'Source,Save,NewPage,Scayt',
      image_previewText: '',
      filebrowserBrowseUrl: 'http://127.0.0.1/',
      filebrowserUploadUrl: 'http://localhost:8080/api/upload/image',
      height: 100
    };
  }

  doComment() {
    const comment = {
      text: this.comment,
      destId: this.article.id,
      commentType: CommentType.ARTICLE_COMMENT,
      floor: 1
    };
    this.commentService.save(comment).subscribe((res) => {
      this.lteMessageService.info('评论成功');
      this.loadData(this.article.id, this.commentPager.number, this.commentPager.size);
    });
  }

  private initComments() {
    this.loadData(this.article.id, this.commentPager.number, this.commentPager.size);
  }

  private loadData(destId, index, size) {
    this.commentService.findAll(destId, index, size)
      .subscribe((pager) => {
        pager['number'] = Number(pager['number']) + 1;
        this.commentPager = pager;
      });
  }

  pageChange(index) {
    this.loadData(this.article.id, index, this.commentPager.size);
  }

  replyToComment(commentRow, replyComment) {
    const extra = this.generateCommentExtra(commentRow);
    this.commentService.save({
      text: replyComment,
      destId: commentRow.id,
      commentType: CommentType.COMMENT_COMMENT,
      floor: 1,
      extra: extra
    }).subscribe((res) => {
      this.loadDataForReplyComments(commentRow.replyComments.number + 1, commentRow);
      this.lteMessageService.info('评论成功');
    });
  }

  showReply(id) {
    if (this.showReplyCommentId === id) {
      this.showReplyCommentId = null;
    } else {
      this.showReplyCommentId = id;
    }
  }

  showReplyForm(id) {
    if (this.showReplyFormId === id) {
      this.showReplyFormId = null;
    } else {
      this.showReplyFormId = id;
    }
  }

  private generateCommentExtra(commentRow: any) {
    return `@${commentRow.creater} `;
  }

  replyCommentsPageChange(index, commentRow) {
    this.loadDataForReplyComments(index, commentRow);
  }

  loadDataForReplyComments(index, commentRow) {
    this.commentService.findAll(this.showReplyCommentId || this.showReplyFormId, index, this.commentPager.size)
      .subscribe((pager) => {
        pager['number'] = Number(pager['number']) + 1;
        commentRow.replyComments = pager;
      });
  }
}
