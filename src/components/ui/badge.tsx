import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border bg-clip-padding px-2.5 py-0.5 font-heading text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-ring has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a]:hover:brightness-105",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a]:hover:brightness-105",
        destructive: "border-transparent bg-destructive text-primary-foreground [a]:hover:brightness-105",
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
