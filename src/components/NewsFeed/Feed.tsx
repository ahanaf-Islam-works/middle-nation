import { FeedType } from "@/types/feed";
import { UserType } from "@/types/next-auth";
import { FileWarningIcon, Loader } from "lucide-react";
import { FC } from "react";
import FeedHeader from "./FeedHeader";

interface FeedProps {
  feedData: FeedType[];
}

const Feed: FC<FeedProps> = ({ feedData }) => {
  if (!feedData) {
    return (
      <div className="container mx-auto h-full flex gap-3">
        <Loader size={64} className="animate-spin" />
        <p>
          <FileWarningIcon size={64} />
          Error establishing connection
        </p>
      </div>
    );
  }

  return (
    <div>
      <FeedHeader />
      {feedData.map((feed) => (
        <div key={feed.id} className="border p-4 my-4">
          <h2>{feed.title}</h2>
          <p>{feed.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
