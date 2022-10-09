// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the projects",
      required: true
    },
    date: {
      type: "date",
      description: "When it was finished",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "List of stack used",
      required: true
    },
    shortDescription: {
      type: "string",
      description: "Short decription",
      required: true
    },
    images: {
      type: "Image[]",
      description: "list of Images with width and height values",
      resolve: (project) => {
        const folderPath = path.join(
          process.cwd(),
          "/public/images/projects/",
          project._raw.flattenedPath
        );
        const files = fs.readdirSync(folderPath).filter((f) => !f.startsWith(".")).sort(function sortFileByName(a, b) {
          const [img1] = a.split(".");
          const [img2] = b.split(".");
          return Number(img1) < Number(img2) ? -1 : 1;
        });
        const images = files.map(function getImageDimensions(image) {
          const imagePath = path.join(
            "/images/projects/",
            project._raw.flattenedPath,
            image
          );
          const imageDimensions = sizeOf(path.join(folderPath, image));
          return {
            src: imagePath,
            width: imageDimensions.width,
            height: imageDimensions.height
          };
        });
        return images;
      }
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/projects/${project._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./projects",
  documentTypes: [Project]
});
export {
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-24GGY6CZ.mjs.map
