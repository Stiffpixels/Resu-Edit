import { useCallback, useState } from "react";

import { generateReactHelpers, useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept, generatePermittedFileTypes } from "uploadthing/client";
import { OurFileRouter } from "~/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =generateReactHelpers<OurFileRouter>();

export function MultiUploader() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<{name?:string, url?:string}[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, routeConfig } = useUploadThing("imageUploader", {
        onClientUploadComplete: (file) => {
            setUploadedFiles([...uploadedFiles, {name:file[0]?.name, url:file[0]?.url }])
        },
        onUploadError: () => {
            alert("error occurred while uploading");
        },
        onUploadBegin: (file) => {
            console.log("upload has begun for", file);
        },
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(
            generatePermittedFileTypes(routeConfig).fileTypes,
        ),
    });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                    {files.length > 0 && (
                        <button onClick={() => startUpload(files)}>
                            Upload {files.length} files
                        </button>
                    )}
                </div>
                Drop files here!
            </div>
            <section id="files">
                {
                    uploadedFiles.map((file, i) => (
                        <a href={file.url || "#"} download key={i}>{file.name || "No name"}</a>
                    ))
                }
            </section>
        </div>
    );
}
