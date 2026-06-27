import { useNavigate } from 'react-router-dom';
import { MdMenuBook } from 'react-icons/md';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const imgSrc = book.coverImage ? `${process.env.REACT_APP_API_URL || ""}${book.coverImage}` : null;

  return (
    <div className="book-card" onClick={() => navigate(`/books/${book._id}`)}>
      {imgSrc ? (
        <img src={imgSrc} alt={book.title} className="book-card__cover" loading="lazy" />
      ) : (
        <div className="book-card__cover-placeholder"><MdMenuBook /></div>
      )}
      <div className="book-card__body">
        <div className="book-card__category">{book.category}</div>
        <div className="book-card__title">{book.title}</div>
        <div className="book-card__author">{book.author}</div>
        <div className="book-card__price">BDT {book.price}</div>
      </div>
    </div>
  );
};

export default BookCard;
