import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailListItem from "./EmailListItem";
import { useEmailContext } from "../context/EmailContext";

const EmailList = ({ onEmailSelect, showToggleReadButton = false }) => {
  const {
    emails,
    loading,
    error,
    fetchEmails,
    totalPages,
    setSelectedEmailId,
  } = useEmailContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEmails(currentPage);
  }, [currentPage, fetchEmails]);

  const handleSelect = (emailId) => {
    setSelectedEmailId(emailId);
    onEmailSelect?.(emailId);
    navigate(`/email/${emailId}`);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="p-4 text-text">Loading emails...</div>;
  }

  if (error) {
    return <div className="p-4 text-accent">{error}</div>;
  }

  return (
    <main>
      <section>
        <ul className="divide-y divide-filterBtn" role="list">
          {emails.length === 0 ? (
            <li className="p-4 text-text" role="listitem">
              No emails available.
            </li>
          ) : (
            emails.map((email) => (
              <li key={email.id} className="p-4" role="listitem">
                <EmailListItem
                  email={email}
                  isSelected={false}
                  onEmailSelect={handleSelect}
                  showToggleReadButton={showToggleReadButton}
                />
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Pagination Controls */}
      <nav aria-label="Email pagination" className="flex justify-between p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm rounded ${
            currentPage === 1
              ? "bg-background text-text cursor-not-allowed"
              : "bg-accent text-filterBtn"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm rounded ${
            currentPage === totalPages
              ? "bg-background text-text cursor-not-allowed"
              : "bg-accent text-filterBtn"
          }`}
        >
          Next
        </button>
      </nav>
    </main>
  );
};

export default EmailList;
