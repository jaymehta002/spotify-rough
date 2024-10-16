"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { toast } = useToast();

  const handleSignIn = async () => {
    const result = await signIn("spotify", { callbackUrl: "/" });
    if (result) {
      toast({ title: "Success!", description: "You are now signed in." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="p-8 bg-white rounded-lg shadow-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Welcome to Music App
        </h1>
        <Button
          onClick={handleSignIn}
          className="w-full py-2 text-white bg-green-500 hover:bg-green-600"
        >
          <Music className="w-5 h-5 mr-2" />
          Sign in with Spotify
        </Button>
      </div>
    </div>
  );
}
