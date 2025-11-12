import { CollectionConfig } from "payload"

export const Technology: CollectionConfig = {
  slug: "technology",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Technology Name",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      label: "Technology Icon",
      relationTo: "media",
      required: true,
    },
    {
      name: "large_icon",
      type: "upload",
      label: "Large Technology Icon",
      relationTo: "media",
      required: true,
    },
    {
      name: "homepage_url",
      type: "text",
      label: "Homepage URL",
      required: false,
    },
    {
      name: "highlight",
      type: "checkbox",
      label: "Highlight Technology",
      required: false,
      defaultValue: true,
    },
  ],
}
