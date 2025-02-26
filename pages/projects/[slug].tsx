import Carousel from "components/Carousel";
import { allProjects, Link, Project } from "contentlayer/generated";
import { GetStaticPropsContext } from "next";

type ProjectPageProps = {
  project: Project;
};

export async function getStaticPaths() {
  const paths = allProjects.map((project) => ({
    params: { slug: project._raw.flattenedPath },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const project = allProjects.find((project) => project._raw.flattenedPath === params!.slug);

  if (!project || !project.images) {
    return { notFound: true };
  }

  return {
    props: {
      key: project._id,
      project,
    },
  };
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <div className="container my-20 flex flex-col items-center gap-4 px-5 sm:mx-auto">
      <div className="xl:w-10/12">
        {project.images && project.images.length > 0 && <Carousel images={project.images} />}
      </div>

      <div className="my-10 flex flex-col gap-4 rounded-lg bg-indigo-100 p-10 shadow-lg marker:mb-6 md:px-8 xl:w-10/12">
        <h1 className="text-3xl font-semibold md:text-5xl">{project.title}</h1>
        {project.links.map((link) => (
          <LinkComponent key={link.url} link={link} />
        ))}
        <div className="flex flex-col">
          <div className="text-2xl font-semibold md:text-4xl">Tech Stack</div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-teal-500 px-3 py-2 text-teal-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <section className="">
          <div className="prose mb-16 lg:prose-xl" dangerouslySetInnerHTML={{ __html: project.body.html }}></div>
        </section>
      </div>
    </div>
  );
}

// internal components

type LinkProps = {
  link: Link;
};

function LinkComponent({ link }: LinkProps) {
  return (
    <>
      {link.url && (
        <a href={link.url}>
          <span className="md:text-md rounded-full bg-teal-500 px-3 py-2 text-xs text-teal-100 underline">
            {link.url?.replace(/^https?:\/\//, "")}
          </span>
        </a>
      )}
    </>
  );
}
