"use client";

import Link from "next/link";
import { config } from "@/config";
import UserButton from "./userButton";

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{config.title}</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/category" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
