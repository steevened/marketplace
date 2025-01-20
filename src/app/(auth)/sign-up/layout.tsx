import BrandLink from "@/app/components/brand-link";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <header className="h-16 flex items-center  shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4 ">
        <nav className="w-full justify-between max-w-screen-xl flex mx-auto ">
          <BrandLink />
          <div className="flex gap-2">
            <Button variant={"outline"}>Iniciar sesión</Button>
            <Button>Contacto</Button>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
