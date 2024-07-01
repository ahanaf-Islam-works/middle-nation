import Feed from "@/components/NewsFeed/Feed";
import FeedHeader from "@/components/NewsFeed/FeedHeader";
import Siberbar from "@/components/Sibebar/SiberbarVisitor";

const Home = async () => {
  const feedData = await fetch(
    process.env.NEXTAUTH_URL + "/api/post" + "?page=" + 1
  );

  const feedDataJson = (await feedData.json()) || {
    error: "Error establishing connection",
  };

  if (feedDataJson.error) {
    return (
      <div className="container mx-auto flex justify-start gap-3">
        <article className="w-3/5 bg-slate-600 p-4 rounded-md">
          <div className="container mx-auto flex justify-start">
            <p className="text-red-500">Error establishing connection</p>
          </div>
        </article>
        <aside className="w-2/5 flex justify-center items-center bg-pink-500">
          <Siberbar />
        </aside>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex gap-3">
      <article className="w-3/5">
        <FeedHeader />
        <Feed feedData={feedDataJson} />
      </article>
      <aside className="w-2/5 flex justify-center items-center">
        <Siberbar />
      </aside>
    </div>
  );
};

export default Home;
