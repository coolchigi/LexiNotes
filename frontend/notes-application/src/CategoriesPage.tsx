import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Folder, ChevronRight, ChevronDown, Plus, Search } from 'lucide-react'

type Category = {
  id: string
  name: string
  children?: Category[]
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Work',
    children: [
      { id: '1-1', name: 'Projects' },
      { id: '1-2', name: 'Meetings' },
    ],
  },
  {
    id: '2',
    name: 'Personal',
    children: [
      { id: '2-1', name: 'Journal' },
      { id: '2-2', name: 'Ideas' },
    ],
  },
]

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [newCategory, setNewCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, { id: Date.now().toString(), name: newCategory }])
      setNewCategory('')
    }
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const renderCategory = (category: Category, depth = 0) => {
    const isExpanded = expandedCategories.includes(category.id)
    const hasChildren = category.children && category.children.length > 0

    if (!category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return null
    }

    return (
      <div key={category.id} className="mb-1">
        <div
          className={`flex items-center space-x-2 p-2 rounded hover:bg-[#40444b] cursor-pointer`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => toggleCategory(category.id)}
        >
          {hasChildren && (
            isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          )}
          <Folder className="w-4 h-4" />
          <span>{category.name}</span>
        </div>
        {isExpanded && category.children && (
          <div>
            {category.children.map(child => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-[#dcddde]">
        <Folder className="w-8 h-8 mr-2" />
        Categories
      </h1>
      <div className="mb-6 flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#72767d]" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#40444b] border-[#40444b] text-[#dcddde] placeholder-[#72767d]"
          />
        </div>
        <div className="flex">
          <Input
            type="text"
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="rounded-r-none bg-[#40444b] border-[#40444b] text-[#dcddde] placeholder-[#72767d]"
          />
          <Button onClick={handleAddCategory} className="rounded-l-none bg-[#5865f2] hover:bg-[#4752c4]">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="bg-[#2f3136] rounded-lg p-4">
        {categories.map(category => renderCategory(category))}
      </div>
    </div>
  )
}