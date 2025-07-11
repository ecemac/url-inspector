import { useState, useEffect } from "react";
import type { Url } from "app/types";


export function useUrls(page = 1, sortBy = "title", sortOrder: "asc" | "desc" = "asc") {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/urls?page=${page}&sortBy=${sortBy}&order=${sortOrder}`, {
      headers: {
        Authorization: "Bearer my-secret-token",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        setUrls(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [page, sortBy, sortOrder]);
  
  return { urls, loading, error };
}
