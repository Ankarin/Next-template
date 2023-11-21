"use client";
import React from "react";
import {
  Menubar,
  MenubarItem,
  MenubarSeparator,
  MenubarTrigger,
  MenubarShortcut,
  MenubarMenu,
  MenubarContent,
} from "@/components/ui/menubar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import Auth from "@/components/Auth";
import { usePathname } from "next/navigation";
import { User } from "@supabase/gotrue-js";
import { useEffect } from "react";
import { zust } from "@/state";

export default function AppBar({ user }: { user: User | null }) {
  const zustSetUser = zust((state) => state.setUser);
  useEffect(() => {
    if (user) zustSetUser(user);
    else zustSetUser("no");
  }, [user]);

  const pathname = usePathname();

  if (
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/signup" &&
    pathname !== "/forgot" &&
    pathname !== "/reset-password"
  ) {
    return (
      <Menubar>
        <div
          className={
            "max-w-5xl  w-full flex items-center mx-auto justify-between"
          }
        >
          <Link className={"font-semibold text-md"} href={"/"}>
            Next app
          </Link>
          <div className={"flex "}>
            <ThemeToggle />
            <Auth />
          </div>
        </div>
      </Menubar>
    );
  }
}
