import { useState } from "react";

/**
 * Renders a list of organizations with their details.
 *
 * @param {object} accountData - The account data containing organization information.
 * @return {JSX.Element} The organization list component.
 */
function OrganizationList({ accountData }) {
  const [showReport, setShowReport] = useState(false);

  // Sorts the account data by date
  const sortedData = [...accountData].sort((a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    return dateA - dateB;
  });

  // Toggles the visibility of the report
  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  // Returns a table of organizations
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
