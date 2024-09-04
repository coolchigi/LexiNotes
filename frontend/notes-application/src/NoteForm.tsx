import React, { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"
import styles from "./NoteForm.module.css"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigate("..")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.noteForm}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          required
          defaultValue={title}
          className={styles.input}
          placeholder="Enter note title"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="tags" className={styles.label}>
          Tags
        </label>
        <CreatableReactSelect
          onCreateOption={(label) => {
            const newTag = { id: uuidV4(), label }
            onAddTag(newTag)
            setSelectedTags((prev) => [...prev, newTag])
          }}
          value={selectedTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          options={availableTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => ({
                label: tag.label,
                id: tag.value,
              }))
            )
          }}
          isMulti
          className={styles.tagSelect}
          classNamePrefix="react-select"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="markdown" className={styles.label}>
          Body
        </label>
        <textarea
          id="markdown"
          ref={markdownRef}
          required
          defaultValue={markdown}
          className={styles.textarea}
          placeholder="Write your note here..."
          rows={15}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={`${styles.button} ${styles.saveButton}`}>
          Save
        </button>
        <Link to="..">
          <button type="button" className={`${styles.button} ${styles.cancelButton}`}>
            Cancel
          </button>
        </Link>
      </div>
    </form>
  )
}