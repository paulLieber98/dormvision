import React from 'react';

const LoadingBar: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full animate-pulse"
          style={{
            width: '100%',
            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
