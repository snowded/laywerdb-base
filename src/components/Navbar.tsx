import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Briefcase, Calendar } from 'lucide-react';

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/', icon: Users, label: 'Clients' },
    { to: '/cases', icon: Briefcase, label: 'Cases' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
  ];

  const baseClasses = `
    fixed lg:static inset-y-4 left-4 z-50 
    bg-black/90 backdrop-blur-xl
    rounded-[32px] shadow-2xl shadow-black/20
    transition-all duration-500 ease-out-expo
    lg:w-20 hover:w-64
    flex flex-col
    ${isOpen ? 'w-64' : 'w-20'}
  `;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Dynamic Island Navbar */}
      <nav className={baseClasses}>
        <div className="relative h-24 flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-gradient" />
          </div>

          {/* Briefcase Logo (visible when contracted) */}
          <div className={`
            absolute left-1/2 -translate-x-1/2
            transition-all duration-500 ease-out-expo
            ${isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
          `}>
            <div className="relative">
              <Briefcase size={32} className="text-white" />
              <div className="absolute inset-0 blur-lg bg-indigo-400/30" />
            </div>
          </div>

          {/* Header Text (visible when expanded) */}
          <div className={`
            absolute inset-x-0 px-6
            transition-all duration-500 ease-out-expo
            flex items-center justify-center
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <h2 className="text-2xl font-bold text-white">
              Law Office
            </h2>
          </div>
        </div>

        <div className="flex-1 px-2 mt-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `group flex items-center space-x-3 px-4 py-3 my-1 rounded-2xl
                transition-all duration-300 ease-out-expo relative
                ${isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={24} className="min-w-[24px] transition-transform duration-300 ease-out-expo group-hover:scale-110" />
              <span className="font-medium truncate opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out-expo lg:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                {label}
              </span>
              {/* Active indicator */}
              <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ease-out-expo
                ${location.pathname === to 
                  ? 'bg-white scale-100' 
                  : 'bg-transparent scale-0'}`} 
              />
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;