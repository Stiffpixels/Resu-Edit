"use server"

import { ClientUploadedFileData } from "uploadthing/types"
import { db } from "../db"
import { files } from "../db/schema"

export async function InsertFiles(userFileId:string,res:ClientUploadedFileData<{uploadedBy:string}>[]){
    const keys = res.map(file=>{
        return {key:file.key}
    })
    return db.insert(files).values(keys)
}

export async function GetUserFileId(){
    return ""
}
