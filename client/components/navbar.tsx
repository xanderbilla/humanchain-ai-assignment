"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Humanchain</span>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="border-0 bg-transparent">
            <ModeToggle />
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <a
              href="https://github.com/xanderbilla/humanchain-ai-assignment"
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-6 w-6"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                fill
                className="dark:invert"
              />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
