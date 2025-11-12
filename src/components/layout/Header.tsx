import { Bell, Search, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/core/store/store.ts";
import { setSidebarOpen } from "@/core/store/slices/uiSlice.ts";

export const Header = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen} = useSelector((state: RootState) => state.ui);

    return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-3">
        
          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br overflow-hidden">
            <img
              src={logo}
              alt="eeFood logo"
              className="h-6 w-6 object-contain"
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-xl font-bold text-foreground">eeFood</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>

          {/* Button  */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative h-10 w-10">
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Button>

          <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Anh Khoa</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};