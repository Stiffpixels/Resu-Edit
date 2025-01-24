"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { UploadDropzone } from "~/components/UploadThing";
import { GetUserFileId, InsertFiles } from "~/server/actions/home";

export function FileUploader() {
    const router = useRouter()
    return (
        <>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                    const userFileId = await GetUserFileId();
                    if(res.length>0) InsertFiles(userFileId, res)
                    router.push("/" + res[0]?.key || "")
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
