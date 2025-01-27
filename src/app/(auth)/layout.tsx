import AuthFooter from "./components/auth-footer";
import AuthHeader from "./components/auth-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <AuthHeader />
      <main className="h-[calc(100svh-9rem)] px-2">{children}</main>
      <AuthFooter />
    </div>
  );
}
