"use client"
import * as React from "react"
import { Media, Project } from "@/payload-types"
import { useState } from "react"
import { cn } from "@/utils/cn"
import { ProgressiveBlur } from "@/components/ProgressiveBlur"

type Props = {
  project: Project
}
export const SideProjectCard = ({ project }: Props) => {
  const [randomRotation] = useState(Math.random() * 6 - 3)

  return (
    <div
      key={project.id}
      className="p-2 rounded-4xl sm:rounded-2xl bg-background border border-border shadow-xl aspect-[4/3] sm:odd:translate-x-2 sm:even:-translate-x-2 hover:scale-105 hover:rotate-back hover:z-10 transition-transform duration-200 ease-in-out cursor-pointer"
      style={{ transform: `rotate(${randomRotation}deg)` }}
    >
      <div
        className={cn(
          "bg-muted/10 size-full rounded-3xl sm:rounded-lg relative flex justify-end flex-col p-4 overflow-hidden from-black/50 via-transparent bg-linear-to-t text-white",
          !project.screenshots?.length && "text-secondary",
        )}
      >
        {project.screenshots?.[0] && (
          <>
            <img
              src={(project.screenshots[0] as Media).url!}
              alt={project.title}
              className="object-cover rounded-lg absolute inset-0 -z-20"
            />
            <ProgressiveBlur inverse className="bottom-0! top-auto! h-2/3 -z-10!" />
          </>
        )}
        <h2 className="font-display text-lg font-bold tracking-tight sm:tracking-tighter sm:leading-snug">
          {project.title}
        </h2>
        <p className="text-sm sm:text-xs opacity-75 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  )
}
