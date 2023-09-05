import { useEffect, useState } from "react";
import "./App.css";
import OptimizationSettings from "./components/OptimizationSettings";
import OrganizationList from "./components/OrganizationList";
import CancelledOrganizations from "./components/CancelledOrganizations";
import OrganizationDetails from "./components/OrganizationDetails";

function App() {
  const [organizationData, setOrganizationData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await fetch("/api/organizationData");
      if (response1.ok) {
        const orgData = await response1.json();
        setOrganizationData(orgData);
      }

      const response2 = await fetch("/api/accountData");
      if (response2.ok) {
        const accData = await response2.json();
        setAccountData(accData);
      }
    };
    fetchData();
  }, []);

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter") callback();
  };

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
