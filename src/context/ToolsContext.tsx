import { createContext, useContext, ReactNode, useState } from 'react'
import { Tool } from '../types/tools'

// Sample tools for demonstration
const defaultTools: Tool[] = [
  {
    id: 'code-sandbox',
    name: 'Code Sandbox',
    description: 'Run and test code snippets in various languages',
    icon: '💻',
    execute: async (input: string) => {
      // This would connect to a real code execution service
      return `Executed code: ${input}\nResult: [Sample output]`
    },
  },
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the web for information',
    icon: '🔍',
    execute: async (input: string) => {
      // This would connect to a real search API
      return `Search results for: ${input}\n\n1. Sample result 1\n2. Sample result 2`
    },
  },
  {
    id: 'browser',
    name: 'Web Browser',
    description: 'Browse and interact with web pages',
    icon: '🌐',
    execute: async (input: string) => {
      // This would connect to a headless browser service
      return `Browsed to: ${input}\n\nTitle: Sample Page\nContent: [Sample content from the page]`
    },
  },
]

interface ToolsContextType {
  availableTools: Tool[]
  executeToolAction: (toolName: string, input: string) => Promise<string>
  addTool: (tool: Tool) => void
  removeTool: (toolId: string) => void
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined)

interface ToolsProviderProps {
  children: ReactNode
  initialTools?: Tool[]
}

export function ToolsProvider({ 
  children, 
  initialTools = defaultTools 
}: ToolsProviderProps) {
  const [tools, setTools] = useState<Tool[]>(initialTools)

  const executeToolAction = async (toolName: string, input: string): Promise<string> => {
    const tool = tools.find(t => t.id === toolName || t.name.toLowerCase() === toolName.toLowerCase())
    
    if (!tool) {
      throw new Error(`Tool "${toolName}" not found`)
    }
    
    try {
      return await tool.execute(input)
    } catch (error) {
      throw new Error(`Error executing tool "${toolName}": ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const addTool = (tool: Tool) => {
    setTools(prev => [...prev, tool])
  }

  const removeTool = (toolId: string) => {
    setTools(prev => prev.filter(tool => tool.id !== toolId))
  }

  return (
    <ToolsContext.Provider value={{ 
      availableTools: tools, 
      executeToolAction,
      addTool,
      removeTool
    }}>
      {children}
    </ToolsContext.Provider>
  )
}

export function useTools() {
  const context = useContext(ToolsContext)
  if (context === undefined) {
    throw new Error('useTools must be used within a ToolsProvider')
  }
  return context
}