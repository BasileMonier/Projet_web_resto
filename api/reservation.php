<?php

// Toujours définir le type de contenu en premier
header('Content-Type: application/json; charset=utf-8');

// Fonction pour renvoyer une réponse JSON et arrêter le script
function repondre($status, $field, $message) {
    echo json_encode([
        'status' => $status,
        'field' => $field,
        'message' => $message
    ]);
    exit;
}

// Vérifier que la méthode est bien POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    repondre('error', 'method', 'Méthode non autorisée');
}

// Récupérer les données du formulaire
$nom        = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$prenom     = isset($_POST['prenom']) ? trim($_POST['prenom']) : '';
$email      = isset($_POST['email']) ? trim($_POST['email']) : '';
$tel        = isset($_POST['tel']) ? trim($_POST['tel']) : '';
$date_resa  = isset($_POST['date_resa']) ? trim($_POST['date_resa']) : '';
$heure_resa = isset($_POST['heure_resa']) ? trim($_POST['heure_resa']) : '';
$nb_personnes = isset($_POST['nb_personnes']) ? intval($_POST['nb_personnes']) : 0;
$message    = isset($_POST['message']) ? trim($_POST['message']) : '';

// ============ VALIDATION ============

// Nom
if (empty($nom)) {
    repondre('error', 'nom', 'Le nom est obligatoire');
}

// Prénom
if (empty($prenom)) {
    repondre('error', 'prenom', 'Le prénom est obligatoire');
}

// Email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    repondre('error', 'email', 'Adresse email invalide');
}

// Téléphone (optionnel, mais si rempli : 10 chiffres)
if (!empty($tel) && !preg_match('/^[0-9]{10}$/', $tel)) {
    repondre('error', 'tel', 'Numéro de téléphone invalide (10 chiffres attendus)');
}

// Date
if (empty($date_resa)) {
    repondre('error', 'date_resa', 'La date est obligatoire');
}

// Vérifier le format Y-m-d
$date_obj = DateTime::createFromFormat('Y-m-d', $date_resa);
if (!$date_obj || $date_obj->format('Y-m-d') !== $date_resa) {
    repondre('error', 'date_resa', 'Format de date invalide (YYYY-MM-DD attendu)');
}

// Vérifier que ce n'est pas un lundi
$jour_semaine = (int)$date_obj->format('N'); // 1 = lundi, 7 = dimanche
if ($jour_semaine === 1) {
    repondre('error', 'date_resa', 'Le restaurant est fermé le lundi');
}

// Vérifier que ce n'est pas dans le passé
$aujourdhui = new DateTime('today');
if ($date_obj < $aujourdhui) {
    repondre('error', 'date_resa', 'La date ne peut pas être dans le passé');
}

// Heure
if (empty($heure_resa)) {
    repondre('error', 'heure_resa', 'L\'heure est obligatoire');
}

// Vérifier le format H:i
$heure_obj = DateTime::createFromFormat('H:i', $heure_resa);
if (!$heure_obj || $heure_obj->format('H:i') !== $heure_resa) {
    repondre('error', 'heure_resa', 'Format d\'heure invalide (HH:MM attendu)');
}

// Nombre de personnes
if ($nb_personnes < 1 || $nb_personnes > 12) {
    repondre('error', 'nb_personnes', 'Le nombre de personnes doit être entre 1 et 12');
}

// ============ SI TOUT EST OK ============

// Sécuriser les données avant insertion (si BDD branchée plus tard)
$nom_secure    = htmlspecialchars($nom);
$prenom_secure = htmlspecialchars($prenom);
$email_secure  = htmlspecialchars($email);
$message_secure = htmlspecialchars($message);

// Ici, si vous branchez la BDD, vous feriez un INSERT avec requête préparée
// Exemple (non exécuté sans connexion BDD) :
// $stmt = $pdo->prepare("INSERT INTO reservations (nom, prenom, email, tel, date_resa, heure_resa, nb_personnes, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
// $stmt->execute([$nom_secure, $prenom_secure, $email_secure, $tel, $date_resa, $heure_resa, $nb_personnes, $message_secure]);

// Réponse succès
$date_formatee = $date_obj->format('d/m/Y');
repondre('ok', '', "Réservation enregistrée pour le $date_formatee à $heure_resa pour $nb_personnes personne(s). À bientôt chez Perla'Bul !");