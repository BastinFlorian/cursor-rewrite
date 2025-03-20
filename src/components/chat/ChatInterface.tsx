import { useState } from 'react'
import { ChatInput } from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { useTools } from '../../context/ToolsContext'
import { Message } from '../../types/chat'

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Hello! I am your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ])
  const { executeToolAction } = useTools()

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    
    // Process message with tools if needed
    const toolPattern = /^\/([a-z]+)\s+(.+)$/i
    const match = content.match(toolPattern)
    
    if (match) {
      const [, toolName, toolInput] = match
      try {
        // Show loading state
        const loadingMessage: Message = {
          id: `loading-${Date.now()}`,
          role: 'assistant',
          content: 'Processing...',
          timestamp: new Date().toISOString(),
          isLoading: true,
        }
        setMessages((prev) => [...prev, loadingMessage])
        
        // Execute tool action
        const result = await executeToolAction(toolName, toolInput)
        
        // Replace loading message with result
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: result,
          timestamp: new Date().toISOString(),
          toolUsed: toolName,
        }
        
        setMessages((prev) => 
          prev.filter(msg => msg.id !== loadingMessage.id).concat(assistantMessage)
        )
      } catch (error) {
        // Handle error
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: new Date().toISOString(),
          isError: true,
        }
        
        setMessages((prev) => 
          prev.filter(msg => !msg.isLoading).concat(errorMessage)
        )
      }
    } else {
      // Regular message processing
      // In a real app, this would call an API to get a response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `I received your message: "${content}". This is a placeholder response.`,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">
        <ChatMessages messages={messages} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}