// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
var Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    src: {
      type: "string",
      required: true
    },
    width: {
      type: "number",
      required: true
    },
    height: {
      type: "number",
      required: true
    }
  }
}));
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
      type: "list",
      of: Image,
      description: "list of Images with width and height values"
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
//# sourceMappingURL=compiled-contentlayer-config-AVGDWOCB.mjs.map
