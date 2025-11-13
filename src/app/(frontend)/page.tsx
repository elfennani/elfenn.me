import React from "react"
import { Header } from "@/components/Header"
import { LucideFileText, LucideGithub, LucideMoveRight } from "lucide-react"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { Media } from "@/payload-types"

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

  return (
    <div className="min-h-[200svh] space-y-8">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-svh py-2 text-center px-4 grid-background">
        <div className="space-y-6">
          <div className="flex leading-none select-none flex-col font-display font-bold text-5xl sm:text-8xl italic -space-y-3 sm:-space-y-6 tracking-tighter">
            <span className="-ml-20 sm:-ml-40 text-secondary">DESIGN</span>
            <span className="text-primary">DEVELOP</span>
            <span className="ml-15 sm:ml-30 text-secondary">PUBLISH</span>
          </div>
          <p className="sm:text-lg text-muted leading-7 tracking-tight font-[350] text-pretty max-w-md mx-auto">
            {catchPhrase.subheadline}
          </p>
          <button className="flex items-center gap-3 mx-auto bg-background text-primary h-14 px-8 rounded-2xl shadow-[0_8px_50px_8px] shadow-primary/15 text-sm tracking-wide font-[450] hover:shadow-primary/25 transition-shadow group cursor-pointer">
            <LucideMoveRight className="group-hover:rotate-90 transition-transform ease-out" />
            More about me
          </button>
        </div>
      </div>
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
    </div>
  )
}
