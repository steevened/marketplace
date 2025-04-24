import MarketSidebarFooter from "@/app/(marketplace)/components/mk-sidebar-footer";
import PriceRange from "@/app/(marketplace)/components/price-range";
import BrandLink from "@/app/components/brand/brand-link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ChevronRight, Check } from "lucide-react";
import MkpHeader from "./mkp-header";
import { Button } from "@/components/ui/button";
import React from "react";

const data = {
  filters: [
    {
      name: "Marca",
      items: ["Chevrolet", "Toyota", "Ford"],
    },
    {
      name: "Ubicación",
      items: ["Quito - Pichincha", "Guayaquil - Guayas", "Cuenca - Azuay"],
    },
    {
      name: "Precio",
      items: ["10000 - 20000", "20000 - 30000", "30000 - 40000"],
    },
  ],
};

export default function MktSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible
                key={"price"}
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={"Precio"}>
                      <span>Precio</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <PriceRange />
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator className="mx-0" />
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible
                key={"location"}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={"Ubicación"}>
                      <span>Ubicación</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Button variant={"outline"} className="w-full">
                          <span>Quito - Pichincha</span>
                        </Button>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator className="mx-0" />
          <>
            {data.filters.map((filter, index) => (
              <React.Fragment key={filter.name}>
                <SidebarGroup key={filter.name} className="py-0">
                  <Collapsible defaultOpen={true} className="group/collapsible">
                    <SidebarGroupLabel
                      asChild
                      className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <CollapsibleTrigger>
                        {filter.name}{" "}
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {filter.items.map((item, index) => (
                            <SidebarMenuItem key={item}>
                              <SidebarMenuButton>
                                <div
                                  data-active={index < 2}
                                  className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                                >
                                  <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                                </div>
                                {item}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroup>
                <SidebarSeparator className="mx-0" />
              </React.Fragment>
            ))}
          </>
        </SidebarContent>
        <SidebarFooter>
          <MarketSidebarFooter />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="">
          <MkpHeader />

          <main>{children}</main>
        </div>
      </SidebarInset>
    </>
  );
}
