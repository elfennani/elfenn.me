"use client"
import * as React from "react"
import { cn } from "@/utils/cn"
import { ProgressiveBlur } from "@/components/ProgressiveBlur"
import Logo from "@/app/(frontend)/logo"
import Link from "next/link"
import { LucideArrowRight, LucideMenu, LucideMoveRight, LucideX } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type Props = React.HTMLAttributes<HTMLElement>
export const Header = (props: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const sections = [
    { href: "#home", label: "Home" },
    { href: "#about-me", label: "About me" },
    { href: "#technologies", label: "Technologies" },
    { href: "#projects", label: "Projects" },
  ]

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="fixed inset-0 bottom-0 m-0! z-50 bg-background/50 p-8 space-y-8 pt-16"
            initial={{ opacity: 0, backdropFilter: "blur(4px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex items-center justify-between">
              <motion.h1
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="font-display text-3xl font-bold tracking-tight"
              >
                Menu
              </motion.h1>
              <motion.button
                onClick={() => setMenuOpen(false)}
                role="button"
                aria-label="Close menu"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className="md:hidden size-10 flex items-center justify-center bg-background text-primary rounded-xl border border-border justify-self-end cursor-pointer hover:bg-secondary/5 transition-colors"
              >
                <LucideX className="size-4" />
              </motion.button>
            </div>
            <ul>
              {sections.map((section, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-b-foreground/15 last:border-none"
                >
                  <Link
                    href={section.href}
                    className="flex items-center justify-between py-3 text-lg font-[450] tracking-tight hover:text-secondary transition-colors"
                  >
                    {section.label}
                    <LucideMoveRight className="opacity-50 size-4 mr-4" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      <header {...props} className={cn("fixed inset-x-0 top-0 h-20 z-40", props.className)}>
        <ProgressiveBlur />
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex gap-4 items-center">
          <div className="flex-1">
            <Logo className="h-8" />
          </div>
          <nav className="max-md:hidden flex-2">
            <ul className="flex justify-center space-x-6 text-sm text-muted">
              {sections.map((section, index) => (
                <li
                  key={index}
                  className={cn(
                    "underline-offset-4 decoration-2 hover:text-secondary transition-colors font-[450]",
                    // TODO: Add active section indicator
                    // index == 0 &&
                    //   "font-[450] text-secondary relative after:absolute after:size-1 after:rounded-full after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:bg-secondary",
                  )}
                >
                  <Link href={section.href} className="hover:underline break-all line-clamp-1">
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="bg-secondary dark:text-background max-md:hidden px-6 py-3 rounded-xl text-sm font-[450] justify-self-end leading-none tracking-wide text-white cursor-pointer hover:bg-secondary/90 transition-colors squircle">
              Contact Me
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              role="button"
              aria-label="Open menu"
              className="md:hidden size-10 flex items-center justify-center bg-background text-primary rounded-xl border border-border justify-self-end cursor-pointer hover:bg-secondary/5 transition-colors"
            >
              <LucideMenu className="size-4" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
