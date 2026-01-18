import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        {children}
      </div>
    </main>
  );
};
