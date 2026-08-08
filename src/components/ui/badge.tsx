import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge pixel-corners-sm inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border-2 border-ink bg-clip-padding px-2 py-0.5 font-display text-[9px] leading-none tracking-wide whitespace-nowrap uppercase transition-all focus-visible:ring-2 focus-visible:ring-ring has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:brightness-110",
        destructive: "bg-destructive text-papyrus [a]:hover:brightness-110",
        outline: "border-border bg-transparent text-foreground [a]:hover:bg-muted",
        ghost: "border-transparent bg-muted text-muted-foreground [a]:hover:bg-muted/70",
        link: "border-transparent bg-transparent p-0 font-sans text-sm text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
