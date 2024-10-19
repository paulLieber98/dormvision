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
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700">
        Customize your dorm room
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          id="customPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
          placeholder="e.g., add modern furniture, make the room brighter"
        />
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default UserPromptInput;
