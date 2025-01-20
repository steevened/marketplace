import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import BrandLink from "../components/brand-link";
import AccountButton from "./components/account-buttom";
import MarketSidebarFooter from "./components/mk-sidebar-footer";
import PriceRange from "./components/price-range";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size={"lg"} asChild>
                <BrandLink />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Explorar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="px-2">
                  <PriceRange />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <MarketSidebarFooter />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="">
          <header className="h-16 flex items-center  shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4">
            <div className="grid grid-cols-12 gap-2 w-full">
              <div className="flex items-center test gap-2 col-span-2 ">
                <SidebarTrigger className="" />
                <Separator orientation="vertical" className="mr-2 h-4" />
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
                <Separator orientation="vertical" className="ml-2 h-4" />
                <AccountButton />
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
