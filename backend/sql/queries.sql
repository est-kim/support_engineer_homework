-- How many organizations do not have account plans?
SELECT COUNT(*)
FROM organizations o
LEFT JOIN account_plans a ON o.id = a.organizationId
WHERE a.id IS NULL;

-- How many organizations have more than one account plan?
SELECT COUNT(*)
FROM (
    SELECT organizationId, COUNT(*) AS count
    FROM account_plans a
    GROUP BY organizationId
    HAVING COUNT(*) > 1
) AS counts;

-- List all organizations that have only one account plan.
SELECT names.orgName
FROM (
    SELECT organizationId, COUNT(*) AS count
    FROM account_plans
    GROUP BY organizationId
    HAVING COUNT(*) = 1
) AS counts
LEFT JOIN (
    SELECT id, orgName
    FROM organizations
) AS names
ON counts.organizationId = names.id;

-- List all organizations that have the PASSWORDLESS feature set to true.
SELECT DISTINCT(organizationId)
FROM account_plans
WHERE features LIKE '%"PASSWORDLESS": true%';
