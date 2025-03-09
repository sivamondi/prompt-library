import { useState, useEffect } from 'react';
import techStackData from '../data/tech-stack.json';

interface SubmitPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { 
    role: string; 
    techStack: string[]; 
    description: string;
    prompt: string;
  }) => void;
}

// Get all roles grouped by category
const rolesByCategory = Object.entries(techStackData).reduce((acc, [category, roles]) => {
  acc[category] = Object.keys(roles);
  return acc;
}, {} as { [key: string]: string[] });

// Flatten the nested structure for easier role lookup
const roleToTechStack = Object.entries(techStackData).reduce((acc, [_, categoryRoles]) => {
  Object.entries(categoryRoles).forEach(([role, techStack]) => {
    acc[role] = techStack;
  });
  return acc;
}, {} as { [key: string]: string[] });

export default function SubmitPromptModal({ isOpen, onClose, onSubmit }: SubmitPromptModalProps): JSX.Element {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [availableTechStack, setAvailableTechStack] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');

  // Update available tech stack when role changes
  useEffect(() => {
    if (selectedRole && roleToTechStack[selectedRole]) {
      setAvailableTechStack(roleToTechStack[selectedRole]);
      setSelectedTechStack([]); // Reset selections when role changes
    } else {
      setAvailableTechStack([]);
    }
  }, [selectedRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random name
    const randomId = Math.random().toString(36).substring(2, 8);
    const promptName = `prompt-${randomId}`;

    // Format data according to required structure
    const formattedData = {
      name: promptName,
      content: {
        category: selectedRole,
        "tech-stack": selectedTechStack.join(", "),
        prompt: description
      }
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/prompts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit prompt');
      }

      // Close modal on success
      onClose();
    } catch (error) {
      console.error('Error submitting prompt:', error);
      // Optionally add error handling UI here
    }
  };

  const handleClose = () => {
    setSelectedRole('');
    setSelectedTechStack([]);
    setDescription('');
    setPrompt('');
    onClose();
  };

  const handleTechStackChange = (tech: string) => {
    setSelectedTechStack(prev => 
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Submit New Prompt</h2>
          <button onClick={handleClose} className="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <div className="select-container">
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
                className="select-input"
              >
                <option value="">Select a role</option>
                {Object.entries(rolesByCategory).map(([category, roles]) => (
                  <optgroup key={category} label={category}>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {availableTechStack.length > 0 && (
            <div className="form-group">
              <label>Tech Stack</label>
              <div className="checkbox-container">
                <div className="checkbox-grid">
                  {availableTechStack.map((tech) => (
                    <label key={tech} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedTechStack.includes(tech)}
                        onChange={() => handleTechStackChange(tech)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Prompt</label>
            <div className="textarea-container">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="textarea-input"
                placeholder="Enter a clear and concise prompt..."
              />
            </div>
          </div>

         
          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="cancel-button">
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={!selectedRole || selectedTechStack.length === 0 || !description.trim()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 