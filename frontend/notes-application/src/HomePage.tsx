import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, StickyNote } from 'lucide-react'

type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  color: string
  created_at: string
  updated_at: string
}

const mockNotes: Note[] = [
  { id: '1', title: 'Meeting Notes', content: 'Discussed project timeline and milestones...', tags: ['work', 'project'], category: 'Work', color: '#5865F2', created_at: '2023-06-01T10:00:00Z', updated_at: '2023-06-01T10:00:00Z' },
  { id: '2', title: 'Ideas for Blog', content: 'Potential topics: React hooks, TypeScript tips...', tags: ['personal', 'writing'], category: 'Personal', color: '#57F287', created_at: '2023-06-02T14:30:00Z', updated_at: '2023-06-02T14:30:00Z' },
  { id: '3', title: 'Shopping List', content: 'Groceries: milk, eggs, bread...', tags: ['personal'], category: 'Personal', color: '#ED4245', created_at: '2023-06-03T09:15:00Z', updated_at: '2023-06-03T09:15:00Z' },
  { id: '4', title: 'Book Notes: Atomic Habits', content: 'Key concepts: 1% better every day...', tags: ['reading', 'self-improvement'], category: 'Personal', color: '#FEE75C', created_at: '2023-06-04T20:00:00Z', updated_at: '2023-06-04T20:00:00Z' },
]

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'title' | 'updated_at'>('updated_at')
  const [filterTag, setFilterTag] = useState<string | null>(null)

  const filteredNotes = mockNotes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(note => filterTag ? note.tags.includes(filterTag) : true)
    .sort((a, b) => sortBy === 'title' 
      ? a.title.localeCompare(b.title) 
      : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )

  const allTags = Array.from(new Set(mockNotes.flatMap(note => note.tags)))

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#dcddde]">My Notes</h1>
        <Link to="/new">
          <Button className="bg-[#5865f2] hover:bg-[#4752c4]">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#72767d]" />
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#40444b] border-[#40444b] text-[#dcddde] placeholder-[#72767d]"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'title' | 'updated_at')}
          className="bg-[#40444b] border-[#40444b] text-[#dcddde] rounded-md"
        >
          <option value="updated_at">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={filterTag === tag ? "default" : "secondary"}
            className={`cursor-pointer ${filterTag === tag ? 'bg-[#5865f2]' : 'bg-[#4f545c]'} text-[#dcddde]`}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map(note => (
          <Card key={note.id} className="bg-[#2f3136] border-[#40444b]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold text-[#dcddde]">{note.title}</h2>
                <StickyNote className="w-5 h-5" style={{ color: note.color }} />
              </div>
              <p className="text-[#b9bbbe] mb-4">{note.content.substring(0, 100)}...</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {note.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-[#4f545c] text-[#dcddde]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-[#72767d] text-sm">
                Updated: {new Date(note.updated_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}