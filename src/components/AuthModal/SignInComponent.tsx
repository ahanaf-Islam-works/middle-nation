"use client";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { SyntheticEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

const SignInComponent = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) => {
  const { toast } = useToast();

  const onSubmit = (event: SyntheticEvent) => {
    setIsLoading(true);
    event.preventDefault();
    let email = (event.target as HTMLFormElement).email.value;
    let password = (event.target as HTMLFormElement).password.value;

    if (!email || !password || email === "" || password === "") {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Email and password are required.",
        variant: "destructive",
      });
    }

    signIn("credentials", {
      redirect: false,
      email,
      password,
    }).then((response) => {
      setIsLoading(false);
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      }
      if (response?.ok) {
        toast({
          title: "Success",
          description: "You have successfully signed in.",
          variant: "success",
        });
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} className="mt-2" variant="outline">
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </Button>
      </div>
    </form>
  );
};

export default SignInComponent;
