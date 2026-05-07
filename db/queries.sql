-- 1. Tous les plats végétariens (entrées + plats)
SELECT nom, description, prix, categorie
FROM plats
WHERE vegetarien = TRUE AND categorie IN ('entrée', 'plat')
ORDER BY categorie, prix;

-- 2. Réservations à venir cette semaine
SELECT nom, prenom, date_resa, heure_resa, nb_personnes
FROM reservations
WHERE date_resa BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
ORDER BY date_resa, heure_resa;

-- 3. Nombre de réservations par jour
SELECT date_resa, COUNT(*) AS nb_reservations
FROM reservations
GROUP BY date_resa
ORDER BY date_resa;