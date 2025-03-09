export interface PromptContent {
  category: string;
  "tech-stack": string;
  prompt: string;
}

export interface Prompt {
  name: string;
  content: PromptContent;
}

export interface PromptsByCategory {
  [key: string]: Prompt[];
} 