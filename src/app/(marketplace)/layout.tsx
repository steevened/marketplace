import Tabs from "./components/tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-sm">
      <div className="grid gap-3">
        {/* <Tabs /> */}
        {children}
      </div>
    </div>
  );
}
