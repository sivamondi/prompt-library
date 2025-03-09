interface Item {
  id: number;
  name: string;
  logo: string;
  tags: string[];
  description: string;
}

export const typescriptItems: Item[] = [
  {
    id: 1,
    name: "TypeScript Development",
    logo: "/logos/typescript.png",
    tags: ["Lodash", "Zod"],
    description: "Expert in TypeScript and Node.js development with strong focus on type safety"
  },
  {
    id: 2,
    name: "TS Utils",
    logo: "/logos/ts-utils.png",
    tags: ["Utils", "Helpers"],
    description: "Collection of TypeScript utility functions and helper methods"
  }
];

export const nextjsItems: Item[] = [
  {
    id: 1,
    name: "Next.js React TypeScript",
    logo: "/logos/nextjs.png",
    tags: ["shadcn", "radix"],
    description: "Expert in Next.js App Router and server components"
  },
  {
    id: 2,
    name: "Next.js API Routes",
    logo: "/logos/api-routes.png",
    tags: ["API", "Backend"],
    description: "Building robust API routes with Next.js and TypeScript"
  }
];

export const reactItems: Item[] = [
  {
    id: 1,
    name: "React Components",
    logo: "/logos/react.png",
    tags: ["Components", "Hooks"],
    description: "Building reusable React components with modern practices"
  },
  {
    id: 2,
    name: "React State Management",
    logo: "/logos/state.png",
    tags: ["Redux", "Context"],
    description: "Managing complex state in React applications"
  }
]; 