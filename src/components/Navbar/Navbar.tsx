"use client";
import { Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Middle Nation
          </p>
        </Link>
        {/* searchbar */}
        <div className="w-full max-w-md flex items-center gap-2">
          <Search className="h-5 w-5 text-zinc-600" />
          <input
            type="text"
            placeholder="Search groups"
            className="w-full bg-transparent border p-2 border-zinc-300 rounded focus:ring-0 focus:outline"
          />
        </div>
        {session ? (
          <Button onClick={() => signOut()} variant="destructive">
            Sign Out
          </Button>
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
