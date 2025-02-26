import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
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

const Link = defineNestedType(() => ({
  name: "Link",
  fields: {
    url: {
      type: "string",
      required: false,
    },
    github: {
      type: "boolean",
      default: false,
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
    links: {
      type: "list",
      of: Link,
      description: "List of Links related to the project",
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
    images: {
      type: "nested",
      of: "Image[]",
      description: "list of Images with width and height values",
      resolve: (project) => {
        const folderPath = path.join(process.cwd(), "/public/images/projects/", project._raw.flattenedPath);

        const files = fs
          .readdirSync(folderPath) //required folders
          .filter((f) => !f.startsWith("."))
          .sort(function sortFileByName(a, b) {
            const [img1] = a.split(".");
            const [img2] = b.split(".");

            return Number(img1) < Number(img2) ? -1 : 1;
          });

        const images = files.map(function getImageDimensions(image) {
          const imagePath = path.join("/images/projects/", project._raw.flattenedPath, image);
          const imageDimensions = sizeOf(path.join(folderPath, image));

          return {
            src: imagePath,
            width: imageDimensions.width,
            height: imageDimensions.height,
          };
        });

        return images;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "./projects",
  documentTypes: [Project],
});
