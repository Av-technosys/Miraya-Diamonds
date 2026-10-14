"use client";

import { Show, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Menu } from "@base-ui/react/menu";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export function AccountButton() {
  const { user } = useUser();

  return (
    <div className="flex size-10 shrink-0 items-center justify-center text-white">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button type="button" aria-label="Sign in or create an account" className="grid size-10 place-items-center rounded-full hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2">
            <User size={21} strokeWidth={1.5} />
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <Menu.Root>
          <Menu.Trigger aria-label="Open account menu" className="grid size-10 place-items-center rounded-full hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2">
            {user?.imageUrl ? <Image src={user.imageUrl} alt="" width={30} height={30} unoptimized className="size-[30px] rounded-full object-cover" /> : <User size={21} strokeWidth={1.5} />}
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={10} align="end" collisionPadding={12} className="z-50">
              <Menu.Popup className="w-48 max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-[#e8e4dc] bg-white p-1.5 text-sm text-[#214E34] shadow-[0_8px_28px_rgba(0,0,0,0.12)] outline-none">
                <Menu.LinkItem render={<Link href="/dashboard" />} className="flex min-h-11 items-center gap-3 rounded-lg px-3 outline-none data-highlighted:bg-[#f1f5f2]">
                  <LayoutDashboard size={17} strokeWidth={1.5} />Dashboard
                </Menu.LinkItem>
                <SignOutButton redirectUrl="/">
                  <Menu.Item className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 outline-none data-highlighted:bg-[#f1f5f2]">
                    <LogOut size={17} strokeWidth={1.5} />Sign out
                  </Menu.Item>
                </SignOutButton>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </Show>
    </div>
  );
}
