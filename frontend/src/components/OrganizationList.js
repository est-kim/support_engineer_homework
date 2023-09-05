import { useState } from "react";

function OrganizationList({ accountData }) {
  const [showReport, setShowReport] = useState(false);

  const sortedData = [...accountData].sort((a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    return dateA - dateB;
  });

  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  return (
    <div className="div-container">
      <h1 className="gradient-h1">Organization List</h1>
      <button className="button-style" onClick={handleReportClick}>
        {showReport ? "Hide Report" : "Show Report"}
      </button>
      
      {showReport && (
        <table>
          <thead>
            <tr>
              <th>Organization ID</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>Plan Type</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((org, index) => {
              const date = new Date(org.createdDate);
              const day = date.getDate().toString().padStart(2, "0");
              const month = (date.getMonth() + 1).toString().padStart(2, "0");
              const year = date.getFullYear();
              const formattedDate = `${day}/${month}/${year}`;

              return (
                <tr key={index}>
                  <td>{org.organizationId}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <span className={`status-${org.status.toLowerCase()}`}>
                      {org.status}
                    </span>
                  </td>
                  <td>{org.planName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrganizationList;
