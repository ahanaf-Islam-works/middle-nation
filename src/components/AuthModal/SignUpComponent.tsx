import { Loader } from "lucide-react";
import { SyntheticEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

const SignUpComponent = ({
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
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const safety = formData.get("safety");
    if (
      !email ||
      !password ||
      email === "" ||
      password === "" ||
      password === null ||
      password === undefined ||
      !name ||
      name === "" ||
      safety
    ) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Email and password are required.",
        variant: "destructive",
      });
    }

    fetch("/api/user/auth", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setIsLoading(false);
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        } else {
          setIsLoading(false);
          toast({
            title: "Success",
            description: "User created successfully.",
            variant: "success",
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={isLoading}
          />
        </div>
        <div className="hidden">
          <Label htmlFor="safety">Password</Label>
          <Input id="safety" name="safety" type="hidden" disabled={isLoading} />
        </div>
        <Button disabled={isLoading} className="mt-2" variant="outline">
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up with Email
        </Button>
      </div>
    </form>
  );
};

export default SignUpComponent;
