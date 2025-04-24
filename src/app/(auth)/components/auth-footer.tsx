"use client";

import BrandLink from "@/app/components/brand/brand-link";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthFooter() {
  const pathname = usePathname();
  return (
    <footer className="h-20 border-t flex items-center justify-center">
      <div className="text-center text-primary text-sm">
        {pathname === "/sign-in" ? (
          <>
            <p>¿No tienes una cuenta? </p>
            <Link
              href="/sign-up"
              className="hover:underline-offset-4 hover:underline"
            >
              Regístrate aquí
            </Link>
          </>
        ) : null}
        {pathname === "/sign-up" ? (
          <>
            <p>¿Ya tienes una cuenta? </p>
            <Link
              href="/sign-in"
              className="hover:underline-offset-4 hover:underline"
            >
              Inicia sesión
            </Link>
          </>
        ) : null}
      </div>
    </footer>
  );
}
