import { useEffect, useState } from "react";
import { useEmailContext } from "../context/EmailContext";
import { formatDateTime } from "../utils/dateFormatter";

const EmailBody = ({ emailId }) => {
  const { emails, toggleFavorite } = useEmailContext();
  const [email, setEmail] = useState(null);
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedEmail = emails.find((email) => email.id === emailId);
    setEmail(selectedEmail);

    const fetchEmailBody = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://flipkart-email-mock.vercel.app/?id=${emailId}`
        );
        const data = await response.json();
        setEmailBody(data.body);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch email body:", err);
        setError("Failed to load email body.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailBody();
  }, [emailId, emails]);

  const handleFavoriteToggle = () => {
    toggleFavorite(emailId);
  };

  if (!email) {
    return <div className="p-4 text-text">Email not found</div>;
  }

  return (
    <div className="m-4 rounded p-4 bg-white">
      <h2 className="text-2xl font-bold">{email.subject}</h2>
      <p className="text-xs text-text">
        {formatDateTime(new Date(email.date))}
      </p>

      {loading ? (
        <div className="mt-4 text-text">Loading email body...</div>
      ) : error ? (
        <div className="mt-4 text-accent">{error}</div>
      ) : (
        <div
          className="mt-4 prose"
          dangerouslySetInnerHTML={{ __html: emailBody }}
        />
      )}

      <button
        onClick={handleFavoriteToggle}
        className={`mt-4 p-2 ${
          email.isFavorite ? "text-yellow-500" : "text-text"
        }`}
      >
        {email.isFavorite ? "★ Marked as Favorite" : "☆ Mark as Favorite"}
      </button>
    </div>
  );
};

export default EmailBody;
