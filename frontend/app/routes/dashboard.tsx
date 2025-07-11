import type { Route } from "./+types/dashboard";
import UrlForm from "app/components/url-form";
import UrlList from "app/components/url-list";
import { useState } from "react";
import { useUrls } from "app/hooks/useUrls";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "URL Inspector" },
    { name: "description", content: "Welcome to URL Inspector!" },
  ];
}

export default function Home() {
  const { urls, loading, error } = useUrls();

  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer my-secret-token",
        },
        body: JSON.stringify({ address: url }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setStatus({ type: "error", message: `Backend error: ${res.status} - ${errorText}` });
        return;
      }

      const data = await res.json();
      setStatus({ type: "success", message: `URL ${url} added successfully!` });
      setUrl("");
    } catch (error) {
      setStatus({ type: "error", message: `Request failed: ${String(error)}` });
    }
  };

   const handleSort = (field: string) => {
    if (field === sortBy) {
      // toggle sort order if same column clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1); // reset to page 1 on sorting change
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <p className="text-black dark:text-white mb-6">Enter the URL of your choice below. This tool will crawl the URL and display key information about that page.</p>

      <UrlForm url={url} status={status} onUrlChange={setUrl} onSubmit={handleSubmit}  />

      <UrlList
        urls={urls}
        loading={loading}
        error={error}
        sortBy={sortBy}
        sortOrder={sortOrder}
        page={page}
        onSort={handleSort}
        onPageChange={handlePageChange}
      />
    </>
  );
}
