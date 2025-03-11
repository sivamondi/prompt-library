import { Prompt } from '../data/types';
import { useState } from 'react';
import ViewPromptModal from './ViewPromptModal';

interface CategorySectionProps {
  title: string;
  items: Prompt[];
}

export default function CategorySection({ title, items }: CategorySectionProps): JSX.Element {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewPrompt, setViewPrompt] = useState<{ name: string; prompt: string } | null>(null);

  const copyToClipboard = async (text: string, name: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(name);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="category-section">
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.name} className="item-card">
            <div className="card-header">
              <div className="tech-stack">
                <span className="role-tag">{item.content.category}</span>
                <span className="tag">{item.content["tech-stack"]}</span>
              </div>
              <div className="card-actions">
                <button 
                  onClick={() => setViewPrompt({ name: item.name, prompt: item.content.prompt })}
                  className="icon-button"
                  title="View prompt"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button 
                  onClick={() => copyToClipboard(item.content.prompt, item.name)}
                  className="icon-button"
                  title="Copy to clipboard"
                >
                  {copiedId === item.name ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
                <button 
                  onClick={() => downloadText(item.content.prompt, `${item.name}.txt`)}
                  className="icon-button"
                  title="Download as text file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ViewPromptModal
        isOpen={viewPrompt !== null}
        onClose={() => setViewPrompt(null)}
        prompt={viewPrompt?.prompt || ''}
        name={viewPrompt?.name || ''}
      />
    </section>
  );
} 