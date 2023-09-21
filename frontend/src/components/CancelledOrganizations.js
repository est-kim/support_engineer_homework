import { useState } from "react";

/**
 * Renders a component that displays a list of cancelled organizations.
 *
 * @param {Object} accountData - The account data containing information about organizations.
 * @return {JSX.Element} The JSX element representing the component which is a table of cancelled organizations.
 */
function CancelledOrganizations({ accountData }) {
  const [showReport, setShowReport] = useState(false);

  // Toggles the visibility of the report
  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  // Filters for cancelled organizations
  const cancelledOrganizations = accountData.filter(
    (org) => org.status.trim().toLowerCase() === "cancelled"
  );

  // Returns a table of cancelled organizations
  return (
    <div className="div-container">
      <h1 className="gradient-h1">Cancelled Organizations</h1>
      <button className="button-style" onClick={handleReportClick}>
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
