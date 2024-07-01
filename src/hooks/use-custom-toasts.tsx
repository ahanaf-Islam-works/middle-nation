import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = useToast().toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          onClick={() => dismiss()}
          href="/sign-in"
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};
