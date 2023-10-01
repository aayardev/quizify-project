import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "./SignInButton";

type Props = {};

const LoginCard = (props: Props) => {
  return (
    <Card className="w-[90vw] max-w-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Welcome to Quizify 🔥!</CardTitle>
        <CardDescription>
          Quizmify is a platform for creating quizzes using AI!. Get started by
          loggin in below!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <SignInButton> Sign in </SignInButton>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
