"use client"
import * as React from "react"
import { Media, Technology } from "@/payload-types"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { LucideArrowUpRight } from "lucide-react"

type Props = {
  technology: Technology
  index?: number
}

const variants = {
  hidden: { scale: 0.5, filter: "blur(10px)", opacity: 0 },
  visible: { scale: 1, opacity: 1, filter: "blur(0px)" },
  whileHover: {},
}

export const TechnologyCell = ({ technology, index = 0 }: Props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" })
  let url = technology.homepage_url ?? technology.brand_identifier
  if (url && !url?.startsWith("http")) {
    url = `https://${url}`
  }

  return (
    <motion.a
      href={url || "#"}
      ref={ref}
      className="h-20 relative overflow-hidden block"
      target="_blank"
      rel="noreferrer"
    >
      <motion.div
        className="absolute inset-0 origin-top z-10 bg-border"
        animate={{ scaleY: isInView ? 0 : 1 }}
        transition={{ duration: 0.25, type: "tween", delay: index * 0.02 }}
      />
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="whileHover"
        transition={{ duration: 0.5, type: "spring", delay: 0.125 + index * 0.02 }}
        className="size-full py-4 px-8 flex items-center justify-center"
      >
        <motion.picture
          variants={{
            whileHover: { scale: 1.1 },
          }}
        >
          {technology.logo_override ? (
            <>
              <source
                media="(prefers-color-scheme: light)"
                srcSet={(technology.logo_override as Media).url!}
                type="image/svg+xml"
                className="dark:brightness-200 dark:saturate-0"
              />
              {technology.dark_mode_logo_override && (
                <source
                  media="(prefers-color-scheme: dark)"
                  srcSet={(technology.dark_mode_logo_override as Media).url!}
                />
              )}
              <img
                className="size-full object-contain"
                src={(technology.logo_override as Media).url!}
                alt={technology.name}
              />
            </>
          ) : (
            <>
              <source
                media="(prefers-color-scheme: light)"
                srcSet={`https://cdn.brandfetch.io/${technology.brand_identifier}/logo?c=1idIpPfKaZoBskq9FCV&type=logo&format=svg`}
                type="image/svg+xml"
                className="dark:brightness-200 dark:saturate-0"
              />
              <source
                media="(prefers-color-scheme: dark)"
                srcSet={
                  (technology.dark_mode_logo_override as Media)?.url ||
                  `https://cdn.brandfetch.io/${technology.brand_identifier}/theme/light/logo?c=1idIpPfKaZoBskq9FCV&type=logo&format=png&mode=dark`
                }
              />
              <img
                className="size-full object-contain "
                src={`https://cdn.brandfetch.io/${technology.brand_identifier}/logo?c=1idIpPfKaZoBskq9FCV&type=logo&format=png`}
                alt={technology.name}
              />
            </>
          )}
        </motion.picture>
        <motion.div
          variants={{
            whileHover: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: "100%" },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute -inset-x-0 -bottom-2 flex items-center justify-between text-[0.625rem] p-1 text-muted"
        >
          <span>{technology.name}</span>
          <LucideArrowUpRight className="size-3" />
        </motion.div>
      </motion.div>
    </motion.a>
  )
}
