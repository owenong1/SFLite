import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

// Helper functions to interact with localStorage
const getBookmarksFromStorage = (): string[] => {
  const bookmarks = localStorage.getItem('bookmarkedCourses');
  return bookmarks ? JSON.parse(bookmarks) : [];
};

const setBookmarksInStorage = (bookmarks: string[]) => {
  localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarks));
};

interface BookmarkContextType {
  bookmarkedIds: string[]; // Same as course IDs
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// Create a hook for easy access to the context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  // Initialize bookmarks from localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarksFromStorage);

  // Use useEffect to update localStorage whenever the bookmarks change
  useEffect(() => {
    setBookmarksInStorage(bookmarkedIds);
  }, [bookmarkedIds]);

  const addBookmark = (id: string) => {
    setBookmarkedIds(prev => [...prev, id]);
  };

  const removeBookmark = (id: string) => {
    setBookmarkedIds(prev => prev.filter(bookmarkId => bookmarkId !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarkedIds.includes(id);
  };

  const value = { bookmarkedIds, addBookmark, removeBookmark, isBookmarked };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
