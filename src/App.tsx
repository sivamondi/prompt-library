import { useState, useEffect } from 'react'
import './App.css'
import CategorySection from './components/CategorySection'
import SearchBar from './components/SearchBar'
import { Prompt, PromptsByCategory } from './data/types'
import ThemeToggle from './components/ThemeToggle'
import techStackData from './data/tech-stack.json'

// Get all roles grouped by category (same as in SubmitPromptModal)
const rolesByCategory = Object.entries(techStackData).reduce((acc, [category, roles]) => {
  acc[category] = Object.keys(roles);
  return acc;
}, {} as { [key: string]: string[] });

function App(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [prompts, setPrompts] = useState<PromptsByCategory>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/prompts/')
        if (!response.ok) {
          throw new Error('Failed to fetch prompts')
        }
        const data: Prompt[] = await response.json()
        
        // Group prompts by category
        const groupedPrompts = data.reduce((acc: PromptsByCategory, prompt) => {
          const category = prompt.content.category
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push(prompt)
          return acc
        }, {})
        
        setPrompts(groupedPrompts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  // Filter prompts based on search query
  const filteredPrompts = Object.entries(prompts).reduce((acc: PromptsByCategory, [category, items]) => {
    const filteredItems = items.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      const techStacks = item.content["tech-stack"].split(", "); // Split tech stack string into array
      
      return (
        // Check if any tech stack matches the search query
        techStacks.some(tech => tech.toLowerCase().includes(searchLower)) ||
        item.content.prompt.toLowerCase().includes(searchLower) ||
        item.content.category.toLowerCase().includes(searchLower)
      );
    });
    
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="app">
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      <main className="main-content">
        <SearchBar 
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <div className="search-actions">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-select"
          >
            <option value="">Select Role</option>
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
          <input
            type="text"
            className="search-input-inline"
            placeholder="Filter by Tech Stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="categories">
          {Object.entries(filteredPrompts).map(([category, items]) => (
            <CategorySection 
              key={category}
              title={category}
              items={items}
            />
          ))}
        </div>
        {Object.keys(filteredPrompts).length === 0 && searchQuery && (
          <div className="no-results">
            No prompts found for "{searchQuery}"
          </div>
        )}
      </main>
    </div>
  )
}

export default App
