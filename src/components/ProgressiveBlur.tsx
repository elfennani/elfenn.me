// @flow
import * as React from "react"
import { cn } from "@/utils/cn"

type Props = React.HTMLAttributes<HTMLDivElement>
export const ProgressiveBlur = (props: Props) => {
  return (
    <div
      {...props}
      className={cn("progressive-blur from-background to-transparent", props.className)}
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
