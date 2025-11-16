// @flow
import * as React from "react"
import { cn } from "@/utils/cn"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  inverse?: boolean
}
export const ProgressiveBlur = ({ inverse = false, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        "progressive-blur from-background to-transparent",
        props.className,
        inverse ? "progressive-blur-inverse" : "",
      )}
    >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
