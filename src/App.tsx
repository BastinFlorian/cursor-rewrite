import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ChatInterface } from './components/chat/ChatInterface'
import { ToolsProvider } from './context/ToolsContext'

function App() {
  return (
    <Router>
      <ToolsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ChatInterface />} />
          </Routes>
        </Layout>
      </ToolsProvider>
    </Router>
  )
}

export default App