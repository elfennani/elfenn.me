"use client"
import * as React from "react"
import { motion } from "motion/react"
import { Variants } from "motion"
import { useState } from "react"

type Props = {}
export const HeroCatchphrase = (props: Props) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640

  return (
    <div className="flex w-full overflow-hidden leading-none select-none flex-col font-display font-bold text-5xl sm:text-8xl italic -space-y-3 sm:-space-y-6 tracking-tighter">
      <motion.span
        initial={{ x: 0, scale: 0.5, filter: "blur(10px)", opacity: 0 }}
        animate={{ x: isMobile ? "-2.5rem" : `-5rem`, scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{
          delay: 0,
          duration: 0.8,
          type: "spring",
        }}
        className="text-secondary"
      >
        DESIGN
      </motion.span>
      <motion.span
        initial={{ scale: 0.5, filter: "blur(10px)", opacity: 0 }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
        className="text-primary"
      >
        DEVELOP
      </motion.span>
      <motion.span
        initial={{ x: 0, scale: 0.5, filter: "blur(10px)", opacity: 0 }}
        animate={{ x: isMobile ? "2.5rem" : `5rem`, scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="text-secondary"
      >
        DEPLOY
      </motion.span>
    </div>
  )
}
