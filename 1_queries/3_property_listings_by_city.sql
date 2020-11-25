SELECT properties.*, AVG(rating) AS average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE properties.city LIKE '%ancouv%'
AND property_reviews.rating >= 4
AND properties.active IS TRUE
GROUP BY properties.id
ORDER BY average_rating
LIMIT 10;