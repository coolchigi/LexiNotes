import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Home, FileText, Tag, Folder, Settings } from 'lucide-react'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#1e1e1e] text-[#dcddde]">
      {/* Sidebar */}
      <div className="w-64 bg-[#2f3136] p-4 flex flex-col">
        <Link to="/" className="text-2xl font-bold mb-6 flex items-center">
          <h1 className="text-2xl font-bold italic mb-6">LexiNotes</h1>
        </Link>
        <nav className="space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#40444b]">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/new">
            <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#40444b]">
              <FileText className="w-5 h-5 mr-2" />
              New Note
            </Button>
          </Link>
          <Link to="/tags">
            <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#40444b]">
              <Tag className="w-5 h-5 mr-2" />
              Tags
            </Button>
          </Link>
          <Link to="/categories">
            <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#40444b]">
              <Folder className="w-5 h-5 mr-2" />
              Categories
            </Button>
          </Link>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-[#dcddde] hover:bg-[#40444b]">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}