import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchEmails } from "../utils/emailService";

const EmailContext = createContext();

export const useEmailContext = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    favorites: false,
    read: false,
    unread: false,
  });
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  // Load emails from localStorage if available
  const loadEmailsFromStorage = () => {
    const storedEmails = JSON.parse(localStorage.getItem("emails"));
    return storedEmails || [];
  };
  // Save emails to localStorage
  const saveEmailsToStorage = (updatedEmails) => {
    localStorage.setItem("emails", JSON.stringify(updatedEmails));
  };

  const loadEmails = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const data = await fetchEmails(page);

      // Merge API data with persisted data from localStorage
      const storedEmails = loadEmailsFromStorage();
      const updatedEmails = data.list.map((email) => {
        const storedEmail = storedEmails.find((e) => e.id === email.id);
        return storedEmail ? { ...email, ...storedEmail } : email;
      });

      setEmails(updatedEmails);
      setTotalPages(data.totalPages || 2);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load emails.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmails(1);
  }, [loadEmails]);

  // Apply filters to emails
  const filteredEmails = emails.filter((email) => {
    if (email.id === selectedEmailId) return true;
    if (filters.favorites && !email.isFavorite) return false;
    if (filters.read && !email.isRead) return false;
    if (filters.unread && email.isRead) return false;
    return true;
  });

  const toggleFavorite = (id) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
    );
    setEmails(updatedEmails);
    saveEmailsToStorage(updatedEmails);
  };

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, isRead: !email.isRead } : email
    );
    setEmails(updatedEmails);
    saveEmailsToStorage(updatedEmails);
  };

  return (
    <EmailContext.Provider
      value={{
        emails: filteredEmails,
        loading,
        error,
        totalPages,
        currentPage,
        fetchEmails: loadEmails,
        toggleFavorite,
        toggleRead,
        setFilters,
        filters,
        selectedEmailId,
        setSelectedEmailId,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
