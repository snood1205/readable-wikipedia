import {NextPage} from "next";
import {fetchPage} from "@/lib/mediawiki";

const HomePage: NextPage = async () => {
  const mainPage = await fetchPage("Main Page", {revalidate: revalidationTime()});
  return (
    <div dangerouslySetInnerHTML={{__html: mainPage.content}}/>
  );
};

const revalidationTime = () => {
  const now = new Date();
  const nextMainPageRollover = now.getUTCHours() < 12 ?
    new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12 + now.getTimezoneOffset(), 0, 0, 0) :
    new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, now.getTimezoneOffset(), 0, 0, 0);
  return Math.floor((nextMainPageRollover.getTime() - now.getTime()) / 1000);
};

export default HomePage;