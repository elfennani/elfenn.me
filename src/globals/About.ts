import { GlobalConfig } from "payload"

export const About: GlobalConfig = {
  slug: "about",
  label: "About Section",
  fields: [
    {
      name: "headline",
      type: "text",
      label: "Headline",
      required: true,
      defaultValue: "Who Am I?",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
      defaultValue:
        "I am a passionate developer dedicated to building innovative solutions that make a difference.",
    },
    {
      name: "resume",
      type: "upload",
      label: "Resume",
      relationTo: "media",
      required: false,
    },
    {
      name: "githubUrl",
      type: "text",
      label: "GitHub URL",
      required: false,
    },
  ],
}
