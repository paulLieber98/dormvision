import React, { useState } from 'react';

interface UserPromptInputProps {
  onPromptSubmit: (prompt: string) => void;
}

const UserPromptInput: React.FC<UserPromptInputProps> = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptSubmit(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="userPrompt" className="block text-sm font-medium text-gray-700 mb-2">
        Customize your room transformation:
      </label>
      <div className="flex">
        <input
          type="text"
          id="userPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Add a cozy Scandinavian style to the living room"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Set Prompt
        </button>
      </div>
    </form>
  );
};

export default UserPromptInput;
