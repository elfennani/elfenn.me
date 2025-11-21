import React from "react"
import { Header } from "@/components/Header"
import {
  LucideCircleUserRound,
  LucideClock,
  LucideFileText,
  LucideGithub,
  LucideWrench,
} from "lucide-react"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { Media, Technology } from "@/payload-types"
import FeaturedProjectCard from "@/components/FeaturedProjectCard"
import { SideProjectCard } from "@/components/SideProjectCard"
import Logo from "@/app/(frontend)/logo"
import { Hero } from "@/components/hero"
import { TechnologyCell } from "@/components/TechnologyCell"
import { Metadata } from "next"
import { ProjectScreenshot } from "@/components/ProjectScreenshot"

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

  const [catchPhrase, aboutMe, technologies, projects] = await Promise.all([
    await payload.findGlobal({
      slug: "hero",
    }),
    await payload.findGlobal({
      slug: "about",
      depth: 1,
    }),
    await payload.find({
      collection: "technology",
      limit: 12,
      depth: 1,
      pagination: false,
    }),
    await payload.find({
      collection: "project",
      depth: 2,
      pagination: false,
    }),
  ])

  const featuredProjects = projects.docs.filter((project) => project.featured).reverse()
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
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4 sm:gap-12 py-8"
            >
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 max-sm:order-1 sm:py-8 sticky top-20">
                <div className="flex items-center pr-4 group">
                  <div className="flex-1">
                    <span className="uppercase font-semibold tracking-wide text-xs sm:text-sm text-muted block">
                      projects
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl group-hover:text-primary group-hover:underline underline-offset-8 decoration-2 font-display font-bold tracking-tighter line-clamp-2 leading-none pb-1">
                      {project.title}
                    </h1>
                  </div>
                  <svg
                    viewBox="0 0 48 48"
                    className="fill-foreground group-hover:fill-primary transition-transform group-hover:translate-x-2 size-8 sm:size-10 md:size-12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.7129 2.62646C27.755 2.59102 27.8179 2.59623 27.8535 2.63818L45.875 23.9351C45.9066 23.9723 45.9066 24.0277 45.875 24.0649L27.8535 45.3618C27.8179 45.4038 27.755 45.409 27.7129 45.3735L23.2871 41.6265C23.2452 41.5908 23.2399 41.5279 23.2754 41.4858L35.3926 27.1646C35.4476 27.0996 35.4015 27.0005 35.3164 27.0005H7.59961C7.54456 27.0003 7.5 26.955 7.5 26.8999V21.1001C7.5 21.045 7.54456 21.0007 7.59961 21.0005H35.3164C35.4015 21.0005 35.4476 20.9004 35.3926 20.8354L23.2754 6.51416C23.2399 6.47206 23.2452 6.40919 23.2871 6.37354L27.7129 2.62646Z"
                      className="fill-inherit"
                    />
                    <path
                      d="M27.7129 2.62646C27.755 2.59102 27.8179 2.59623 27.8535 2.63818L45.875 23.9351C45.9066 23.9723 45.9066 24.0277 45.875 24.0649L27.8535 45.3618C27.8179 45.4038 27.755 45.409 27.7129 45.3735L23.2871 41.6265C23.2452 41.5908 23.2399 41.5279 23.2754 41.4858L35.3926 27.1646C35.4476 27.0996 35.4015 27.0005 35.3164 27.0005H7.59961C7.54456 27.0003 7.5 26.955 7.5 26.8999V21.1001C7.5 21.045 7.54456 21.0007 7.59961 21.0005H35.3164C35.4015 21.0005 35.4476 20.9004 35.3926 20.8354L23.2754 6.51416C23.2399 6.47206 23.2452 6.40919 23.2871 6.37354L27.7129 2.62646Z"
                      className="stroke-inherit"
                    />
                  </svg>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {project.technologies.map((tech) => {
                    const technology = tech as Technology

                    if (technology.symbol_override) {
                      return (
                        <picture
                          className="size-6 sm:size-8 rounded overflow-hidden"
                          key={technology.id}
                        >
                          <source
                            media="(prefers-color-scheme: light)"
                            srcSet={(technology.symbol_override as Media).url!}
                            type="image/svg+xml"
                            className="dark:brightness-200 dark:saturate-0"
                          />
                          {technology.dark_mode_symbol_override && (
                            <source
                              media="(prefers-color-scheme: dark)"
                              srcSet={(technology.dark_mode_symbol_override as Media).url!}
                            />
                          )}
                          <img
                            className="size-full object-contain"
                            src={(technology.symbol_override as Media).url!}
                            alt={technology.name}
                          />
                        </picture>
                      )
                    }

                    return (
                      <picture
                        className="size-6 sm:size-8 rounded overflow-hidden"
                        key={technology.id}
                      >
                        <source
                          media="(prefers-color-scheme: light)"
                          srcSet={`https://cdn.brandfetch.io/${technology.brand_identifier}/symbol?c=1idIpPfKaZoBskq9FCV`}
                          className="dark:brightness-200 dark:saturate-0"
                        />
                        <source
                          media="(prefers-color-scheme: dark)"
                          srcSet={
                            (technology.dark_mode_symbol_override as Media)?.url ||
                            `https://cdn.brandfetch.io/${technology.brand_identifier}/theme/light/symbol?c=1idIpPfKaZoBskq9FCV`
                          }
                        />
                        <img
                          className="size-full object-contain "
                          src={`https://cdn.brandfetch.io/${technology.brand_identifier}/symbol?c=1idIpPfKaZoBskq9FCV`}
                          alt={technology.name}
                        />
                      </picture>
                    )
                  })}
                </div>
                <div className="flex gap-4 sm:gap-6 items-center flex-wrap">
                  {!!project.timeframe && (
                    <div className="flex items-center gap-1.5 text-muted">
                      <LucideClock className="size-4" />
                      <span className="text-xs sm:text-sm font-[450]">{project.timeframe}</span>
                    </div>
                  )}
                  {!!project.client_work && (
                    <div className="flex items-center gap-1.5 text-muted">
                      <LucideCircleUserRound className="size-4" />
                      <span className="text-xs sm:text-sm font-[450]">Client Work</span>
                    </div>
                  )}
                  {!!project.in_progress && (
                    <div className="flex items-center gap-1.5 text-primary">
                      <LucideWrench className="size-4 animate-pulse" />
                      <span className="text-xs sm:text-sm font-[450]">In Progress</span>
                    </div>
                  )}
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-5 md:leading-6 lg:leading-8 text-muted">
                  {project.description}
                </p>
              </div>
              <div className="flex sm:flex-col items-center max-sm:overflow-x-auto max-sm:-mx-6 max-sm:px-6 overflow-y-visible py-2">
                {project.screenshots &&
                  (project.screenshots as Media[]).map((image, index) => (
                    <ProjectScreenshot
                      key={image.id}
                      index={index}
                      title={project.title}
                      image={image}
                    />
                  ))}
              </div>
            </div>
          ))}
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
