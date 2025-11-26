import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { ntuthuko } from '@/api/ntuthukoClient';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, Users, Clock, Calendar, FileText, 
  Settings, LogOut, Menu, ChevronRight, User, 
  CalendarDays, BarChart3, X, Bell 
} from 'lucide-react';
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
  { name: 'My Profile', href: 'MyProfile', icon: User },
  { name: 'Employees', href: 'Employees', icon: Users },
  { name: 'Timesheet', href: 'Timesheet', icon: Clock },
  { name: 'Shifts', href: 'Shifts', icon: CalendarDays },
  { name: 'Leave', href: 'Leave', icon: Calendar },
  { name: 'Alerts', href: 'Alerts', icon: Bell },
  { name: 'Reports', href: 'Reports', icon: BarChart3 },
  { name: 'Settings', href: 'Settings', icon: Settings },
];

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  const NavItem = ({ item, mobile = false }) => {
    const isActive = currentPageName === item.href;
    const Icon = item.icon;
    
    return (
      <Link
        to={createPageUrl(item.href)}
        onClick={() => mobile && setMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          isActive 
            ? "bg-slate-900 text-white" 
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <Icon className="w-5 h-5" />
        {item.name}
        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-slate-200">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">TimeTrack</h1>
              <p className="text-xs text-slate-500">Attendance System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* User Menu */}
          {user && (
            <div className="p-4 border-t border-slate-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                        {user.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-slate-900 truncate">{user.full_name || user.email}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl('MyProfile')} className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900">TimeTrack</span>
        </div>
        
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-slate-900">TimeTrack</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} mobile />
                ))}
              </nav>

              {user && (
                <div className="p-4 border-t">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {user.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{user.full_name || user.email}</p>
                      <p className="text-sm text-slate-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">
        {children}
      </main>
    </div>
  );
}
