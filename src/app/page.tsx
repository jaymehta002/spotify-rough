"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import Image from "next/image";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ExtendedSession {
  accessToken?: string;
  user?: {
    name?: string | null;
  };
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const extendedSession = session as ExtendedSession; // Cast to ExtendedSession
    if (extendedSession?.accessToken) {
      fetchPlaylists(extendedSession.accessToken);
    }
  }, [session]);

  const fetchPlaylists = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profileResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profileData = await profileResponse.json();
      console.log("profileData", profileData);
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const extendedSession = session as ExtendedSession;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-white text-center">
          Welcome to Music App
        </h1>
        <p className="mb-4 text-xl text-white text-center">
          Logged in as: {extendedSession?.user?.name || "Guest"}
        </p>
        <Button
          onClick={() => signOut()}
          className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 mb-8 mx-auto block"
        >
          Sign Out
        </Button>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Your Playlists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={playlist.images[0]?.url || "/default-playlist.png"}
                  alt={playlist.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">
                  {playlist.name}
                </h3>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <Music className="w-4 h-4 mr-2" />
                  Play
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
