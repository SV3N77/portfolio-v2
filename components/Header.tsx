import Link from "next/link";

function Header() {
  return (
    <header className="bg-indigo-400 p-5 ">
      <nav className="container mx-auto flex flex-col items-center justify-center gap-4 text-lg text-white md:flex-row">
        <Link href="/">
          <a>
            <img
              src="/images/icons/Ramen.ico"
              alt="Ramen"
              className="transition hover:scale-125"
            />
          </a>
        </Link>
        <h1 className="grow text-3xl font-semibold">Danny Jiang</h1>
        <Link href="/">
          <a>Home</a>
        </Link>
        <a
          href="/files/Danny_Jiang_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <Link href="mailto:danny.jiang177@gamil.com">
          <a>Contact</a>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
