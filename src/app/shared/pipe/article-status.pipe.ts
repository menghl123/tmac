import { Pipe, PipeTransform } from '@angular/core';
import {ArticleStatus} from '../../article/article.model';

@Pipe({
  name: 'articleStatusPipe'
})
export class ArticleStatusPipe implements PipeTransform {
  public static StatusNameMap = {DRAFT: '草稿', NOT_EXAMINED: '待审批', EXAMINED: '已发表', DELETED: '已删除'};

  transform(value: any, args?: any): any {
    if (Object.keys(ArticleStatus).indexOf(value) !== -1) {
      return ArticleStatusPipe.StatusNameMap[value];
    }
    return '未知';
  }

}
