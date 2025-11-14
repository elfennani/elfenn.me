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
      name: "brand_identifier",
      type: "text",
      label: "BrandFetch Identifier",
      required: true,
      unique: true,
      admin: {
        description:
          "The BrandFetch identifier for this technology (e.g., 'react', 'nodejs'). Used to fetch the logo automatically.",
        components: {
          afterInput: ["/components/admin/BrandField", "/components/admin/BrandLogo"],
        },
      },
    },
    {
      name: "symbol_override",
      type: "upload",
      label: "Symbol Override",
      relationTo: "media",
      required: false,
    },
    {
      name: "dark_mode_symbol_override",
      type: "upload",
      label: "Dark Mode Symbol Override",
      relationTo: "media",
      required: false,
    },
    {
      name: "logo_override",
      type: "upload",
      label: "Logo Override",
      relationTo: "media",
      required: false,
    },
    {
      name: "dark_mode_logo_override",
      type: "upload",
      label: "Dark Mode Logo Override",
      relationTo: "media",
      required: false,
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
