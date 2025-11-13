import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const NoHeaderLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
