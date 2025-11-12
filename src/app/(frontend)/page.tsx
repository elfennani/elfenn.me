import React from "react"
import "./styles.css"
import Logo from "@/app/(frontend)/logo"

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center px-4">
      <Logo className="max-w-3/4" />
      <div className="space-y-4 mt-8">
        <h1 className="mt-6 text-4xl font-normal font-display">Welcome to My Portfolio!</h1>
        <p className="text-lg text-muted">
          Currently under construction. Please check back soon for updates.
        </p>
      </div>
    </div>
  )
}
