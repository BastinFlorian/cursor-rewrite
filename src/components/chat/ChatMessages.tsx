import { useEffect, useRef } from 'react'
import { Message } from '../../types/chat'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// Configure marked with highlight.js for code syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
})

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Format timestamp to readable format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Render message content with markdown support
  const renderContent = (content: string) => {
    return { __html: marked(content) }
  }

  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-3/4 rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-primary text-white'
                : message.role === 'system'
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                : 'bg-surface dark:bg-surface-dark border border-gray-200 dark:border-gray-700'
            } ${message.isError ? 'border-red-500 dark:border-red-500' : ''}`}
          >
            {message.isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">⏳</div>
                <span>{message.content}</span>
              </div>
            ) : (
              <>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={renderContent(message.content)}
                />
                {message.toolUsed && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Tool used: {message.toolUsed}
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(message.timestamp)}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}