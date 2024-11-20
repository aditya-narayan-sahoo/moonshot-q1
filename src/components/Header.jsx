import { useEmailContext } from "../context/EmailContext";
import { useNavigate, useLocation } from "react-router-dom";

const Filters = () => {
  const { setFilters, filters } = useEmailContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const navigateToHomepage = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const isOnHomepage = location.pathname === "/";

  return (
    <aside
      className="flex space-x-4 p-4 bg-background border-b"
      aria-label="Email filters"
    >
      <button
        className={`px-4 py-2 rounded ${
          filters.favorites ? "bg-accent text-text" : "bg-filterBtn"
        }`}
        onClick={() => handleFilterChange("favorites")}
        aria-pressed={filters.favorites}
      >
        Toggle Favorites
      </button>

      <button
        className={`px-4 py-2 rounded ${
          filters.read ? "bg-accent text-text" : "bg-readBackground"
        }`}
        onClick={() => handleFilterChange("read")}
        aria-pressed={filters.read}
      >
        Toggle Read
      </button>

      <button
        className={`px-4 py-2 rounded ${
          filters.unread ? "bg-accent text-white" : "bg-readBackground"
        }`}
        onClick={() => handleFilterChange("unread")}
        aria-pressed={filters.unread}
      >
        Toggle Unread
      </button>

      <button
        className={`px-4 py-2 rounded ${
          isOnHomepage
            ? "bg-accent text-white"
            : "bg-readBackground hover:bg-gray-400 text-text"
        }`}
        onClick={navigateToHomepage}
        aria-current={isOnHomepage ? "page" : undefined}
      >
        {isOnHomepage ? "On the Homepage" : "Go to Homepage"}
      </button>
    </aside>
  );
};

export default Filters;
