"use client"
import * as React from "react"
import { motion } from "motion/react"
import { HeroCatchphrase } from "@/components/hero-catchphrase"
import Link from "next/link"
import { LucideMoveRight } from "lucide-react"

type Props = {
  subheadline: string
}
export const Hero = ({ subheadline }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh py-2 text-center px-4 grid-background">
      <div className="space-y-6">
        <HeroCatchphrase />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8, type: "spring" }}
          className="sm:text-lg text-muted leading-7 tracking-tight font-[350] text-pretty max-w-md mx-auto"
        >
          {subheadline}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <Link
            href="#about-me"
            className="flex w-fit items-center gap-3 mx-auto bg-background text-primary h-14 px-8 rounded-2xl shadow-[0_8px_50px_8px] shadow-primary/15 text-sm tracking-wide font-[450] hover:shadow-primary/25 transition-shadow group cursor-pointer"
          >
            <LucideMoveRight className="group-hover:rotate-90 transition-transform ease-out" />
            More about me
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
