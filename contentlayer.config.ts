import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import sizeOf from "image-size";
import path from "path";
import fs from "fs";

const Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    src: {
      type: "string",
      required: true,
    },
    width: {
      type: "number",
      required: true,
    },
    height: {
      type: "number",
      required: true,
    },
  },
}));

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
    images: {
      type: "list",
      of: Image,
      description: "list of Images with width and height values",
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
