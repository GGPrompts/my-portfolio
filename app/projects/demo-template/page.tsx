'use client'

// Demo Template - Start with this minimal page
// Workers will transform this into the full animated portfolio style

export default function DemoProjectPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Basic Header */}
        <h1 className="text-4xl font-bold mb-4">TabzChrome</h1>
        <p className="text-gray-400 text-lg mb-8">
          A Chrome extension for terminal management
        </p>

        {/* Basic Content - Workers will enhance this */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Terminal sidebar in Chrome</li>
              <li>Multiple terminal tabs</li>
              <li>Profile management</li>
              <li>MCP tools for browser automation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code>{`git clone https://github.com/GGPrompts/TabzChrome
cd TabzChrome && npm install
npm run build
cd backend && npm start`}</code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Links</h2>
            <div className="flex gap-4">
              <a
                href="https://github.com/GGPrompts/TabzChrome"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
              <a
                href="https://ggprompts.github.io/TabzChrome/"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
