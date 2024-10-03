import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, Tag, Folder, Plus, Search, StickyNoteIcon } from 'lucide-react'

// Temporary type definition for Note
type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  createdAt: string
  color: string
}

// Temporary mock data
const mockNotes: Note[] = [
  { id: '1', title: 'Meeting Notes', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacus, nisl nec ultricies lacus.', tags: ['Work', 'Meeting'], category: 'Work', createdAt: '2023-05-15', color: 'bg-blue-500' },
  { id: '2', title: 'Grocery List', content: 'Milk, Eggs, Bread, Apples, Bananas, Chicken, Rice, Pasta', tags: ['Personal', 'Shopping'], category: 'Personal', createdAt: '2023-05-14', color: 'bg-green-500' },
  { id: '3', title: 'Project Roadmap', content: '1. Finalize design 2. Implement core features 3. Test and deploy', tags: ['Work', 'Project'], category: 'Work', createdAt: '2023-05-08', color: 'bg-purple-500' },
  { id: '4', title: 'Book Ideas', content: '1. Sci-Fi novel about time travel 2. Children\'s book about friendship 3. Memoir about overcoming adversity', tags: ['Personal', 'Creative'], category: 'Personal', createdAt: '2023-04-15', color: 'bg-yellow-500' },
]

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [sortBy, setSortBy] = useState('date')
  const [filterBy, setFilterBy] = useState('all')

  const filteredAndSortedNotes = notes
    .filter(note => {
      if (filterBy === 'all') return true
      return note.category.toLowerCase() === filterBy.toLowerCase()
    })
    .filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

  const categories = ['Work', 'Personal', 'Study', 'Other']
  const recentTags = ['Work', 'Meeting', 'Personal', 'Shopping', 'Project', 'Creative']

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 bg-secondary/10">
        <h1 className="text-2xl font-bold italic mb-6">LexiNotes</h1>
        <nav className="space-y-2 mb-6">
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterBy(category.toLowerCase())}
              className={`block w-full text-left px-2 py-1 rounded ${filterBy === category.toLowerCase() ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Tags</h2>
          <div className="flex flex-wrap gap-2">
            {recentTags.map(tag => (
              <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter by</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setFilterBy('all')}>All</DropdownMenuItem>
                {categories.map(category => (
                  <DropdownMenuItem key={category} onSelect={() => setFilterBy(category.toLowerCase())}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to="/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {filteredAndSortedNotes.map(note => (
              <div key={note.id} className="bg-card rounded-lg p-4 shadow flex">
                <div className="mr-4 mt-1">
                  <div className={`p-2 rounded ${note.color}`}>
                    <StickyNoteIcon className="h-6 w-6 text-white" />
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