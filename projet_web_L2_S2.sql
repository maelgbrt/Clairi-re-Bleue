-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb
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


-- --------------------------------------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `activites` (`prix`, `date_d`, `date_f`, `id`, `nom`, `cap_act`, `description`, `lieu`, `id_animateur`) VALUES
(35, '2026-05-08 00:00:00', '2026-05-08 00:00:00', 65, 'AquaSplash', 20, 'description', 'Areches', 56);

--
-- Déchargement des données de la table `activites`
--

INSERT INTO `activites` (`prix`, `date_d`, `date_f`, `id`, `nom`, `cap_act`, `description`, `lieu`, `id_animateur`) VALUES
(40, '2026-05-21 09:45:00', '2026-05-21 11:00:00', 1, 'Acrobranche', 20, 'Parcours acrobranche', 'camping la clairiere bleue', 5),
(50, '2026-05-30 11:00:00', '2026-05-30 15:40:00', 2, 'Barbecue', 12, 'Repas barbecue en plein air', 'Camping la Clairiere bleue', 5),
(15, '2026-05-23 15:00:00', '2026-05-23 16:00:00', 4, 'canoe', 8, 'Canoe sur le Lac Serpentin.', 'Camping la clairiere bleue', 5),
(100, '2026-05-20 14:00:00', '2026-05-20 16:00:00', 6, 'VTT électrique', 4, 'Parcours dans la forêt en vtt à assistance électrique.', 'Départ à l\'accueil du camping de la clairiere bleue.', 5),
(25, '2026-05-24 14:30:00', '2026-05-24 17:30:00', 66, 'Randonnée', 20, 'Randonnée en pleine nature aux alentours du lac Serpentin.', 'Lac Serpentin', 5);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `emplacements`;
CREATE TABLE `emplacements` (
  `num_emplacement` int(11) NOT NULL,
  `capacite` int(11) NOT NULL,
  `prix` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

DROP TABLE IF EXISTS `equipe_technique`;
CREATE TABLE `equipe_technique` (
  `id_equipe_tech` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `equipe_technique` (`id_equipe_tech`, `nom`, `prenom`, `mail`, `password`, `access`) VALUES
(5, 'Gaborit', 'François', 'admin@mail.fr', '$2y$10$F3fJ/FNN/qkIT045OHMbpuo/VOwpOdeFUyBqaAGvMC/MXeMnEwgeK', 1),
(56, 'Gaborit', 'Telio', 'equipe@mail.fr', '$2y$10$F3fJ/FNN/qkIT045OHMbpuo/VOwpOdeFUyBqaAGvMC/MXeMnEwgeK', 2);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `familles`;
CREATE TABLE `familles` (
  `id_famille` int(11) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `telephone` int(11) NOT NULL,
  `code_postal` int(11) NOT NULL,
  `id_payeur` int(11) DEFAULT NULL,
  `ville` varchar(50) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expiration` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `familles` (`id_famille`, `mail`, `password`, `adresse`, `telephone`, `code_postal`, `id_payeur`, `ville`, `token`, `token_expiration`) VALUES
(66, 'maelgaborit1407@gmail.com', '$2y$10$W3mXBT1syk461evhwWHA8uJmTtotMm.8G6nLpI27L8GO6W.uXg7mO', '260 route de Coutalon Areches', 768680116, 73270, 119, 'Areches', NULL, NULL),
(67, 'teliogaborit@gmail.com', '$2y$10$W3mXBT1syk461evhwWHA8uJmTtotMm.8G6nLpI27L8GO6W.uXg7mO', '955 Rte de l\'École du Tremblay', 768680116, 73290, 122, 'LA MOTTE SERVOLEX', '', '0000-00-00 00:00:00'),
(69, 'telio@gmail.com', '$2y$10$ENhS7vlszs7Y0HV5nmwT/ONpHKH.yd/j5RgGmBDFTqbf/K0p5341W', '260 route de Coutalon Areches', 768680116, 73270, 122, 'Areches', '', '0000-00-00 00:00:00'),
(73, 'gaboritvincent@yahoo.fr', '$2y$10$s0kFGtVV6PtT8FxSd8kOKOvU.hW3rG3UCN9GhPHCz7YOZh4vs/MAm', 'Areches', 0, 73270, 126, '', '', '0000-00-00 00:00:00'),
(74, 'user@mail.fr', '$2y$10$tF8Mq8kn7Cwq7ptYbV8yA.WIyDTGWjzDZ0j.yT8Aa1mTJ/as9sfuO', 'deparlabas', 77777777, 73270, 139, 'Areches', NULL, NULL);

-- --------------------------------------------------------

DROP TABLE IF EXISTS `file_attente_activites`;
CREATE TABLE `file_attente_activites` (
  `id_famille` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `nb_membre` int(11) NOT NULL,
  `date_inscription` datetime NOT NULL DEFAULT current_timestamp(),
  `id_attente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `file_attente_emplacements`;
CREATE TABLE `file_attente_emplacements` (
  `id_famille` int(11) NOT NULL,
  `id_emplacement` int(11) NOT NULL,
  `date_debut` int(11) NOT NULL,
  `date_fin` int(11) NOT NULL,
  `id_fifo_emplacement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `objet` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `reservation_activites`;
CREATE TABLE `reservation_activites` (
  `id_famille` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `id_reservation_activite` int(11) NOT NULL,
  `nb_membre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `reservation_emplacement`;
CREATE TABLE `reservation_emplacement` (
  `id_famille` int(11) NOT NULL,
  `num_emplacement` int(11) NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `id_res_empl` int(11) NOT NULL,
  `nb_membre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `id_famille` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `date_naissance`, `id_famille`) VALUES
(120, 'Gaborit', 'Telio', '2001-12-05', 66),
(122, 'Gaborit', 'Telio', '2026-04-03', 69),
(126, 'Gaborit', 'Vincent', '2026-04-16', 73),
(128, 'Gaborit', 'Francis', '2026-05-22', NULL),
(129, 'dd', 'mar', '2026-05-13', NULL),
(130, 'dq', 'mm', '2026-05-27', NULL),
(138, 'Gaborit', 'Herve', '2026-05-22', 66),
(139, 'user', 'user', '2026-05-07', 74);

--
-- Index
--

ALTER TABLE `activites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equie_tech_activite` (`id_animateur`);

ALTER TABLE `emplacements`
  ADD PRIMARY KEY (`num_emplacement`);

ALTER TABLE `equipe_technique`
  ADD PRIMARY KEY (`id_equipe_tech`);

ALTER TABLE `familles`
  ADD PRIMARY KEY (`id_famille`),
  ADD KEY `FK_id_payeur` (`id_payeur`);

ALTER TABLE `file_attente_activites`
  ADD PRIMARY KEY (`id_attente`),
  ADD KEY `fk_id_fifo_famille` (`id_famille`),
  ADD KEY `fk_fifo_activite` (`id_activite`);

ALTER TABLE `file_attente_emplacements`
  ADD PRIMARY KEY (`id_fifo_emplacement`);

ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `reservation_activites`
  ADD PRIMARY KEY (`id_reservation_activite`),
  ADD KEY `FK_ID_ACTIVITE` (`id_activite`),
  ADD KEY `FK_famille_activite` (`id_famille`);

ALTER TABLE `reservation_emplacement`
  ADD PRIMARY KEY (`id_res_empl`),
  ADD KEY `FK_Id_famille_res_emplacement` (`id_famille`),
  ADD KEY `FK_numEmplacement` (`num_emplacement`);

ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Id_famille` (`id_famille`);

--
-- AUTO_INCREMENT
--

ALTER TABLE `activites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

ALTER TABLE `equipe_technique`
  MODIFY `id_equipe_tech` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

ALTER TABLE `familles`
  MODIFY `id_famille` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

ALTER TABLE `file_attente_activites`
  MODIFY `id_attente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

ALTER TABLE `file_attente_emplacements`
  MODIFY `id_fifo_emplacement` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `reservation_activites`
  MODIFY `id_reservation_activite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

ALTER TABLE `reservation_emplacement`
  MODIFY `id_res_empl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- Contraintes
--

ALTER TABLE `activites`
  ADD CONSTRAINT `equie_tech_activite` FOREIGN KEY (`id_animateur`) REFERENCES `equipe_technique` (`id_equipe_tech`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `reservation_activites`
  ADD CONSTRAINT `fk_activite_resa` FOREIGN KEY (`id_activite`) REFERENCES `activites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_famille_resa` FOREIGN KEY (`id_famille`) REFERENCES `familles` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `reservation_emplacement`
  ADD CONSTRAINT `famille_emplacement` FOREIGN KEY (`id_famille`) REFERENCES `familles` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `membre_famille` FOREIGN KEY (`id_famille`) REFERENCES `familles` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
