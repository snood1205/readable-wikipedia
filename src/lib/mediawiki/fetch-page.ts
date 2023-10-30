import {Article} from "@/lib/types";
import {FetchedArticle} from "@/lib/types/fetched-article";

const EN_WIKI_API_URL = "https://en.wikipedia.org/w/api.php";

/**
 * Fetches a page from the Wikipedia API
 * @param name The name of the page to fetch
 * @param next The configuration for the next fetch
 */
export const fetchPage = async (name: string, next = {revalidate: 60}): Promise<Article> => {
  const url = `${EN_WIKI_API_URL}?action=parse&format=json&page=${name}&formatversion=2`;
  const {parse} = await (await fetch(url, {next})).json() as FetchedArticle;
  const redirect = await redirectCheck(parse);
  if (redirect != null) return redirect;
  return {
    name: parse.title,
    content: parse.text,
  };
};

const redirectCheck = async (parse: FetchedArticle["parse"]) => {
  const isRedirect = parse.text.match(/<div class="redirectMsg">/);
  if (isRedirect) {
    return await fetchPage(parse.links[0].title);
  }
};