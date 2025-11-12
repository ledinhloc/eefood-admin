import { setActiveTab, setSidebarOpen } from '@/core/store/slices/uiSlice.ts';
import { useAppDispatch, type RootState } from '@/core/store/store.ts';
import { cn } from '@/lib/utils';
import {
  Bell,
  ChefHat,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Users,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export type NavItem = {
  path: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

const navigationItems: NavItem[] = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard, description: 'Overview and analytics' },
  { path: '/users', name: 'Users', icon: Users, description: 'Manage user accounts' },
  { path: '/posts', name: 'Posts', icon: FileText, description: 'Content and articles' },
  { path: '/recipes', name: 'Recipes', icon: ChefHat, description: 'Cooking recipes' },
  { path: '/comments', name: 'Comments', icon: MessageCircle, description: 'User comments & reviews' },
  { path: '/notifications', name: 'Notifications', icon: Bell, description: 'Alerts and messages' },
];

export const Sidebar = () => {
  const { activeTab, isSidebarOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  const handleNavClick = (path: string) => {
    dispatch(setActiveTab(path.replace('/', '') as any));
    if (window.innerWidth < 1024) dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => dispatch(setSidebarOpen(false))}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-border bg-background/90 backdrop-blur-sm z-30 flex flex-col transition-all duration-300 ease-in-out shadow-lg lg:sticky lg:top-0 lg:h-screen',
          isSidebarOpen
            ? 'w-64 translate-x-0'
            : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.path.replace('/', '');
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 relative',
                    isActive
                      ? 'bg-orange-500/10 text-orange-600 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 transition-all',
                      isActive ? 'text-orange-500 scale-110' : 'group-hover:scale-105'
                    )}
                  />
                  <div
                    className={cn(
                      'flex flex-col min-w-0 transition-all duration-300',
                      !isSidebarOpen && 'lg:opacity-0 lg:scale-90 lg:absolute lg:left-12'
                    )}
                  >
                    <span className="truncate">{item.name}</span>
                    {isSidebarOpen && (
                      <span
                        className={cn(
                          'text-xs text-muted-foreground truncate transition-opacity duration-200',
                          isActive ? 'opacity-90' : 'opacity-70'
                        )}
                      >
                        {item.description}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-orange-500" />
                  )}

                  {!isSidebarOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-foreground text-background text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      <span className="font-medium">{item.name}</span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
