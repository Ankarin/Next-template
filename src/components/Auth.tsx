"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zust } from "@/state";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Auth() {
  const zustUser = zust((state) => state.user);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (zustUser === "no") {
    return (
      <div className={"flex items-center ml-2"}>
        <Button className={"mr-2"} variant={"ghost"} asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button size={"sm"} asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className={"flex items-center cursor-pointer ml-4"}>
            {zustUser?.email}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
