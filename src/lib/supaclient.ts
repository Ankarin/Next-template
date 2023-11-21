"use client";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
const supaclient = createClientComponentClient();

export { supaclient };
