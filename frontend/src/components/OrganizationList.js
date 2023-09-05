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
    <div>
      <h1>Organization List</h1>
      <button onClick={handleReportClick}>
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
              const formattedDate = `${date
                .getDate()
                .toString()
                .padStart(2, "0")}/${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}/${date.getFullYear()}`;
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
