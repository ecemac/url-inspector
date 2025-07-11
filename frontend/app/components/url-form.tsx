import { useState } from "react";

type Props = {
  url: string;
  status: { type: "success" | "error"; message: string } | null;
  onUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function UrlForm({ url, status, onUrlChange, onSubmit }: Props) {

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <input
          name="url"
          type="text"
          placeholder="Enter website URL"
          className="w-lg text-zinc-900 dark:text-white p-2 border rounded"
          required
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
        />
        <button type="submit" className="bg-amber-700 py-2 px-4 rounded-md">
          Analyze
        </button>
        </div>
        
        {status?.type === "error" && <p className="text-red-600 mt-4">{status.message}</p>}
        {status?.type === "success" && <p className="text-green-600 mt-4">{status.message}</p>} 
      </fieldset>
    </form>
  );
}
