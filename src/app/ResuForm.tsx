"use client"
import React from "react";
import { Button } from "~/components/ui/button";
import { UploadDropzone } from "~/components/UploadThing";
import { cn } from "~/lib/utils";

export function ResuForm({ fetchedFiles }: { fetchedFiles: Promise<{ name?: string, url?: string }[]> }) {
    let initialState = React.use(fetchedFiles)
    const [files, setFiles] = React.useState(initialState)
    const [file, setFile] = React.useState<string>("")
    return (
        <>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    if (files && setFiles) setFiles([...files, { name: res[0]?.name, url: res[0]?.url }])
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
                className="max-w-xl mx-auto"
            />

            <section id="files" className="grid grid-flow-col grid-auto-cols justify-start gap-4 max-w-xl mx-auto mt-4">
                {
                    files.map((currFile, i) => {
                        if (currFile?.url && currFile?.name) {
                            return (
                                <div key={i} className="flex items-center gap-4">
                                    <Button onClick={() => setFile(currFile.url || "")}
                                        variant="outline"
                                        className={cn(currFile?.url === file && 
                                                      "bg-green-500 bg-opacity-40 hover:bg-opacity-60 hover:bg-green-500")}>
                                        {currFile.name}
                                    </Button>
                                </div>
                            )
                        }
                    })
                }
            </section>
        </>
    )
}
