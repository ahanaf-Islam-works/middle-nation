"use client";

import { useSession } from "next-auth/react";
import { FC } from "react";

interface FeedHeaderProps {}

const FeedHeader: FC<FeedHeaderProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <section>
      <h4>Welcome {session?.user.name}</h4>
    </section>
  );
};

export default FeedHeader;
