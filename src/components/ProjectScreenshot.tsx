"use client"
import * as React from "react"
import { Media } from "@/payload-types"
import { useRef, useState } from "react"
import { useInView, motion } from "motion/react"
import { Variants } from "motion"

type Props = {
  title: string
  image: Media
  index: number
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

export const ProjectScreenshot = ({ image, title, index }: Props) => {
  const [randomRotation] = useState(Math.random() * 6 - 3)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  return (
    <motion.div
      ref={ref}
      className={`w-40 sm:w-full overflow-hidden rounded-xl relative shadow-lg -mr-6 sm:-mb-8 p-1 sm:p-2 sm:rounded-3xl bg-background dark:border border-muted/25 z-10`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={randomRotation}
      transition={{ delay: 0.05 * index, type: "spring" }}
      whileHover={{ scale: 1.05, rotate: 0, transition: { type: "spring", stiffness: 400 } }}
    >
      <img
        src={image.url!}
        alt={image.alt}
        className="w-full h-auto max-sm:aspect-[4/3] object-cover rounded-lg sm:rounded-2xl select-none pointer-events-none"
      />
    </motion.div>
  )
}
