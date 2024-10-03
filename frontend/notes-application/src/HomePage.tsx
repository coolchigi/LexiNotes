import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Tag, Folder, Plus, Search, StickyNoteIcon } from 'lucide-react'

// Temporary type definition for Note
type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
}

// Temporary mock data
const mockNotes: Note[] = [
  { id: '1', title: 'Meeting Notes', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacus, nisl nec ultricies lacus.', tags: ['Work', 'Meeting'], createdAt: '2023-05-15' },
  { id: '2', title: 'Grocery List', content: 'Milk, Eggs, Bread, Apples, Bananas, Chicken, Rice, Pasta', tags: ['Personal', 'Shopping'], createdAt: '2023-05-14' },
  { id: '3', title: 'Project Roadmap', content: '1. Finalize design 2. Implement core features 3. Test and deploy', tags: ['Work', 'Project'], createdAt: '2023-05-08' },
  { id: '4', title: 'Book Ideas', content: '1. Sci-Fi novel about time travel 2. Children\'s book about friendship 3. Memoir about overcoming adversity', tags: ['Personal', 'Creative'], createdAt: '2023-04-15' },
]

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [notes, setNotes] = useState<Note[]>(mockNotes)

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r p-4">
        <h1 className="text-2xl font-bold mb-4">Lexinotes App</h1>
        <nav className="space-y-2">
          <Link to="/" className="flex items-center space-x-2 text-primary hover:underline">
            <FileText size={20} />
            <span>All Notes</span>
          </Link>
          <Link to="/tags" className="flex items-center space-x-2 text-foreground hover:text-primary hover:underline">
            <Tag size={20} />
            <span>Tags</span>
          </Link>
          <Link to="/categories" className="flex items-center space-x-2 text-foreground hover:text-primary hover:underline">
            <Folder size={20} />
            <span>Categories</span>
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Link to="/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {filteredNotes.map(note => (
              <div key={note.id} className="bg-card rounded-lg p-4 shadow flex">
                <div className="mr-4 mt-1">
                  <div className="bg-primary/10 p-2 rounded">
                    <StickyNoteIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <span className="text-sm text-muted-foreground">
                      {new Date(note.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{note.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map(tag => (
                      <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}