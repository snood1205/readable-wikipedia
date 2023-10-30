export interface FetchedArticle {
  parse: Parse;
}

interface Parse {
  title: string;
  pageid: number;
  revid: number;
  text: string;
  langlinks: LangLink[];
  categories: Category[],
  links: Link[],
  templates: Template[],
  images: string[],
  externallinks: string[],
  sections: Section[],
  showtoc: boolean,
  parsewarnings?: string[],
  parsewarningshtml?: string[],
  displaytitle: string;
  iwlinks: InterWikiLink[],
  properties: Properties,
}

interface Properties {
  "wikibase-shortdesc": string;
  page_image_free: string;
  wikibase_item: string;
}

interface InterWikiLink {
  prefix: string;
  url: string;
  title: string;
}


interface LangLink {
  lang: string;
  url: string;
  langname: string;
  autonym: string;
  title: string;
}

interface Category {
  sortkey: string;
  category: string;
  hidden: boolean;
}

interface Link {
  ns: number;
  title: string;
  exists: boolean;
}

interface Template {
  ns: number;
  title: string;
  exists: boolean;
}

interface Section {
  toclevel: number;
  level: string;
  line: string;
  number: string;
  index: string;
  fromtitle: string;
  byteoffset: number;
  anchor: string;
  linkAnchor: string;
}

