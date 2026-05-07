-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb
-- Généré le : jeu. 07 mai 2026 à 12:39
-- Version du serveur : 12.2.2-MariaDB-ubu2404
-- Version de PHP : 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_web_L2_S2`
--
CREATE DATABASE IF NOT EXISTS `projet_web_L2_S2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;
USE `projet_web_L2_S2`;

-- --------------------------------------------------------

--
-- Structure de la table `activites`
--

DROP TABLE IF EXISTS `activites`;
CREATE TABLE `activites` (
  `prix` int(11) NOT NULL,
  `date_d` datetime NOT NULL,
  `date_f` datetime NOT NULL,
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `cap_act` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `lieu` varchar(100) DEFAULT NULL,
  `id_animateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `emplacements`
--

DROP TABLE IF EXISTS `emplacements`;
CREATE TABLE `emplacements` (
  `num_emplacement` int(11) NOT NULL,
  `capacite` int(11) NOT NULL,
  `prix` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `emplacements`
--

INSERT INTO `emplacements` (`num_emplacement`, `capacite`, `prix`, `nom`) VALUES
(1, 4, 45, 'Neptune'),
(2, 2, 30, 'Mars'),
(3, 6, 75, 'Pluton'),
(4, 4, 50, 'Uranus'),
(5, 8, 120, 'Terre'),
(6, 2, 35, 'Saturne'),
(7, 4, 45, 'Mercure'),
(8, 6, 80, 'Venus'),
(9, 2, 30, 'Jupiter'),
(10, 4, 55, 'Eris'),
(11, 4, 55, 'Ganymède'),
(12, 6, 90, 'Hauméa'),
(13, 8, 130, 'Cérès'),
(14, 2, 40, 'Makémaké'),
(15, 4, 60, 'Titan');

-- --------------------------------------------------------

--
-- Structure de la table `equipe_technique`
--

DROP TABLE IF EXISTS `equipe_technique`;
CREATE TABLE `equipe_technique` (
  `id_equipe_tech` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `equipe_technique`
--

INSERT INTO `equipe_technique` (`id_equipe_tech`, `nom`, `prenom`, `mail`, `password`, `access`) VALUES
(1, 'Gaborit', 'François', 'mailtest@gmail.com', '$2y$10$F3fJ/FNN/qkIT045OHMbpuo/VOwpOdeFUyBqaAGvMC/MXeMnEwgeK', 1);

-- --------------------------------------------------------

--
-- Structure de la table `familles`
--

DROP TABLE IF EXISTS `familles`;
CREATE TABLE `familles` (
  `id_famille` int(11) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `telephone` int(11) NOT NULL,
  `code_postal` int(11) NOT NULL,
  `id_payeur` int(11) DEFAULT NULL,
  `ville` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `familles`
--

INSERT INTO `familles` (`id_famille`, `mail`, `password`, `adresse`, `telephone`, `code_postal`, `id_payeur`, `ville`) VALUES
(66, 'maelgaborit1407@gmail.com', '$2y$10$W3mXBT1syk461evhwWHA8uJmTtotMm.8G6nLpI27L8GO6W.uXg7mO', '260 route de Coutalon Areches', 768680116, 73270, 119, 'Areches'),
(67, 'teliogaborit@gmail.com', '$2y$10$W3mXBT1syk461evhwWHA8uJmTtotMm.8G6nLpI27L8GO6W.uXg7mO', '955 Rte de l\'École du Tremblay', 768680116, 73290, 122, 'LA MOTTE SERVOLEX'),
(69, 'telio@gmail.com', '$2y$10$ENhS7vlszs7Y0HV5nmwT/ONpHKH.yd/j5RgGmBDFTqbf/K0p5341W', '260 route de Coutalon Areches', 768680116, 73270, 122, 'Areches'),
(70, 'mail@mail.fr', '$2y$10$hGgVqcbJ187Me69EBN4xNObPU0a0u2yIsQN2JeNicSrO516Qn.pDm', '260 route du chemin', 7, 7270, 123, 'Areches'),
(73, 'gaboritvincent@yahoo.fr', '$2y$10$s0kFGtVV6PtT8FxSd8kOKOvU.hW3rG3UCN9GhPHCz7YOZh4vs/MAm', 'Areches', 0, 73270, 126, '');

-- --------------------------------------------------------

--
-- Structure de la table `file_attente_activites`
--

DROP TABLE IF EXISTS `file_attente_activites`;
CREATE TABLE `file_attente_activites` (
  `id_famille` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `nb_membre` int(11) NOT NULL,
  `date_inscription` datetime NOT NULL,
  `id_attente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `file_attente_emplacements`
--

DROP TABLE IF EXISTS `file_attente_emplacements`;
CREATE TABLE `file_attente_emplacements` (
  `id_famille` int(11) NOT NULL,
  `id_emplacement` int(11) NOT NULL,
  `date_debut` int(11) NOT NULL,
  `date_fin` int(11) NOT NULL,
  `id_fifo_emplacement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `objet` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservation_activites`
--

DROP TABLE IF EXISTS `reservation_activites`;
CREATE TABLE `reservation_activites` (
  `id_famille` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `id_reservation_activite` int(11) NOT NULL,
  `nb_membre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservation_emplacement`
--

DROP TABLE IF EXISTS `reservation_emplacement`;
CREATE TABLE `reservation_emplacement` (
  `id_famille` int(11) NOT NULL,
  `num_emplacement` int(11) NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `id_res_empl` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `id_famille` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `date_naissance`, `id_famille`) VALUES
(119, 'Gabori', 'Maël', '2006-07-14', 66),
(120, 'Gaborit', 'Telio', '2001-12-05', 67),
(122, 'Gaborit', 'Telio', '2026-04-03', 69),
(123, 'Gaborit', 'Greg', '2006-07-14', 70),
(126, 'Gaborit', 'Vincent', '2026-04-16', 73);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activites`
--
ALTER TABLE `activites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equie_tech_activite` (`id_animateur`);

--
-- Index pour la table `emplacements`
--
ALTER TABLE `emplacements`
  ADD PRIMARY KEY (`num_emplacement`);

--
-- Index pour la table `equipe_technique`
--
ALTER TABLE `equipe_technique`
  ADD PRIMARY KEY (`id_equipe_tech`);

--
-- Index pour la table `familles`
--
ALTER TABLE `familles`
  ADD PRIMARY KEY (`id_famille`),
  ADD KEY `FK_id_payeur` (`id_payeur`);

--
-- Index pour la table `file_attente_activites`
--
ALTER TABLE `file_attente_activites`
  ADD PRIMARY KEY (`id_attente`),
  ADD KEY `fk_id_fifo_famille` (`id_famille`),
  ADD KEY `fk_fifo_activite` (`id_activite`);

--
-- Index pour la table `file_attente_emplacements`
--
ALTER TABLE `file_attente_emplacements`
  ADD PRIMARY KEY (`id_fifo_emplacement`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation_activites`
--
ALTER TABLE `reservation_activites`
  ADD PRIMARY KEY (`id_reservation_activite`),
  ADD KEY `FK_ID_ACTIVITE` (`id_activite`),
  ADD KEY `FK_famille_activite` (`id_famille`);

--
-- Index pour la table `reservation_emplacement`
--
ALTER TABLE `reservation_emplacement`
  ADD PRIMARY KEY (`id_res_empl`),
  ADD KEY `FK_Id_famille_res_emplacement` (`id_famille`),
  ADD KEY `FK_numEmplacement` (`num_emplacement`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Id_famille` (`id_famille`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activites`
--
ALTER TABLE `activites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `equipe_technique`
--
ALTER TABLE `equipe_technique`
  MODIFY `id_equipe_tech` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `familles`
--
ALTER TABLE `familles`
  MODIFY `id_famille` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `file_attente_activites`
--
ALTER TABLE `file_attente_activites`
  MODIFY `id_attente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `file_attente_emplacements`
--
ALTER TABLE `file_attente_emplacements`
  MODIFY `id_fifo_emplacement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `reservation_activites`
--
ALTER TABLE `reservation_activites`
  MODIFY `id_reservation_activite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `reservation_emplacement`
--
ALTER TABLE `reservation_emplacement`
  MODIFY `id_res_empl` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `activites`
--
ALTER TABLE `activites`
  ADD CONSTRAINT `equie_tech_activite` FOREIGN KEY (`id_animateur`) REFERENCES `equipe_technique` (`id_equipe_tech`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reservation_activites`
--
ALTER TABLE `reservation_activites`
  ADD CONSTRAINT `fk_activite_resa` FOREIGN KEY (`id_activite`) REFERENCES `activites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_famille_resa` FOREIGN KEY (`id_famille`) REFERENCES `familles` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reservation_emplacement`
--
ALTER TABLE `reservation_emplacement`
  ADD CONSTRAINT `famille_emplacement` FOREIGN KEY (`id_famille`) REFERENCES `familles` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `membre_famille` FOREIGN KEY (`id_famille`) REFERENCES `familles` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
