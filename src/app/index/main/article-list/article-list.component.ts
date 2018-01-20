import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LteMessageService} from '../../../components/message/message.service';
import {DialogService} from '../../../components/dialog/dialog.service';
import {IndexService} from '../../service/index.service';
import {Article} from '../../../article/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  pager = {number: 1, size: 10, totalElements: 0} as any;

  constructor(private router: Router,
              private indexService: IndexService) {
  }

  ngOnInit() {
    this.loadData(this.pager.number, this.pager.size);
  }

  pageChange(index) {
    this.loadData(index, this.pager.size);
  }

  private loadData(index, size) {
    this.indexService.findAllArticle(index, size)
      .subscribe((pager) => {
        pager['number'] = Number(pager['number']) + 1;
        this.pager = pager;
      });
  }

  goToDetail(id) {
    this.router.navigate(['article/detail', id]);
  }

}
