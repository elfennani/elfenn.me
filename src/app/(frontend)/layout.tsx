import React from "react"
import "./styles.css"
import { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  description:
    "Nizar Elfennani's personal portfolio showcasing projects, skills, and contact information.",
  title: "Nizar Elfennani - Portfolio",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  console.log(inter.variable, spaceMono.variable)

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceMono.variable} font-sans bg-white text-black dark:bg-black dark:text-white`}
      >
        <main>{children}</main>
      </body>
    </html>
  )
}
