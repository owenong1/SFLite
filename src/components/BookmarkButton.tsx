import { useBookmarks } from '../context/BookmarkContext';
import './BookmarkButton.css';

interface BookmarkButtonProps {
  courseId: string;
}

const BookmarkButton = ( { courseId } : BookmarkButtonProps ) => {
    const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
    const bookmarked = isBookmarked(courseId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (bookmarked) {
            removeBookmark(courseId);
        } else {
            addBookmark(courseId);
        }
    }

    return (
    <button onClick={handleClick} className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`}>
      {bookmarked ? '❤️ Bookmarked' : '🤍 Bookmark'}
    </button>
    );
};

export default BookmarkButton;
