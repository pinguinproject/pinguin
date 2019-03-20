-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 20 mars 2019 à 13:26
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
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Id_user` int(11) NOT NULL,
  `Id_event` int(11) NOT NULL,
  `Description` text NOT NULL,
  `Date` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `comments_ibfk_1` (`Id_user`),
  KEY `comments_ibfk_2` (`Id_event`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
  `Id_creator` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`),
  KEY `Id_nest` (`Id_nest`),
  KEY `events_ibfk_2` (`Id_creator`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`Id`),
  KEY `messages_ibfk_1` (`Id_send`),
  KEY `messages_ibfk_2` (`Id_receive`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`Id_send`, `Id_receive`, `Date`, `Description`, `Id`) VALUES
(1, 2, '0000-00-00 00:00:00', 'Salut manu cest manu !', 1);

-- --------------------------------------------------------

--
-- Structure de la table `nests`
--

DROP TABLE IF EXISTS `nests`;
CREATE TABLE IF NOT EXISTS `nests` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `nests`
--

INSERT INTO `nests` (`Id`, `Name`) VALUES
(1, 'basketball');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Id_user` int(11) NOT NULL,
  `Description` text NOT NULL,
  `Date` datetime NOT NULL,
  `Id_event` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id_user` (`Id_user`),
  KEY `Id_event` (`Id_event`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` enum('Photo','Video') DEFAULT NULL,
  `Id_user` int(11) NOT NULL,
  `Id_event` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Url` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `post_ibfk_1` (`Id_user`),
  KEY `post_ibfk_2` (`Id_event`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
  `Rights` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Mail` (`Mail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Firstname`, `Lastname`, `Completename`, `Birthdate`, `Sex`, `Mail`, `Phone`, `Id`, `Rights`) VALUES
('Manu', 'Nguyen', 'Manu Nguyen', '1997-03-14', 0, 'emmanuel.nguyen14@gmail.com', '0620326983', 1, 'admin'),
('Manu', 'Nguyen', 'Manu Nguyen', '1997-03-14', 0, 'emmanuel.nguyen@gmail.com', '0620326983', 2, 'user');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`Id_nest`) REFERENCES `nests` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`Id_creator`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`Id_send`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`Id_receive`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
