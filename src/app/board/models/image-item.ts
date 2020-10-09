export interface IImageItems {
  _id: string,
  url: string,
  tags: ITag[];
}

export interface IBoard {
  _id: string,
  name: string,
  isDraft?: boolean,
  images?: IImageItems[]
}

export interface ITag {
  confidence: number,
  tag: { 
    en: string
  }
}