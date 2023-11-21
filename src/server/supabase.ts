"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserResponse } from "@supabase/gotrue-js";

const supabase = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
};

export async function getUser() {
  const { data }: UserResponse = await supabase().auth.getUser();
  if (data.user) {
    return data.user;
  } else {
    return null;
  }
}
