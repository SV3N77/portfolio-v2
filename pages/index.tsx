import Head from "next/head";
import { allProjects, Project } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import { FaGithubAlt, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  projects: Project[];
};

export async function getStaticProps() {
  const projects = allProjects.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return { props: { projects } };
}

function Home({ projects }: PageProps) {
  return (
    <div>
      <Head>
        <title>Danny Jiang</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/icons/Ramen.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center gap-4">
        <div className="my-1 px-5 sm:mx-4 md:mt-20">
          <div className="flex flex-col-reverse justify-between gap-36 md:flex-row">
            <div className="flex flex-col gap-4 text-center text-sm md:text-left md:text-2xl">
              <h1 className="text-3xl font-bold text-indigo-600 md:text-5xl">Welcome</h1>
              <div className="flex flex-col items-center gap-4 md:items-start">
                <p>
                  Hi there! I&apos;m Danny Jiang, a passionate developer.
                  <br />
                  I&apos;m a graduate at the Unversity of Technology Sydney studied a Bachelor of Science in Games
                  Development.
                </p>
                <div className="mt-14 flex flex-col gap-4 text-lg md:flex-row">
                  <Link href="https://github.com/SV3N77">
                    <a>
                      <div className="flex items-center justify-center gap-1 rounded-full bg-black px-3 py-2 text-white transition hover:scale-110">
                        <FaGithubAlt />
                        Github
                      </div>
                    </a>
                  </Link>
                  <Link href="https://www.linkedin.com/in/danny-jiang2">
                    <a>
                      <div className="flex items-center justify-center gap-1 rounded-full bg-[#0072b1] px-3 py-2 text-white transition hover:scale-110">
                        <FaLinkedin />
                        Linkedin
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="m-auto w-60 drop-shadow-md md:m-0 md:w-72 xl:mr-40 xl:w-auto">
              <Image
                src="/images/gifs/Computer.gif"
                alt="computer"
                className="aspect-square transition hover:scale-110"
                priority
                width={400}
                height={400}
                layout="intrinsic"
              />
            </div>
          </div>

          <div className="my-28 flex flex-col gap-8 text-center text-sm md:text-left md:text-lg">
            <h1 className="text-3xl font-bold text-indigo-600 md:text-5xl">My Interests</h1>
            <div className="flex flex-col items-center justify-around md:flex-row">
              <img src="/images/gifs/WebDev.gif" alt="web" className="aspect-square transition hover:scale-110" />
              <p className="md:max-w-2xl">
                I enjoy learning new things and solving problems. I&apos;m always looking for new ways to improve my
                coding skills. I&apos;m interested in front-end web development. I really enjoy making the website look
                asethetic as possible.
              </p>
            </div>
            <div className="flex flex-col items-center justify-around md:flex-row">
              <img
                src="/images/gifs/Kenji-Idle.gif"
                alt="game"
                className="aspect-square bg-cover transition hover:scale-110"
              />

              <p className="md:max-w-2xl">
                I enjoy playing video games and learning new things. I&apos;m always looking for new ways to improve my
                game development skills. I&apos;m mostly interested in the design aspect of game development and have
                been improving these skills with some of the projects I have done.
              </p>
            </div>
          </div>

          <section className="my-10 flex flex-col gap-4 pb-20 text-center md:text-left">
            <h1 className="my-10 text-3xl font-bold text-indigo-600 md:text-5xl">Projects</h1>
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCards key={project._id} {...project} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;

// internal components

function ProjectCards({ title, url, shortDescription, tags, date, images }: Project) {
  const newDate = format(new Date(date), "MMM yyyy");

  return (
    <Link href={url}>
      <a>
        <div className="flex flex-col overflow-hidden rounded-lg bg-slate-100 text-sm shadow-lg transition hover:-translate-y-4 md:h-60 md:flex-row">
          <div className="aspect-video md:aspect-square md:w-auto">
            <img
              src={images?.at(0)?.src}
              alt={images?.at(0)?._id}
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div className="flex grow flex-col gap-2">
            <h1 className="bg-teal-200 p-4 text-xl font-semibold ">{title}</h1>
            <div className="flex flex-col gap-2 p-4 text-sm">
              <div className="">{newDate}</div>
              <div>{shortDescription}</div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {tags.map((tag) => (
                  <div key={tag} className="rounded-full bg-teal-500 px-2 py-1 text-teal-100">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
