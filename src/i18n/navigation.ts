import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Type-safe navigation helpers for next-intl
// These automatically prefix links with the current locale
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
