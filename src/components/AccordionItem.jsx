import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const AccordionItem = ({ title, children, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b">
      <button onClick={() => setOpen(!open)} className="flex justify-between w-full py-2">
        <div className="flex items-center">
          {Icon && <Icon className="mr-2" />}
          <span>{title}</span>
        </div>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && <div className="p-2">{children}</div>}
    </div>
  );
};
