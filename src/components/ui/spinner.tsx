import React from "react"
import { cn } from "~/lib/utils"

export function Spinner({ className }: { className?: string }) {
    return (
        <div className="flex justify-center items-center h-full">
            <span className={cn("h-8 w-8 border border-[3px] border-dashed animate-spin border-muted-foreground rounded-full", className)}></span>
        </div>
    )
}
