
import { Link } from "react-router-dom";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-600 text-white text-center px-6">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="max-w-md text-white/90 mb-8">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="bg-white text-green-700 px-6 py-3 rounded-full font-medium shadow hover:bg-green-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
