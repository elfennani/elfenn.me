import { GlobalConfig } from "payload"

export const Metadata: GlobalConfig = {
  slug: "metadata",
  label: "Metadata",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Site Title",
      required: true,
      defaultValue: "Nizar Elfennani - Portfolio",
    },
    {
      name: "description",
      type: "textarea",
      label: "Site Description",
      required: true,
      defaultValue:
        "Nizar Elfennani's personal portfolio showcasing projects, skills, and contact information.",
    },
    {
      name: "keywords",
      type: "array",
      label: "Keywords",
      required: false,
      minRows: 0,
      maxRows: 20,
      fields: [
        {
          name: "keyword",
          type: "text",
          label: "Keyword",
        },
      ],
      defaultValue: [
        { keyword: "Nizar Elfennani" },
        { keyword: "Portfolio" },
        { keyword: "Web Developer" },
        { keyword: "Projects" },
        { keyword: "Skills" },
        { keyword: "Contact" },
      ],
    },
  ],
}
