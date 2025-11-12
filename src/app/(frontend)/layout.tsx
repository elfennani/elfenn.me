import React from "react"
import "./styles.css"
import { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  description:
    "Nizar Elfennani's personal portfolio showcasing projects, skills, and contact information.",
  title: "Nizar Elfennani - Portfolio",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  console.log(inter.variable, spaceGrotesk.variable)

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-white text-black dark:bg-black dark:text-white`}
      >
        <main>{children}</main>
      </body>
    </html>
  )
}
