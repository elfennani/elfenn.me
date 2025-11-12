import { GlobalConfig } from "payload"

export const SideProjects: GlobalConfig = {
  slug: "side-projects",
  label: "Side Projects Section",
  fields: [
    {
      name: "headline",
      type: "text",
      label: "Headline",
      required: true,
      defaultValue: "Side Projects",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
      defaultValue: "Explore some of my side projects that showcase my skills and creativity.",
    },
  ],
}
