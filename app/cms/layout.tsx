import NavBar from "./components/Navbar";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white p-4 shadow">
        <NavBar />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
