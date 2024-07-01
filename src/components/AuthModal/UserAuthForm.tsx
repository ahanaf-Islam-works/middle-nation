"use client";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { Icons } from "../Icons/Icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import SignInComponent from "./SignInComponent";

import { FC } from "react";
import SignUpComponent from "./SignUpComponent";

interface UserAuthFormProps {
  authType: "signin" | "signup";
}

const UserAuthForm: FC<UserAuthFormProps> = ({ authType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleSignHandle = () => {
    setIsLoading(true);
    signIn("google", {
      callbackUrl: "/",
    });
  };

  const githubSignHandle = () => {
    setIsLoading(true);
    signIn("github", {
      callbackUrl: "/dashboard?page=1&",
    });
  };

  return (
    <div className="lg:p-8 h-full  bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="font-semibold tracking-tight">Create an account</h2>
          <p className="text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          {authType === "signin" ? (
            <SignInComponent
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <SignUpComponent
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          <div className="relative">
            <div className="relative flex justify-center">
              <span className="px-2 text-muted-foreground rounded">
                - Or continue with -
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={githubSignHandle}
          >
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.github className="mr-2 h-6 w-6" />
            )}
            GitHub
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={googleSignHandle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-6 w-6" />
            )}
            Google
          </Button>
        </div>
        <p className="px-8 text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default UserAuthForm;
