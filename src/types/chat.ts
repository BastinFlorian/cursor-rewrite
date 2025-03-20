export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  isLoading?: boolean
  isError?: boolean
  toolUsed?: string
}