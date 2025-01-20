"use client"
import { useState } from "react"
import { z } from "zod"
import { PlaceholderSelector } from "./PlaceholderSelector"

export const placeholderSchema = z.object({
    name: z.string(),
    type: z.enum(["paragraph", "table row", "table",])
})

export type PlaceholderType = z.infer<typeof placeholderSchema>


export function PlaceholderAndEditor(){
    const [placeholders, setPlaceholders] = useState<PlaceholderType[]>([])
    return (
        <PlaceholderSelector placeholders={placeholders} placeholdersAction={setPlaceholders}/>
    )
}
