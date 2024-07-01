import db from "@/db/db";

type userSignUp = {
  name: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const dataFromUser = (await request.json()) as userSignUp;
  console.log(dataFromUser);

  if (
    !dataFromUser ||
    !dataFromUser.name ||
    !dataFromUser.email ||
    !dataFromUser.password ||
    dataFromUser.name === "" ||
    dataFromUser.email === "" ||
    dataFromUser.password === ""
  ) {
    return Response.json(
      { error: "Please enter valid inputs" },
      { status: 500 }
    );
  }
  // user name validation
  if (!/^[a-zA-Z ]+$/.test(dataFromUser.name)) {
    return Response.json(
      { error: "Name must contain only letters and spaces" },
      { status: 500 }
    );
  }

  if (
    !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(dataFromUser.password)
  ) {
    return Response.json(
      {
        error:
          "Password must contain letters, numbers, and special characters !@#$%^&* and must be 8 characters long",
      },
      { status: 500 }
    );
  }

  const user = await db.user.findUnique({
    where: { email: dataFromUser.email },
  });

  if (user) {
    return Response.json({ error: "User already exists" }, { status: 500 });
  }

  const newUser = await db.user.create({
    data: {
      name: dataFromUser.name,
      provider: "email",
      email: dataFromUser.email,
      password: dataFromUser.password,
    },
  });

  return new Response(JSON.stringify({ message: "User created" }), {
    status: 200,
  });
}
