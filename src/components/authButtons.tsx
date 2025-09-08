import { Button } from "./ui/button";

export default function AuthButtons() {
  return (
    <div className="flex gap-2">
      <a href="/sign-in">
        <Button variant="default">Sign in</Button>
      </a>
      <a href="/sign-up">
        <Button variant="secondary">Sign up</Button>
      </a>
    </div>
  );
}