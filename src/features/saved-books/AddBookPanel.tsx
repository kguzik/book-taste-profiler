'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import BookSearch from '@/features/book-search/BookSearch';
import TagSelector from '@/features/saved-books/TagSelector';
import type { BookSearchResult, SavedBook } from '@/types/book';
import { addBookPanelContent } from '@/data/add-book-panel';

type AddBookInput = Omit<SavedBook, 'id' | 'createdAt'>;

type Props = {
  addBook: (input: AddBookInput) => void;
};

export default function AddBookPanel({ addBook }: Props) {
  const [selected, setSelected] = useState<BookSearchResult | null>(null);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  function handleToggle(tag: string) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function handleSave() {
    if (!selected) return;
    addBook({
      sourceId: selected.id,
      title: selected.title,
      author: selected.author,
      year: selected.year,
      coverUrl: selected.coverUrl,
      notes: notes.trim() || undefined,
      tags,
    });
    setSelected(null);
    setNotes('');
    setTags([]);
  }

  if (!selected) {
    return <BookSearch onSelect={setSelected} />;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4'>
        {selected.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selected.coverUrl}
            alt=''
            width={48}
            height={72}
            className='h-[72px] w-12 shrink-0 rounded object-cover'
          />
        )}
        <div className='min-w-0 flex-1'>
          <p className='text-sm font-semibold text-white'>{selected.title}</p>
          {selected.author && (
            <p className='mt-0.5 text-xs text-white/40'>{selected.author}</p>
          )}
          {selected.year && (
            <p className='mt-0.5 text-xs text-white/25'>{selected.year}</p>
          )}
        </div>
        <button
          type='button'
          onClick={() => setSelected(null)}
          className='shrink-0 text-xs text-white/30 transition-colors duration-200 hover:text-white/70'
        >
          {addBookPanelContent.changeBook}
        </button>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label
          htmlFor='notes'
          className='text-xs font-medium tracking-widest text-white/30 uppercase'
        >
          {addBookPanelContent.notesLabel}
        </label>
        <textarea
          id='notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={addBookPanelContent.notesPlaceholder}
          rows={3}
          className='w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-white/25 focus:outline-none transition-colors duration-200'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <p className='text-xs font-medium tracking-widest text-white/30 uppercase'>
          {addBookPanelContent.vibeTagsLabel}
        </p>
        <TagSelector selected={tags} onToggle={handleToggle} />
      </div>

      <div className='flex justify-end'>
        <Button onClick={handleSave}>{addBookPanelContent.saveButton}</Button>
      </div>
    </div>
  );
}
