"use client";

import AccountButton from "@/app/(marketplace)/components/account-buttom";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import BrandLink from "@/app/components/brand/brand-link";
import BrandText from "@/app/components/brand/brand-text";
import Link from "next/link";

export default function MkpHeader() {
  return (
    <header className="h-16 flex items-center  shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4">
      <div className="grid grid-cols-12 gap-2 w-full">
        <div className="flex items-center gap-2 col-span-2 ">
          {/* <SidebarTrigger className="" /> */}
          <Link href={"/"}>
            <BrandText className="hover:text-slate-950" />
          </Link>
          {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        </div>
        <div
          className="col-span-8 flex justify-center 
            "
        >
          <div className="w-full max-w-xl hidden sm:block">
            <Input
              type="text"
              // value={input}
              // onChange={onInputChange}
              placeholder="Buscar"
              name=""
              // ref={inputRef}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 col-span-2  justify-end">
          {/* <Separator orientation="vertical" className="ml-2 h-4" /> */}
          <AccountButton />
        </div>
      </div>
    </header>
  );
}
