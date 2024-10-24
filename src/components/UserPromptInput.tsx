import React, { useState } from 'react';

interface UserPromptInputProps {
  onPromptConfirm: (prompt: string) => void;
}

const UserPromptInput: React.FC<UserPromptInputProps> = ({ onPromptConfirm }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptConfirm(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-300 mb-2">
        Customize your dorm room transformation
      </label>
      <div className="flex">
        <input
          type="text"
          id="customPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          placeholder="e.g., add modern furniture, make the room brighter"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default UserPromptInput;
