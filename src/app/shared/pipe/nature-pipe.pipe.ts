import {Pipe, PipeTransform} from '@angular/core';
import {ArticleNature} from '../../article/article.model';

@Pipe({
  name: 'naturePipe'
})
export class NaturePipe implements PipeTransform {

  public static NatureNameMap = {ORIGINAL: '原创', REPRINT: '转载', TRANSLATE: '翻译'};

  transform(value: any, args?: any): any {
    if (Object.keys(ArticleNature).indexOf(value) !== -1) {
      return NaturePipe.NatureNameMap[value];
    }
    return '未知';
  }

}
