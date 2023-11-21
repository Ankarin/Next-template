"use client";
import { toast } from "@/components/ui/use-toast";
import { forgot } from "@/server/auth";
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
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const origin: string = window.location.origin;
    const res: string = await forgot({ origin, ...data });
    if (res === "success") {
      toast({
        title:
          "If you provided correct email, you will receive a password recovery link in a few minutes.",
        variant: "primary",
      });
    } else {
      toast({
        variant: "destructive",
        title: res,
      });
    }
  }

  return (
    <Form {...form}>
      <p className={"font-semibold text-xl"}>Reset password</p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full pt-5 space-y-6"
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
        <Button type="submit">Reset</Button>
      </form>
    </Form>
  );
}
