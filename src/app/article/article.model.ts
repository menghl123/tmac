export interface Article {
  id: string;
  title: string;
  text: string;
  nature: string;
  labels: string;
  isPrivate: number;
  type: string;
  isAnonymous: number;
  status: string;
  sortId: number;
  viewCount: number;
  canComment: number;
  commentCount?: number;
  author?: any;
  createTime?: any;
}

export interface Comment {
  id?: string;
  text?: string;
  destId?: string;
  commentType?: string;
  extra?: string;
  floor?: number;
  replyComments?: any;
}

export enum CommentType {
  ARTICLE_COMMENT = 'ARTICLE_COMMENT', COMMENT_COMMENT = 'COMMENT_COMMENT'
}

export enum ArticleNature {
  ORIGINAL = '原创', REPRINT = '转载', TRANSLATE = '翻译'
}

export enum ArticleStatus {
  DRAFT = 'DRAFT', NOT_EXAMINED = 'NOT_EXAMINED', EXAMINED = 'EXAMINED', DELETED = 'DELETED'
}
