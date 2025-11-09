import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Star, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Properties", href: "/property/2B%20N1%20A%20-%2029%20Shoreditch%20Heights", icon: Star },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-card border-r border-border overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-2xl font-bold text-foreground">FlexLiving</h1>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            <NavLinks />
          </nav>
          <div className="flex-shrink-0 p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-10 flex items-center gap-4 bg-card border-b border-border px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full pt-5">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <h1 className="text-2xl font-bold text-foreground">FlexLiving</h1>
              </div>
              <nav className="flex-1 px-3 space-y-1">
                <NavLinks />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-bold text-foreground">FlexLiving</h1>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
