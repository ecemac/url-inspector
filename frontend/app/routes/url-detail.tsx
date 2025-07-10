import { useLoaderData } from "react-router";
import type { Route } from "./+types/url-detail";

export function loader({ params }: Route.LoaderArgs) {
  // Simulate a backend call or use real fetch later
  const data = {
    id: params.id,
    title: "Example Website",
    htmlVersion: "HTML5",
    internalLinks: 10,
    externalLinks: 5,
    brokenLinks: [
      { url: "https://broken1.com", status: 404 },
      { url: "https://broken2.com", status: 500 },
    ],
  };
  return data;
}

export default function UrlDetail({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}