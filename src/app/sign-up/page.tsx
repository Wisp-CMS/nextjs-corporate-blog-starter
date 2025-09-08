"use client";

import { SignUpForm , SignUpFormValues} from "@/components/signunForm";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (values: SignUpFormValues) => {
    await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: `${values.firstName} ${values.lastName}`,
    },{
      onRequest: () => {
        setIsLoading(true);
      },
      onResponse: () => {
        setIsLoading(false);
      },
      onSuccess: () => {
        router.push(`/`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignUpForm 
        onSubmit={handleSignUp} 
        isPending={isLoading}
        onGoogleSignIn={() => {
          authClient.signIn.social({
            provider: "google",
          });
        }}
        onGitHubSignIn={() => {
          authClient.signIn.social({
            provider: "github",
          });
        }}
      />
    </main>
  );
} 