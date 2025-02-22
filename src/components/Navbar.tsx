
import { useState } from 'react';

interface NavbarProps {
  onNavigate: {
    about: () => void;
    events: () => void;
    faq: () => void;
    contact: () => void;
  };
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', action: onNavigate.about },
    { label: 'Events', action: onNavigate.events },
    { label: 'FAQ', action: onNavigate.faq },
    { label: 'Contact', action: onNavigate.contact },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-sm bg-gray-900/10 h-14">
      <div className="max-w-7xl mx-auto px-3 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <span className="font-clash text-white text-lg font-bold">COSC</span>
            <span className="text-gray-400 mx-1">|</span>
            <div className="flex items-center gap-1">
              <img src="/opensys.png" alt="OpenSys Logo" className="h-6" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-white hover:text-purple-200 transition-colors duration-200 font-sora text-sm px-2 py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-200 transition-colors duration-200"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/40 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="text-white hover:text-purple-200 block px-3 py-2 text-sm font-sora w-full text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
