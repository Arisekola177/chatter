import React from 'react';

interface NulldataProps {
  title: string;
}

const Nulldata: React.FC<NulldataProps> = ({ title }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-4xl md:text-2xl">
      <p className="font-medium text-white">{title}</p>
    </div>
  );
}

export default Nulldata;
