import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full py-4 px-6 border-t text-center text-xs bg-background text-foreground">
    &copy; {new Date().getFullYear()} Finance Assistant. All rights reserved.
  </footer>
);

export default Footer;
