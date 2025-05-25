"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [vercelUrl, setVercelUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setVercelUrl("");
    setProgressMessage("Initializing... Preparing your MiniApp for launch! 🚀");

    try {
      setProgressMessage("Creating GitHub repository and pushing template... This might take a moment.");
      const response = await fetch('/api/create-repo', {
        method: 'POST',
      });

      setProgressMessage("Setting up Vercel project and awaiting deployment... This can take a few minutes. Please wait.");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process your MiniApp request.');
      }

      console.log('API Response:', data);

      setVercelUrl(data.vercelUrl || "https://your-miniapp-default.vercel.app");
      setSuccess(true);
      setProgressMessage("Your MiniApp is live!");

    } catch (error: unknown) {
      console.error('Error in handleSubmit:', error);
      let errorMessage = "An unexpected error occurred while building your MiniApp.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setProgressMessage(`Error: ${errorMessage}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-2 text-orange-500">WeeApp</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Launch your miniapp across Farcaster, World, Celo, and more
        </p>

        {!success && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your miniapp idea (e.g., a simple counter)"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-700"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Build My App"}
            </button>
          </form>
        )}

        {loading && (
          <div className="mt-8 text-center w-full">
            <p className="text-lg text-gray-700 whitespace-pre-wrap">{progressMessage}</p>
            <div className="mt-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {success && !loading && (
          <div className="mt-8 text-center p-6 bg-green-50 border border-green-200 rounded-md w-full">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              🚀 Your MiniApp is Ready!
            </h2>
            <p className="text-md text-gray-700 mb-4">
              Follow these steps to preview it in Warpcast:
            </p>
            <ol className="list-decimal list-inside text-left text-gray-600 space-y-2">
              <li>
                Open the Warpcast Mini App Developer Tools:{" "}
                <a
                  href="https://farcaster.xyz/~/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://farcaster.xyz/~/developers
                </a>
              </li>
              <li>Scroll down to the &quot;Preview Mini App&quot; tool.</li>
              <li>
                Enter this URL:{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded font-mono break-all">
                  {vercelUrl}
                </code>
              </li>
              <li>
                Click &quot;Preview&quot; to test your mini app (note that it may take ~5
                seconds to load the first time).
              </li>
            </ol>
          </div>
        )}
      </main>
    </div>
  );
}
