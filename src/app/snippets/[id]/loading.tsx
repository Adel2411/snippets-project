import React from "react";

function SnippetShowLoadingPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    </div>
  );
}

export default SnippetShowLoadingPage;
