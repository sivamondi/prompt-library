import { useState } from 'react';
import SubmitPromptModal from './SubmitPromptModal';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SubmitData {
  role: string;
  techStack: string[];
  description: string;
  prompt: string;
}

export default function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitPrompt = (data: SubmitData) => {
    console.log('Submitted:', data);
    // Handle the submission logic here
  };

  return (
    <div className="search-container">
      <h1>Prompt Library</h1>
      <p>Model Context Protocol (MCP)</p>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a prompt..."
        value={value}
        onChange={onChange}
      />
      <div className="search-actions">
        <button 
          className="submit-prompt-button"
          onClick={() => setIsModalOpen(true)}
        >
          Submit Prompt
        </button>
      </div>
      <SubmitPromptModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPrompt}
      />
    </div>
  );
} 