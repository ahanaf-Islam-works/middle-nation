import db from "@/db/db";

export async function POST(request: Request) {
  const { name, userId, isPublic } = await request.json();

  if (!name || !userId) {
    return Response.json(
      { error: "Please enter valid inputs" },
      { status: 500 }
    );
  }

  if (!/^[a-zA-Z ]+$/.test(name)) {
    return Response.json(
      { error: "Name must contain only letters and spaces" },
      { status: 500 }
    );
  }

  const grp = await db.group.findUnique({
    where: { name: name },
  });

  if (grp) {
    return Response.json({ error: "Group already exists" }, { status: 500 });
  }

  const newGrp = await db.group.create({
    data: {
      name: name,
      public: isPublic,
      creatorId: userId,
      Creator: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!newGrp) {
    return Response.json({ error: "Group not created" }, { status: 500 });
  }

  return Response.json(newGrp);
}
