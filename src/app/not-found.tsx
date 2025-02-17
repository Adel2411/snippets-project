import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 flex items-center justify-center">
      <div className="bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-700/50 overflow-hidden max-w-md w-full">
        <div className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>

          <div className="space-y-2">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              404 Not Found
            </h1>
            <p className="text-zinc-400">
              The snippet you're looking for doesn't exist or has been removed.
            </p>
          </div>

          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
