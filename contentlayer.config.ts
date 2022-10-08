import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the projects",
      required: true,
    },
    date: {
      type: "date",
      description: "When it was finished",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "List of stack used",
      required: true,
    },
    shortDescription: {
      type: "string",
      description: "Short decription",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/projects/${project._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "./projects",
  documentTypes: [Project],
});
