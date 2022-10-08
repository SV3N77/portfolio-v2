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
//# sourceMappingURL=compiled-contentlayer-config-HBP55ZWW.mjs.map
