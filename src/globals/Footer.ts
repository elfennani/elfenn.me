import { GlobalConfig } from "payload"

/**
 * Footer Global Configuration
 *
 * This configuration defines the structure and fields for the Footer section
 * of the website. It includes: email, github link, and repository link for the portfolio.
 */
export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer Section",
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
    },
    {
      name: "githubUrl",
      type: "text",
      label: "GitHub URL",
      required: false,
    },
    {
      name: "repositoryUrl",
      type: "text",
      label: "Portfolio Repository URL",
      required: false,
    },
  ],
}
