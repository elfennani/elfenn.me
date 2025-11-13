// @flow
import * as React from "react"
import { cn } from "@/utils/cn"
import { ProgressiveBlur } from "@/components/ProgressiveBlur"
import Logo from "@/app/(frontend)/logo"
import Link from "next/link"
import { LucideMenu } from "lucide-react"

type Props = React.HTMLAttributes<HTMLElement>
export const Header = (props: Props) => {
  const sections = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "About me" },
    { href: "#about", label: "Technologies" },
    { href: "#contact", label: "Projects" },
  ]

  return (
    <header {...props} className={cn("fixed inset-x-0 top-0 h-20", props.className)}>
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
                  "underline-offset-4 decoration-2 hover:text-secondary transition-colors",
                  index == 0 &&
                    "font-[450] text-secondary relative after:absolute after:size-1 after:rounded-full after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:bg-secondary",
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
          <button className="bg-secondary max-md:hidden px-6 py-3 rounded-xl text-sm font-[450] justify-self-end leading-none tracking-wide text-white cursor-pointer hover:bg-secondary/90 transition-colors squircle">
            Contact Me
          </button>
          <button className="md:hidden size-10 flex items-center justify-center bg-background text-primary rounded-xl border border-border justify-self-end cursor-pointer hover:bg-secondary/5 transition-colors">
            <LucideMenu className="size-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
