import { useState } from "react";

/**
 * Renders the organization details component.
 *
 * @param {object} organizationData - The data containing information about organizations.
 * @param {function} handleKeyDown - The event handler for keydown events.
 * @return {JSX.Element} The rendered organization details component.
 */
function OrgDetails({ organizationData, handleKeyDown }) {
  const [orgNameInput, setOrgNameInput] = useState("");
  const [orgDetails, setOrgDetails] = useState(null);
  const [searchResult, setSearchResult] = useState(false);

  // Finds the organization details for a given orgName
  const findOrgDetails = () => {
    setSearchResult(true);
    const foundOrg = organizationData.find(
      (org) =>
        org.orgName.trim().toLowerCase() === orgNameInput.trim().toLowerCase()
    );
    if (foundOrg) {
      setOrgDetails(foundOrg);
    } else {
      setOrgDetails(null);
      console.warn("Organization not found in database: ", orgNameInput);
    }
  };

  // Returns the organization details for a given orgName
  return (
    <div className="div-container">
      <h1 className="gradient-h1">Find Organization Details</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter orgName"
        value={orgNameInput}
        onChange={(e) => setOrgNameInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, findOrgDetails)}
      />
      <button className="button-style" onClick={findOrgDetails}>Search</button>

      {orgDetails ? (
        <div>
          <pre className="json-box">{JSON.stringify(orgDetails, null, 2)}</pre>
        </div>
      ) : (
        <>
          {searchResult && (
            <p>No details found for the entered organization name.</p>
          )}
          <p>
            Please enter a valid and/or existing organization name. Example:
            test account 1
          </p>
        </>
      )}
    </div>
  );
}

export default OrgDetails;
