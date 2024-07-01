"use client";
import { UserAvatar } from "@/components/UserAvatar";
import { Image as ImageIcon, Link2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="overflow-hidden rounded-md shadow relative">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          {session ? (
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
          ) : null}

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>
        <Input readOnly placeholder="Create post" />
        <Button variant="ghost">
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button variant="ghost">
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
