import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-3">
      <Link href="/cms">Dashboard</Link>
      <Link href="/cms/experiences">Experiences</Link>
      <Link href="/cms/projects">Projects</Link>
    </nav>
  );
}
