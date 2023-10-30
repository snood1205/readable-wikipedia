import {NextPage} from "next";
import {fetchPage} from "@/lib/mediawiki";
import {parseArticle} from "@/lib/parse-article";

interface Props {
  params: {
    articleName: string;
  };
}

const Article: NextPage<Props> = async ({params}: Props) => {
  const article = await fetchPage(params.articleName);
  const parsedArticle = await parseArticle(article.content);
  return (
    <div className="m-6">
      <a href="/" className="text-blue-800">[Home]</a>
      <h1 className="text-2xl">{article.name}</h1>
      <div dangerouslySetInnerHTML={{__html: parsedArticle}}/>
    </div>
  );
};

export default Article;