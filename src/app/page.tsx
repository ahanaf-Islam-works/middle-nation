import Feed from "@/components/NewsFeed/Feed";
import FeedHeader from "@/components/NewsFeed/FeedHeader";
import Siberbar from "@/components/Sibebar/SiberbarVisitor";
import { FileWarningIcon } from "lucide-react";

const Home = async () => {
  try {
    const feedData = await fetch(
      process.env.NEXTAUTH_URL + "/api/post" + "?page=" + 1
    );

    const feedDataJson = (await feedData.json()) || {
      error: "Error establishing connection",
    };

    if (!feedData.ok) {
      return (
        <div className="container mx-auto flex gap-3">
          <FileWarningIcon size={64} />
          <p> {feedDataJson.error}</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto flex gap-3">
        <article className="w-3/5 bg-purple-400">
          <FeedHeader />
          <Feed feedData={feedDataJson} />
        </article>
        <aside className="w-2/5 flex justify-center items-center bg-pink-500">
          <Siberbar />
        </aside>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto flex gap-3">
        <FileWarningIcon size={64} />
        <p> Error establishing connection</p>
      </div>
    );
  }
};

export default Home;
