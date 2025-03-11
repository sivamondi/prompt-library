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

// Add roles data
const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "Machine Learning Engineer",
  "Mobile Developer"
];

export default function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitPrompt = (data: SubmitData) => {
    console.log('Submitted:', data);
    // Handle the submission logic here
  };

  return (
    <div className="search-container">
      <div className="header-container">
        <h1>Prompt Library</h1>
        <button 
          className="submit-prompt-button"
          onClick={() => setIsModalOpen(true)}
        >
          Submit Prompt
        </button>
      </div>
      <div className="logo-container">
        <img src="/h-u-black.png" alt="H-U Logo" className="header-logo" />
        <div className="vertical-separator"></div>
        <img src="/h-c-black.png" alt="H-C Logo" className="header-logo" />
      </div>
      <SubmitPromptModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPrompt}
      />
    </div>
  );
} 