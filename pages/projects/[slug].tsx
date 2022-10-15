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
  const project = allProjects.find(
    (project) => project._raw.flattenedPath === params!.slug
  );

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
    <div className="container my-20 mx-auto flex flex-col gap-4">
      <div>
        <img src={project?.images?.at(0)?.src} />
      </div>

      <div className="my-10 flex flex-col gap-5 rounded-lg bg-slate-100 p-4 shadow-lg">
        <h1 className="text-3xl">{project.title}</h1>
        {project.links.map((link) => (
          <LinkComponent key={link.url} link={link} />
        ))}
        <section>
          <div
            className="prose lg:prose-xl mb-16"
            dangerouslySetInnerHTML={{ __html: project.body.html }}
          ></div>
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
    <a href={link.url}>
      <span className="rounded-full bg-teal-500 px-2 py-1 text-teal-100 underline">
        {link.url.replace(/^https?:\/\//, "")}
      </span>
    </a>
  );
}
