import { useLoaderData } from "react-router";
import type { Route } from "./+types/url-detail";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function loader({ params }: Route.LoaderArgs) {
  fetch(`${API_BASE_URL}/urls`)
  .then((res) => res.json())
  .then((data) => console.log(data));
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