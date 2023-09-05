import { useState } from "react";

function OptimizationSettings({ organizationData, handleKeyDown }) {
  const [domainInput, setDomainInput] = useState("");
  const [optimizationSettings, setOptimizationSettings] = useState(null);
  const [searchResult, setSearchResult] = useState(false);

  const findOptimizationSettings = () => {
    setSearchResult(true);
    const org = organizationData.find(
      (org) => org.myShopifyDomain.trim() === domainInput.trim()
    );

    if (org) {
      if (org.setup && org.setup.optimization) {
        setOptimizationSettings(org.setup.optimization);
      }
    } else {
      setOptimizationSettings(null);
      console.warn("Organization not found for domain: ", domainInput);
    }
  };

  return (
    <div className="div-container">
      <h1 className="gradient-h1">Optimization Settings</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter myShopifyDomain"
        value={domainInput}
        onChange={(e) => setDomainInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, findOptimizationSettings)}
      />
      <button className="button-style" onClick={findOptimizationSettings}>
        Search
      </button>

      {optimizationSettings ? (
        <div>
          <pre className="json-box">{JSON.stringify(optimizationSettings, null, 2)}</pre>
        </div>
      ) : (
        <>
          {searchResult && (
            <p>No optimization settings found for the entered domain.</p>
          )}
          <p>
            Please enter a valid and/or existing domain. Example:
            test-account-1.myshopify.com
          </p>
        </>
      )}
    </div>
  );
}

export default OptimizationSettings;
