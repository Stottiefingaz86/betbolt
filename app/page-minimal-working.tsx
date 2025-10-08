"use client";

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-black">
      <h1 className="text-white text-center pt-20">Test Page</h1>
      <div className="flex justify-center mt-10">
        <a href="/casino" className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Casino
        </a>
      </div>
    </div>
  );
}
