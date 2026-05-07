CREATE DATABASE IF NOT EXISTS bistrot_perlabul;
USE bistrot_perlabul;

-- Table des plats (menu)
CREATE TABLE plats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    prix DECIMAL(5,2) NOT NULL,
    categorie ENUM('entrée', 'plat', 'dessert', 'boisson') NOT NULL,
    vegetarien BOOLEAN DEFAULT FALSE,
    sans_gluten BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tel VARCHAR(20),
    date_resa DATE NOT NULL,
    heure_resa TIME NOT NULL,
    nb_personnes INT NOT NULL CHECK (nb_personnes BETWEEN 1 AND 12),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des contacts
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);