import React from 'react';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Patients', href: '/patients', icon: '👥' },
  { name: 'Appointments', href: '/appointments', icon: '📅' },
  { name: 'Medical Records', href: '/records', icon: '📋' },
  { name: 'Doctors', href: '/doctors', icon: '👨‍⚕️' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-white text-lg font-semibold">MediCare Health</h2>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};