import { Outlet } from "react-router";

export default function Header() {
  return (
    <>
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">URL Inspector</h1>
    </header>
    <main className="p-6">
        <Outlet /> 
      </main>
    </>
  );
}