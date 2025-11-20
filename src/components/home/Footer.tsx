import React from 'react';

export const Footer: React.FC = () => {
  const sections = ['Product', 'Company', 'Resources', 'Support'];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              MediCare Health
            </h3>
            <p className="text-gray-400">
              Revolutionizing healthcare management through intelligent technology and AI-powered solutions.
            </p>
          </div>
          
          {sections.map((section) => (
            <div key={section}>
              <h4 className="font-semibold text-lg mb-4">{section}</h4>
              <ul className="space-y-2 text-gray-400">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">
                      {section} Link {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MediCare Health. All rights reserved. Built with ❤️ for better healthcare.</p>
        </div>
      </div>
    </footer>
  );
};