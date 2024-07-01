import db from "@/db/db";
import { userServerSession } from "@/lib/auth";

export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get("page");
  const pageNumber = page ? parseInt(page) : 1;
  console.log(pageNumber);
  const session = await userServerSession();

  if (!session) {
    const posts = await db.post.findMany({
      where: {
        public: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        group: true,
      },
      take: 10,
      skip: 10 * (pageNumber - 1),
    });

    if (!posts || posts.length === 0) {
      return new Response(JSON.stringify({ error: "No posts found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  }

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      group: true,
    },
  });

  const postsData = await db.post.findMany({
    where: {
      groupId: {
        in: followedCommunities.map(
          (followedCommunity) => followedCommunity.groupId
        ),
      },
    },
    orderBy: {
      createdAt: "desc",
    },

    include: {
      votes: true,
      author: true,
      comments: true,
      group: true,
    },
    take: 10,
    skip: 10 * (pageNumber - 1),
  });

  if (
    !postsData ||
    postsData.length === 0 ||
    Array.isArray(postsData) === false
  ) {
    return new Response(JSON.stringify({ error: "No posts found" }), {
      status: 404,
    });
  }

  const length = postsData.length;

  return new Response(
    JSON.stringify({
      length,
      postsData,
    }),
    { status: 200 }
  );
}
