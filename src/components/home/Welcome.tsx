"use client";
import React from "react";
import { zust } from "@/state";

export default function Welcome() {
  const message = zust((state) => state.message);
  return <div>{message}</div>;
}
