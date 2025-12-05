import React from "react";
import { cn } from "../../../utils/cn";

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "mt-4 rounded-3xl bg-[#f5f5f6] px-4 py-4 shadow-inner",
        className
      )}
    >
      {title && (
        <div className="mb-2 text-sm font-semibold text-gray-900">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionCard;
