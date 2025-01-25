"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

import { Input } from "~/components/ui/input"
import { LoginUser } from "~/server/actions/auth"
import { LoginForm, loginSchema } from "~/types/auth"


export default function Login() {
    const form = useForm<LoginForm>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:""
        }
    })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(LoginUser)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

