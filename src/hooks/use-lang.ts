"use client";

import { useContext } from "react";
import { LangContext } from "@/providers/lang-provider";

export function useLang() {
  return useContext(LangContext);
}
