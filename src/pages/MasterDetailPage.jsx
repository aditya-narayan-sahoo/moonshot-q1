import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import { useEmailContext } from "../context/EmailContext";

const MasterDetailPage = () => {
  const { selectedEmailId, setSelectedEmailId } = useEmailContext();

  const handleEmailSelect = (emailId) => {
    setSelectedEmailId(emailId);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[40%] bg-background border-r overflow-y-auto">
        <EmailList
          onEmailSelect={handleEmailSelect}
          showToggleReadButton={true}
        />
      </aside>

      <main className="w-[60%] bg-background">
        {selectedEmailId ? (
          <EmailBody emailId={selectedEmailId} />
        ) : (
          <div className="p-4 text-text">
            Select an email to view its details.
          </div>
        )}
      </main>
    </div>
  );
};

export default MasterDetailPage;
