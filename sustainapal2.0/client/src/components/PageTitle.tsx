import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageTitleProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export function PageTitle({ title, description, icon: Icon }: PageTitleProps) {
  return (
    <div className="mb-6 flex items-center">
      {Icon && (
        <div className="mr-3 h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-pink-400 flex items-center justify-center">
          <Icon className="h-5 w-5 text-white" />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}