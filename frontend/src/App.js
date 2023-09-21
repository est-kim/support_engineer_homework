import { useEffect, useState } from "react";
import "./App.css";
import OptimizationSettings from "./components/OptimizationSettings";
import OrganizationList from "./components/OrganizationList";
import CancelledOrganizations from "./components/CancelledOrganizations";
import OrganizationDetails from "./components/OrganizationDetails";

function App() {
  const [organizationData, setOrganizationData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Asynchronous function to fetch data
    const fetchData = async () => {
      // Fetch organization data
      const response1 = await fetch("/api/organizationData");
      // Check if request was successful
      if (response1.ok) {
        // Parse JSON and update state
        const orgData = await response1.json();
        setOrganizationData(orgData);
      }

      // Fetch account data
      const response2 = await fetch("/api/accountData");
      // Check if request was successful
      if (response2.ok) {
        // Parse JSON and update state
        const accData = await response2.json();
        setAccountData(accData);
      }
    };
    // Call fetchData function
    fetchData();
  }, []);

  // Function to handle 'Enter' key press
  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  // Renders the App component
  return (
    <div className="app-container">
      <OptimizationSettings
        organizationData={organizationData}
        handleKeyDown={handleKeyDown}
      />
      <OrganizationList accountData={accountData} />
      <CancelledOrganizations accountData={accountData} />
      <OrganizationDetails
        organizationData={organizationData}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;
