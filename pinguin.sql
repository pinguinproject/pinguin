-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 21 mars 2019 à 11:39
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`Id`, `Date`, `Place`, `Id_nest`, `Nb_people`, `Full`, `Name`, `Description`, `Id_creator`) VALUES
(2, '2019-03-12 00:00:00', 'dfzfgzrgz', 1, 52, 1, 'fjazfgn', 'greqgrq', 1);

-- --------------------------------------------------------

--
-- Structure de la table `friendships`
--

DROP TABLE IF EXISTS `friendships`;
CREATE TABLE IF NOT EXISTS `friendships` (
  `Id_user_send` int(11) NOT NULL,
  `Id_user_receive` int(11) NOT NULL,
  `Friendship` tinyint(1) NOT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  KEY `Id_user_receive` (`Id_user_receive`),
  KEY `Id_user_send` (`Id_user_send`)
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
  PRIMARY KEY (`Id`),
  KEY `messages_ibfk_1` (`Id_send`),
  KEY `messages_ibfk_2` (`Id_receive`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`Id`, `Id_user`, `Description`, `Date`, `Id_event`) VALUES
(2, 1, 'MOCHE', '1998-03-17 11:00:00', 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`Id`, `Type`, `Id_user`, `Id_event`, `Date`, `Url`) VALUES
(4, 'Photo', 1, 2, '1998-03-17 11:00:00', 'undefined'),
(6, 'Photo', 1, 2, '1998-03-17 11:00:00', 'undefined'),
(9, 'Video', 1, 2, '1998-03-17 11:00:00', 'xd');

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
  `Password` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Mail` (`Mail`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Firstname`, `Lastname`, `Completename`, `Birthdate`, `Sex`, `Mail`, `Phone`, `Id`, `Rights`, `Password`, `Description`) VALUES
('Manu', 'Nguyen', 'Manu Nguyen', '1997-03-14', 0, 'emmanuel.nguyen14@gmail.com', '0620326983', 1, 'admin', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `users_in_events`
--

DROP TABLE IF EXISTS `users_in_events`;
CREATE TABLE IF NOT EXISTS `users_in_events` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Id_user` int(11) NOT NULL,
  `Id_event` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id_event` (`Id_event`),
  KEY `Id_user` (`Id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users_in_nests`
--

DROP TABLE IF EXISTS `users_in_nests`;
CREATE TABLE IF NOT EXISTS `users_in_nests` (
  `Id_user` int(11) NOT NULL,
  `Id_nest` int(11) NOT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  KEY `Id_nest` (`Id_nest`),
  KEY `Id_user` (`Id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users_in_nests`
--

INSERT INTO `users_in_nests` (`Id_user`, `Id_nest`, `Id`) VALUES
(1, 1, 1);

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
-- Contraintes pour la table `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `friendships_ibfk_1` FOREIGN KEY (`Id_user_receive`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `friendships_ibfk_2` FOREIGN KEY (`Id_user_send`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

--
-- Contraintes pour la table `users_in_events`
--
ALTER TABLE `users_in_events`
  ADD CONSTRAINT `users_in_events_ibfk_1` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_in_events_ibfk_2` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users_in_nests`
--
ALTER TABLE `users_in_nests`
  ADD CONSTRAINT `users_in_nests_ibfk_1` FOREIGN KEY (`Id_nest`) REFERENCES `nests` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_in_nests_ibfk_2` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
