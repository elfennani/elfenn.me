import { GlobalConfig } from "payload"

export const Hero: GlobalConfig = {
  slug: "hero",
  label: "Hero Section",
  fields: [
    {
      name: "subheadline",
      type: "text",
      label: "Subheadline",
      required: true,
      defaultValue: "Turning Ideas into Reality",
    },
  ],
}
