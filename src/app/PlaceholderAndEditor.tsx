"use client"
import { use, useState } from "react"
import { z } from "zod"
import { PlaceholderSelector } from "./PlaceholderSelector"

export const placeholderSchema = z.object({
    name: z.string(),
    type: z.enum(["paragraph", "table row", "table",])
})

export type PlaceholderType = z.infer<typeof placeholderSchema>

export function PlaceholderAndEditor({ fetchedFile }: { fetchedFile: Promise<{ name?: string, url?: string }> }) {

    const initFile = use(fetchedFile);
    const [placeholders, setPlaceholders] = useState<PlaceholderType[]>([])
    return initFile?.name?
        <>
            <PlaceholderSelector placeholders={placeholders} placeholdersAction={setPlaceholders} />
            <DocEditor placeholders={placeholders} />
        </>:<div className="max-w-xl mx-auto text-center my-4 text-xs text-bold text-muted-foreground capitalize">no file selected</div>
}

function DocEditor({ placeholders }: { placeholders: PlaceholderType[] }) {
    return (
        <div>{placeholders[0]?.name}</div>
    )
}
