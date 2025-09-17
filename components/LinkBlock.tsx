"use client"

import type React from "react"
import { type FC } from "react"
import { Button } from "./ui/button"

interface LinkBlockProps {
  href: string
  children?: React.ReactNode
}

export const LinkBlock: FC<LinkBlockProps> = ({ href, children }) => {
  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      onClick={() => window.open(href, '_blank')}
    >
      Visit Website
    </Button>
  )
}
