"use client"
import { Label } from "@radix-ui/react-label";
import React, {type Dispatch, type SetStateAction, useActionState, useRef } from "react"
import { PlaceholderCombo } from "~/components/home/PlaceholderCombo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { placeholderSchema,type PlaceholderType } from "./PlaceholderAndEditor";

type PlaceholderState = {
    success: boolean
    message: string
}

export function PlaceholderSelector({
    placeholders,
    placeholdersAction
}: {
    placeholders: PlaceholderType[],
    placeholdersAction: Dispatch<SetStateAction<PlaceholderType[]>>
}) {
    const [state, action, isPending] = useActionState(setFields, { success: true, message: "" })

    const typeElem = useRef<HTMLButtonElement>(null)

    function setFields(_: PlaceholderState, formData: FormData): PlaceholderState {
        const name = formData.get("placeholder-name")

        let type;
        if (typeElem.current) type = typeElem.current.textContent?.toLowerCase();
        const { success: isValid, error, data } = placeholderSchema.safeParse({ name: name, type: type })
        if (isValid) {
            placeholdersAction([...placeholders, data])
            return { success: isValid, message: "" }
        }
        if (error) {
            console.log(error)
        }
        return { success: isValid, message: "invalid name or type" }
    }

    return (
        <section id="resu-editor" className="mt-4">
            {/*<!--<a href="https://3wfx0nos0c.ufs.sh/f/kjl5fEruWyI8QtIxHvgl3Mn70UZqhLaofQ1XzcwIv62xAOug" clas> Test </a>-->*/}

            <div className="flex max-w-xl justify-between gap-8 mx-auto">
                <form action={action} className="border border-border rounded-md w-full max-w-sm p-4 space-y-4">
                    <h2 className="text-xl font-semibold">Add Placeholders</h2>
                    <PWrapper>
                        <Label htmlFor="placeholder-name">Name</Label>
                        <Input type="text" id="placeholder-name" name="placeholder-name" required />
                    </PWrapper>
                    <PWrapper>
                        <Label htmlFor="placeholder-type">Type</Label>
                        <PlaceholderCombo btnRef={typeElem} />
                    </PWrapper>
                    <Button type="submit" disabled={isPending}>Add More</Button>
                    {
                        !state.success &&
                        <p className="text-red-400 text-sm">
                            {state.message}
                        </p>
                    }
                </form>
                <div className="text-center rounded-md border border-border p-4 w-full flex flex-col">
                    <h2 className="font-semibold text-xl">Placeholders</h2>
                    <div className="flex flex-col justify-between h-full items-start">
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {
                                placeholders?.length > 0 && placeholders.map((placeholder, i) => (
                                    <div key={i}>
                                        <Label className="rounded-md border border-border p-1 text-sm">
                                            {placeholder.name}
                                        </Label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex gap-2 items-center">
                            <Button >Save</Button>
                            <Button className="bg-red-600 hover:bg-red-500">Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function PWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            {children}
        </div>
    )
}
