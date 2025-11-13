"use client"
import * as React from "react"

type Props = {
  onRevalidateAction?: () => Promise<void>
}
export const RevalidateButtonClient = ({ onRevalidateAction }: Props) => {
  return <button onClick={onRevalidateAction}>Revalidate Page</button>
}
