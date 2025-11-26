import React from "react";

export default function NotFound() {
  return (
    <main className="main">
      <section className="surface p-8" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold">404 – Page Not Found</h1>
        <p className="text-gray-600 mt-2">
          The page you’re looking for doesn’t exist.
        </p>
      </section>
    </main>
  );
}
