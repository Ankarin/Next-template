"use client";
import { toast } from "@/components/ui/use-toast";
import { login } from "@/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res: string | void = await login(data);
    if (res) {
      toast({
        variant: "destructive",
        title: res,
      });
    }
  }

  return (
    <Form {...form}>
      <p className={"font-semibold text-xl"}> Sign In</p>
      <p className={"pb-4 pt-1"}>
        New ?{" "}
        <Link href={"/signup"} className={"text-blue-500 cursor-pointer"}>
          Create an account
        </Link>
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full pt-5  space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={"password"} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Link href={"/forgot"} className={"text-blue-500 cursor-pointer "}>
          Forgot password ?
        </Link>
        <br />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
}
