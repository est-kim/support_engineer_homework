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
    fetch("/api/organizationData")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched organizationData:", data);
        setOrganizationData(data);
      });

    fetch("/api/accountData")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched accountData:", data);
        setAccountData(data);
      });
  }, []);

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  return (
    <div>
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
