import React from "react"
import { Header } from "@/components/Header"
import { LucideFileText, LucideGithub } from "lucide-react"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { Media } from "@/payload-types"
import FeaturedProjectCard from "@/components/FeaturedProjectCard"
import { SideProjectCard } from "@/components/SideProjectCard"
import Logo from "@/app/(frontend)/logo"
import { Hero } from "@/components/hero"
import { TechnologyCell } from "@/components/TechnologyCell"
import { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  const payload = await getPayload({
    config: configPromise,
  })

  const siteSettings = await payload.findGlobal({
    slug: "metadata",
  })

  return {
    title: siteSettings.title || "Nizar Elfennani - Software Developer",
    description:
      siteSettings.description ||
      "Nizar Elfennani's personal portfolio showcasing projects, skills, and contact information.",
    keywords: siteSettings.keywords?.map((k) => k.keyword as string) ?? [],
  }
}

export default async function HomePage() {
  "use cache"
  cacheTag("home-page")

  const payload = await getPayload({
    config: configPromise,
  })

  const catchPhrase = await payload.findGlobal({
    slug: "hero",
  })
  const aboutMe = await payload.findGlobal({
    slug: "about",
    depth: 1,
  })
  const technologies = await payload.find({
    collection: "technology",
    limit: 12,
    depth: 1,
    pagination: false,
  })

  const projects = await payload.find({
    collection: "project",
    depth: 2,
    pagination: false,
  })

  const featuredProjects = projects.docs.filter((project) => project.featured)
  const sideProjects = projects.docs.filter((project) => !project.featured)

  return (
    <div className="min-h-[200svh] space-y-8">
      <Header />
      <Hero subheadline={catchPhrase.subheadline} />
      <div className="-mt-16" id="about-me">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="space-y-1">
            <span className="uppercase font-semibold tracking-wide text-xs sm:text-sm text-muted block">
              About me
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter">
              {aboutMe.headline}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <p className="mt-6 lg:text-lg leading-7 text-muted md:max-w-md">
              {aboutMe.description}
            </p>
            <div>
              <div className="flex flex-col md:w-fit justify-center gap-2 py-4 mx-auto h-full">
                {!!aboutMe.resume && (
                  <Link
                    href={(aboutMe.resume as Media).url!}
                    target="_blank"
                    className="action-button cursor-pointer flex items-center gap-4 text-start max-md:w-full md:px-4 py-4 text-base text-secondary font-[450]"
                  >
                    <LucideFileText className="size-6" /> <span>Download Resume</span>
                  </Link>
                )}
                {!!aboutMe.githubUrl && (
                  <Link
                    href={aboutMe.githubUrl}
                    target="_blank"
                    className="action-button cursor-pointer flex items-center gap-4 text-start max-md:w-full md:px-4 py-4 text-base text-secondary font-[450]"
                  >
                    <LucideGithub className="size-6" /> <span>Checkout my GitHub</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 space-y-4" id="technologies">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <span className="uppercase font-semibold tracking-wide text-xs sm:text-sm text-muted block">
            Technologies I Work With
          </span>
        </div>
        <div className="stripes-background border-y border-border relative">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="grid bg-border gap-px px-px *:bg-background grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-full">
              {technologies.docs.map((tech, index) => (
                <TechnologyCell technology={tech} key={tech.id} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 sm:py-8" id="projects">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid sm:grid-cols-2 w-full relative after:-z-10 before:-z-10 after:absolute after:-inset-y-px after:-inset-x-3 sm:after:-inset-x-4 after:border-y after:border-y-border before:absolute before:-inset-x-px before:-inset-y-3 sm:before:-inset-y-4 before:border-x before:border-x-border">
            {featuredProjects.map((project, i) => (
              <FeaturedProjectCard
                className="flex-1 sm:[&:nth-child(odd)]:border-r border-border sm:border-b sm:[&:nth-last-child(even)]:border-b-0 sm:[&:nth-last-child(odd)]:border-b-0"
                project={project}
                index={i}
                key={project.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="uppercase font-semibold tracking-wide text-xs sm:text-sm text-muted block">
              projects
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter">
              Side Projects
            </h1>
            <p className="mt-6 lg:text-lg leading-7 text-muted md:max-w-md">
              A collection of smaller or experimental projects showcasing range, problem-solving,
              and technical versatility across different tools and frameworks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {sideProjects.map((project, i) => (
              <SideProjectCard project={project} index={i} key={project.id} />
            ))}
          </div>
        </div>
      </div>
      <footer>
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="py-4 border-b border-border flex max-sm:justify-center">
            <Logo className="h-8" />
          </div>
          <div className="py-4 flex flex-col max-sm:items-center sm:flex-row sm:justify-between gap-4">
            <p className="text-xs text-muted">
              Email:{" "}
              <a
                href="mailto:elfennani.nizar@gmail.com"
                className="underline hover:text-primary transition-colors underline-offset-4"
              >
                elfennani.nizar@gmail.com
              </a>
            </p>
            <p className="text-xs text-muted">
              <a
                href="https://github.com/elfennani"
                className="underline hover:text-primary transition-colors underline-offset-4"
              >
                GitHub
              </a>
              {" • "}
              <a
                href="https://www.figma.com/design/gc3lnsx2PPKxjWiX1vhtsn/Portfolio?node-id=10-2&t=9LjPeaWrRBpE8tHz-1"
                className="underline hover:text-primary transition-colors underline-offset-4"
              >
                Figma Design
              </a>
              {" • "}
              <a
                href="https://github.com/elfennani/elfenn.me"
                className="underline hover:text-primary transition-colors underline-offset-4"
              >
                Portfolio Repository
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
