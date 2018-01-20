import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../core/breadcrumb/breadcrumb.service';
import {ArticleService} from '../service/article.service';
import {Router} from '@angular/router';
import {Article} from '../article.model';
import {LteMessageService} from '../../components/message/message.service';
import {DialogService} from '../../components/dialog/dialog.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {
  pager = {number: 1, size: 10, totalElements: 0} as any;
  activeOperId: string;

  constructor(private breadcrumbService: BreadcrumbService,
              private dialogService: DialogService,
              private router: Router,
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
          icon: 'fa-laptop',
          label: '博客管理',
        }
      ]
    });
  }

  ngOnInit() {
    this.loadData(this.pager.number, this.pager.size);
  }

  pageChange(index) {
    this.loadData(index, this.pager.size);
  }

  private loadData(index, size) {
    this.articleService.findAll(index, size)
      .subscribe((pager) => {
        pager['number'] = Number(pager['number']) + 1;
        this.pager = pager;
      });
  }

  onListItemMouseenter(id) {
    this.activeOperId = id;
  }

  onListItemMouseout() {
    this.activeOperId = '';
  }

  showOper(id): boolean {
    return this.activeOperId === id;
  }

  goToDetail(id) {
    this.router.navigate(['article/detail', id]);
  }

  changeCanComment(article: Article) {
    if (article && article.id) {
      this.articleService.changeCanComment(article.id).subscribe(res => {
        article.canComment = res.canComment;
        this.lteMessageService.success('修改成功！');
      }, res => {
        this.lteMessageService.error('修改失败！');
      });
    }
  }

  deleteArticle(article: Article) {
    if (article && article.id) {

      this.dialogService.confirm({
        cssClass: 'modal-info',
        title: '警告',
        content: '确认删除？',
        yes: '确定',
        no: '取消',
      })
        .subscribe(
          data => {
            this.articleService.delete([article.id]).subscribe(res => {
              this.lteMessageService.success('删除成功！');
              this.loadData(this.pager.number, this.pager.size);
            }, res => {
              this.lteMessageService.error('删除失败！');
            });
          },
          error => null
        );
    }
  }

  topArticle(article: Article) {
    if (article && article.id) {
      this.articleService.topArticle(article.id).subscribe(res => {
        this.loadData(1, this.pager.size);
        this.lteMessageService.success('修改成功！');
      }, res => {
        this.lteMessageService.error('修改失败！');
      });
    }
  }

  modifyArticle(article) {
    this.router.navigate(['article/modify', article.id, {'strategy': 'modify'}]);
  }
}
