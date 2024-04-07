import { UserButton, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen">
      <SignIn />
    </div>
  );
}
