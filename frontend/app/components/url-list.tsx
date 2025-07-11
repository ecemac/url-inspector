import React, { useState } from "react";
import { useUrls } from "app/hooks/useUrls";
import type { Url } from "app/types"; 

type Props = {
  urls: Url[];
  loading: boolean;
  error: string | null;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  onSort: (field: string) => void;
  onPageChange: (newPage: number) => void;
};

export default function UrlList({ urls, loading, error, sortBy, sortOrder, page, onSort, onPageChange }: Props) {
  
  if (loading) return <p>Loading URLs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (urls.length === 0) return <p className="mt-6">No URLs found.</p>;

  return (
    <div className="mt-6 flex flex-col">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th onClick={() => onSort("title")} className="cursor-pointer">Title {sortBy === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => onSort("htmlVersion")} className="cursor-pointer">HTML Version</th>
            <th onClick={() => onSort("internalLinks")} className="cursor-pointer">Internal Links</th>
            <th onClick={() => onSort("externalLinks")} className="cursor-pointer">External Links</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url.ID} className="border-t p-4">
              <td>{url.Title}</td>
              <td>{url.HTMLVersion}</td>
              <td>{url.InternalLinks}</td>
              <td>{url.ExternalLinks}</td>
              <td>{url.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-lg mt-4 flex justify-between self-center">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}
