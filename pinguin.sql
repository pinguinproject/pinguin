-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 18 mars 2019 à 10:47
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pinguin`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Date` datetime NOT NULL,
  `Place` varchar(50) NOT NULL,
  `Id_nest` int(11) NOT NULL,
  `Nb_people` int(11) NOT NULL,
  `Full` tinyint(1) NOT NULL COMMENT '0 = not full, 1 = full',
  `Name` varchar(30) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`),
  KEY `Id_nest` (`Id_nest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `Id_send` int(11) NOT NULL,
  `Id_receive` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Description` text NOT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `nest`
--

DROP TABLE IF EXISTS `nest`;
CREATE TABLE IF NOT EXISTS `nest` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Firstname` varchar(20) NOT NULL,
  `Lastname` varchar(20) NOT NULL,
  `Completename` varchar(50) NOT NULL,
  `Birthdate` date NOT NULL,
  `Sex` tinyint(1) NOT NULL COMMENT '0 = Man, 1 = Woman',
  `Mail` varchar(30) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Mail` (`Mail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Firstname`, `Lastname`, `Completename`, `Birthdate`, `Sex`, `Mail`, `Phone`, `Id`) VALUES
('Manu', 'Nguyen', 'Manu Nguyen', '1997-03-14', 1, 'emmanuel.nguyen14@gmail.com', '0620326983', 1),
('Manu', 'Nguyen', 'Manu Nguyen', '1997-03-14', 1, 'emmanuel.nguyen@gmail.com', '0620326983', 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`Id_nest`) REFERENCES `nest` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
