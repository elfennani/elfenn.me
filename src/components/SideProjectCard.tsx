"use client"
import * as React from "react"
import { Media, Project } from "@/payload-types"
import { useRef, useState } from "react"
import { cn } from "@/utils/cn"
import { ProgressiveBlur } from "@/components/ProgressiveBlur"
import { motion, useInView } from "motion/react"
import { Variants } from "motion"

type Props = {
  project: Project
  index?: number
}

const variants: Variants = {
  hidden: { scale: 0.5, filter: "blur(10px)", opacity: 0, rotate: 0 },
  visible: (randomRotation: number) => ({
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    rotate: randomRotation,
  }),
}

export const SideProjectCard = ({ project, index = 0 }: Props) => {
  // FIXME: This causes a hydration mismatch warning because the random value is different on server and client
  const [randomRotation] = useState(Math.random() * 6 - 3)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  return (
    <motion.div
      ref={ref}
      className="p-2 rounded-4xl sm:rounded-2xl bg-background border border-border shadow-xl aspect-[4/3] sm:odd:translate-x-2 sm:even:-translate-x-2 hover:z-10 cursor-pointer"
      style={{ transform: `rotate(${randomRotation}deg)` }}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={randomRotation}
      transition={{ delay: 0.05 * index, type: "spring" }}
      whileHover={{ scale: 1.05, rotate: 0, transition: { type: "spring", stiffness: 400 } }}
    >
      <div
        className={cn(
          "bg-muted/10 size-full rounded-3xl sm:rounded-lg relative flex justify-end flex-col p-4 overflow-hidden from-black/60 via-transparent bg-linear-to-t text-white",
          !project.screenshots?.length && "text-secondary",
        )}
      >
        {project.screenshots?.[0] && (
          <img
            src={(project.screenshots[0] as Media).url!}
            alt={project.title}
            className="object-cover rounded-lg absolute inset-0 -z-20"
          />
        )}
        <h2 className="font-display text-lg font-bold tracking-tight sm:tracking-tighter sm:leading-snug">
          {project.title}
        </h2>
        <p className="text-sm sm:text-xs opacity-75 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}
