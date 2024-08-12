import React, { useState, useEffect } from 'react';

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: () => void;
  buttonText: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, onClick, buttonText }) => {
  const [dots, setDots] = useState('');
  const maxDots = 4;

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setDots((prevDots) => {
          const currentDots = prevDots.length % maxDots;
          return '.'.repeat(currentDots + 1);
        });
      }, 500);

      return () => clearInterval(intervalId);
    } else {
      setDots('');
    }
  }, [isLoading]);

  return (
    <button className='bg-orange-800 rounded-md text-white py-2' onClick={onClick}>
      {isLoading ? `Loading${dots}` : buttonText}
    </button>
  );
};

export default LoadingButton;
