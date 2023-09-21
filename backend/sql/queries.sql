-- How many organizations do not have account plans?
SELECT COUNT(*)
FROM organizations o
LEFT JOIN account_plans a ON o.id = a.organizationId
WHERE a.id IS NULL;

-- How many organizations have more than one account plan?
SELECT COUNT(*)
FROM (
    SELECT a.organizationId
    FROM account_plans a
    GROUP BY a.organizationId
    HAVING COUNT(*) > 1
) AS counts;

-- List all organizations that have only one account plan.
SELECT o.orgName, o.id
FROM organizations as o
JOIN account_plans as a ON o.id = a.organizationId
GROUP BY o.id
HAVING COUNT(a.id) = 1

-- List all organizations that have the PASSWORDLESS feature set to true.
SELECT DISTINCT(organizationId)
FROM account_plans
WHERE features LIKE '%"PASSWORDLESS": true%';
