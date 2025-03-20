import { Link } from 'react-router-dom'
import { useTools } from '../../context/ToolsContext'

export function Sidebar() {
  const { availableTools } = useTools()

  return (
    <aside className="w-64 bg-surface dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Tools</h2>
        <nav>
          <ul className="space-y-2">
            {availableTools.map((tool) => (
              <li key={tool.id}>
                <Link
                  to={`/tools/${tool.id}`}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="mr-2">{tool.icon}</span>
                  <span>{tool.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}