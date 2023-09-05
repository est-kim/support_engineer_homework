import { useState } from "react";

function CancelledOrganizations({ accountData }) {
  const [showReport, setShowReport] = useState(false);

  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  const cancelledOrganizations = accountData.filter(
    (org) => org.status.toLowerCase().trim() === "cancelled"
  );

  return (
    <div>
      <h1>Cancelled Organizations</h1>
      <button onClick={handleReportClick}>
        {showReport ? "Hide Report" : "Show Report"}
      </button>

      {showReport && (
        <table>
          <thead>
            <tr>
              <th>Organization ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cancelledOrganizations.map((org, index) => {
              return (
                <tr key={index}>
                  <td>{org.organizationId}</td>
                  <td>
                    <span className={`status-${org.status.toLowerCase()}`}>
                      {org.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CancelledOrganizations;
