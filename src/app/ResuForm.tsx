"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { UploadDropzone } from "~/components/UploadThing";

export function ResuForm() {
    const router = useRouter()
    return (
        <>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    router.push("/" + res[1]?.url || "")
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
                className="max-w-xl mx-auto"
            />
        </>
    )
}
