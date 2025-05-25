"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vercelUrl, setVercelUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setVercelUrl(""); // Reset Vercel URL

    try {
      const response = await fetch('/api/create-repo', {
        method: 'POST',
        // We can pass the prompt or other data in the body later if needed
        // body: JSON.stringify({ userInput: prompt }),
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create repository.');
      }

      console.log('Repository created:', data);
      // TODO: Proceed to copy template, push to repo, and deploy to Vercel
      // For now, simulate success and set a mock Vercel URL

      // Simulate further backend processing for template copying and Vercel deployment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockVercelUrl = "https://your-miniapp-deployment-url.vercel.app";
      setVercelUrl(mockVercelUrl);
      setSuccess(true);

    } catch (error: unknown) {
      console.error('Error in handleSubmit:', error);
      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`Error: ${errorMessage}`); // Replace with a better error display
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-2">WeeApp</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Launch your miniapp across Farcaster, World, Celo, and more
        </p>

        {!success && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your miniapp idea (e.g., a simple counter)"
              className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Building..." : "Build My App"}
            </button>
          </form>
        )}

        {loading && (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              Hold tight! We&apos;re building your miniapp...
            </p>
            {/* You can add a spinner or a more elaborate loading animation here */}
          </div>
        )}

        {success && !loading && (
          <div className="mt-8 text-center p-6 bg-green-50 border border-green-200 rounded-md">
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
                  href="https://warpcast.com/~/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://warpcast.com/~/developers
                </a>
              </li>
              <li>Scroll down to the &quot;Preview Mini App&quot; tool.</li>
              <li>
                Enter this URL:{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded font-mono">
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
