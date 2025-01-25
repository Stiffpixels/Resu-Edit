"use server"

import { LoginForm } from "~/types/auth"
import { signIn } from "../auth"

export async function LoginUser(data:LoginForm){
    return await signIn("nodemailer",data)
}
