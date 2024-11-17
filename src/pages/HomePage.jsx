import EmailList from "../components/EmailList";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <EmailList />
      </div>
    </div>
  );
};

export default HomePage;
