import { CollectionConfig } from "payload"

export const Project: CollectionConfig = {
  slug: "project",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "featured", "technologies", "deployed_url"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Project Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Project Description",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured Project",
      required: false,
    },
    {
      name: "client_work",
      type: "checkbox",
      label: "Client Work",
      required: false,
    },
    {
      name: "in_progress",
      type: "checkbox",
      label: "In Progress",
      required: false,
    },
    {
      name: "technologies",
      type: "relationship",
      label: "Technologies Used",
      relationTo: "technology",
      hasMany: true,
      required: true,
    },
    {
      name: "deployed_url",
      type: "text",
      label: "Deployed URL",
      required: false,
    },
    {
      name: "github_url",
      type: "text",
      label: "GitHub URL",
      required: false,
    },
    {
      name: "screenshots",
      type: "upload",
      label: "Project Screenshots",
      relationTo: "media",
      hasMany: true,
      required: false,
    },
  ],
}
