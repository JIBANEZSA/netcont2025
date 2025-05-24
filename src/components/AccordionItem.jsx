import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; //

export const AccordionItem = ({ title, children, icon: Icon, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen); //
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"> {/* */}
      <button
        onClick={() => setOpen(!open)} //
        className="flex justify-between items-center w-full py-3 px-1 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
        aria-expanded={open}
      >
        <div className="flex items-center font-medium"> {/* */}
          {Icon && <Icon className="mr-2 h-5 w-5 text-indigo-500" />} {/* */}
          <span>{title}</span> {/* */}
        </div>
        {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />} {/* */}
      </button>
      {open && <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-sm">{children}</div>} {/* */}
    </div>
  );
};