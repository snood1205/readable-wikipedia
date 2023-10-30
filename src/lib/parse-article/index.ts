import {JSDOM} from "jsdom";
import {convertInfoboxToProse} from "@/lib/parse-article/convert-infobox-to-prose";

export const parseArticle = async (articleContent: string): Promise<string> => {
  let articleDOM = new JSDOM(articleContent);
  articleDOM = await convertInfoboxToProse(articleDOM);
  return articleDOM.serialize();
}