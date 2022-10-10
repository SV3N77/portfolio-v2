import Link from "next/link";

function Header() {
  return (
    <header className="bg-slate-400 p-5 ">
      <nav className="container mx-auto flex items-center gap-4 text-lg text-white">
        <Link href="/">
          <a>
            <img src="/images/icons/Ramen.ico" alt="Ramen" />
          </a>
        </Link>
        <h1 className="grow text-3xl font-semibold">Danny Jiang</h1>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="https://github.com/SV3N77">
          <a>GitHub</a>
        </Link>
        <Link href="mailto:danny.jiang177@gamil.com">
          <a>Contact</a>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
