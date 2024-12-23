import Avatar from "./Avatar";
import { formatDateTime } from "../utils/dateFormatter";
import { useEmailContext } from "../context/EmailContext";
import { useLocation } from "react-router-dom";

const EmailListItem = ({
  email,
  isSelected,
  onEmailSelect,
  showToggleReadButton,
}) => {
  const { toggleRead } = useEmailContext();
  const location = useLocation();
  const isOnHomepage = location.pathname === "/";
  const handleSelect = () => {
    onEmailSelect(email.id);
    if (!email.isRead) {
      toggleRead(email.id);
    }
  };

  const handleToggleRead = (e) => {
    e.stopPropagation();
    toggleRead(email.id);
  };

  return (
    <article
      onClick={handleSelect}
      className={`flex items-center p-4 rounded cursor-pointer ${
        isSelected ? "bg-blue-100" : email.isRead ? "bg-filterBtn" : "bg-white"
      } ${!isOnHomepage ? "border border-accent" : ""}`}
    >
      <Avatar name={email.from.name} />

      <div className="ml-4 flex-1">
        <header>
          <h5>
            From:{" "}
            <span className="font-medium">{`${email.from.name} <${email.from.email}>`}</span>
          </h5>
        </header>

        <h6 className="text-[15px]">Subject: {email.subject}</h6>

        <p className="text-sm text-gray-700 mb-1">{email.short_description}</p>

        <time className="text-xs text-gray-500">
          {formatDateTime(new Date(email.date))}
        </time>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`ml-4 text-xl ${
          email.isFavorite ? "text-yellow-500" : "text-gray-500"
        }`}
        aria-label={
          email.isFavorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        {email.isFavorite ? "★" : "☆"}
      </button>

      {showToggleReadButton && (
        <button
          onClick={handleToggleRead}
          className={`ml-4 px-3 py-1 text-sm rounded ${
            email.isRead ? "bg-accent text-white" : "bg-gray-200 text-black"
          }`}
          aria-label={email.isRead ? "Mark as Unread" : "Mark as Read"}
        >
          {email.isRead ? "Mark as Unread" : "Mark as Read"}
        </button>
      )}
    </article>
  );
};

export default EmailListItem;
