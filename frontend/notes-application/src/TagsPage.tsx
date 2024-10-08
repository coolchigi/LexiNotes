import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag, Plus, Search } from 'lucide-react'

export function TagsPage() {
  const [tags, setTags] = useState<string[]>(['Work', 'Personal', 'Ideas', 'Project', 'Meeting', 'Journal'])
  const [newTag, setNewTag] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-[#dcddde]">
        <Tag className="w-8 h-8 mr-2" />
        Tags
      </h1>
      <div className="mb-6 flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#72767d]" />
          <Input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#40444b] border-[#40444b] text-[#dcddde] placeholder-[#72767d]"
          />
        </div>
        <div className="flex">
          <Input
            type="text"
            placeholder="New tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="rounded-r-none bg-[#40444b] border-[#40444b] text-[#dcddde] placeholder-[#72767d]"
          />
          <Button onClick={handleAddTag} className="rounded-l-none bg-[#5865f2] hover:bg-[#4752c4]">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredTags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-[#4f545c] text-[#dcddde] text-sm py-1 px-3">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}