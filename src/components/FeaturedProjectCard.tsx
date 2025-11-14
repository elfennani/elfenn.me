"use client"
import * as React from "react"
import { Media, Project, Technology } from "@/payload-types"
import { cn } from "@/utils/cn"
import VectorBackground1 from "@/components/vectors/VectorBackground1"
import VectorBackground2 from "@/components/vectors/VectorBackround2"
import { LucideHammer } from "lucide-react"

type Props = {
  project: Project
  index: number
  className?: string
}
const FeaturedProjectCard = ({ project, index, className }: Props) => {
  const background: (typeof VectorBackground1)[] = [VectorBackground1, VectorBackground2]

  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:gap-6 p-6 relative overflow-hidden",
        index == 0 && "after:absolute after:inset-0 after:bg-gradient-to-bl after:-z-10",
        className,
      )}
    >
      {index == 0 ? (
        <>
          <VectorBackground1 className="absolute -z-20 top-0 right-0 animate-pan" />
        </>
      ) : (
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 -z-20 size-96">
          <VectorBackground2 />
        </div>
      )}
      <span className="font-display self-start text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-secondary relative after:absolute after:-right-4 sm:after:-right-8 after:top-1/2 after:-translate-y-1/2 after:size-1.5 sm:after:size-2 after:bg-primary after:rounded-full">
        {(index + 1).toString().padStart(2, "0")}
      </span>
      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold underline underline-offset-4 decoration-2 decoration-primary text-foreground">
        {project.title}
      </h2>
      <div className="flex gap-2 flex-wrap">
        {project.client_work && (
          <span className="text-xs font-[650] tracking-wide px-3 h-8 flex items-center justify-center text-center rounded-full bg-slate-100 dark:bg-slate-900 text-secondary">
            Client Work
          </span>
        )}
        {project.in_progress && (
          <span className="text-xs font-[650] tracking-wide px-3 h-8 flex gap-2 items-center justify-center text-center rounded-full bg-emerald-50 text-primary dark:bg-emerald-900">
            <LucideHammer className="fill-primary size-4" />
            In Progress
          </span>
        )}
      </div>
      <div className="flex gap-4 flex-wrap">
        {project.technologies.map((tech) => {
          const technology = tech as Technology

          if (technology.symbol_override) {
            return (
              <picture className="size-6 sm:size-8 rounded overflow-hidden" key={technology.id}>
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
            <picture className="size-6 sm:size-8 rounded overflow-hidden" key={technology.id}>
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
      <p className="lg:text-lg leading-7 text-muted">{project.description}</p>
    </div>
  )
}

export default FeaturedProjectCard
