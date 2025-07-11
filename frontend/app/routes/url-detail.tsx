import { useLoaderData } from "react-router";
import type { Route } from "./+types/url-detail";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`${API_BASE_URL}/urls/${params.id}`);
  if (!res.ok) {
    throw new Response("Failed to load URL details", { status: res.status });
  }
  const data = await res.json();
  return data;
}

export default function UrlDetail({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  console.log("Loaded URL data:", data);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}