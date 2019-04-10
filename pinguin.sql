-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 10 avr. 2019 à 12:54
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`Id`, `Id_user`, `Id_event`, `Description`, `Date`) VALUES
(2, 1, 5, 'Kpop ?', '2019-04-04 11:00:00'),
(3, 3, 1, 'Enfants ?', '2019-04-02 00:00:00'),
(4, 1, 2, 'porjazemraziojet', '2019-03-21 08:31:32'),
(5, 2, 5, 'wtf', '2019-04-15 00:00:00'),
(6, 7, 1, 'Bonjour j\'ai un question ?', '2019-04-03 00:00:00'),
(7, 5, 2, 'ghjjk', '2019-04-09 00:00:00');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`Id`, `Date`, `Place`, `Id_nest`, `Nb_people`, `Full`, `Name`, `Description`, `Id_creator`) VALUES
(1, '2019-04-19 00:00:00', 'Place de la bastille', 1, 40, 0, 'Match amical bastille', 'Match pour la révolution', 2),
(2, '2019-03-12 00:00:00', 'dfzfgzrgz', 1, 52, 1, 'fjazfgn', 'greqgrq', 1),
(3, '2019-03-21 12:35:00', 'paris', 1, 120, 0, 'argazelrojapzr', '', 1),
(5, '2019-04-25 00:00:00', 'antarctique', 2, 22, 0, 'Match glacé', 'brrrrr', 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `friendships`
--

INSERT INTO `friendships` (`Id_user_send`, `Id_user_receive`, `Friendship`, `Id`) VALUES
(2, 3, 0, 1),
(7, 8, 1, 2),
(1, 6, 0, 3),
(7, 2, 0, 4),
(4, 5, 0, 5),
(1, 8, 1, 6),
(2, 6, 0, 7);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`Id_send`, `Id_receive`, `Date`, `Description`, `Id`) VALUES
(2, 4, '2019-04-06 00:00:00', 'Faker !', 1),
(6, 1, '2019-03-04 00:00:00', 'azerazgagzga', 2),
(3, 6, '2019-04-03 00:00:00', 'T moche', 3),
(6, 3, '2019-04-03 00:00:00', 'Toi-même', 4),
(7, 8, '2019-04-01 00:00:00', 'slt', 5);

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `nests`
--

INSERT INTO `nests` (`Id`, `Name`) VALUES
(4, 'Cooking'),
(5, 'Culture'),
(2, 'Danse'),
(3, 'Music'),
(1, 'Sport');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`Id`, `Id_user`, `Description`, `Date`, `Id_event`) VALUES
(1, 3, 'BLONDE', '2019-04-11 00:00:00', 5),
(2, 1, 'MOCHE', '1998-03-17 11:00:00', 2),
(3, 6, 'Zgueg', '2019-04-03 00:00:00', 1),
(4, 2, 'Zgueg', '2019-04-11 00:00:00', 1),
(5, 8, 'Random', '2019-04-17 00:00:00', 3);

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
(3, 'Photo', 5, 2, '2019-04-09 00:00:00', 'kek.jpg'),
(4, 'Photo', 1, 2, '1998-03-17 11:00:00', 'undefined'),
(5, 'Video', 6, 2, '2019-04-09 00:00:00', 'topkek.mp4'),
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
  `Address` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Mail` (`Mail`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Firstname`, `Lastname`, `Completename`, `Birthdate`, `Sex`, `Mail`, `Phone`, `Id`, `Rights`, `Password`, `Description`, `Address`) VALUES
('Manu', 'Nguyen', 'Manu Nguyen', '1997-03-14', 0, 'emmanuel.nguyen14@gmail.com', '0620326983', 1, 'admin', '', '', ''),
('Noël', 'Hamel', 'noelhamel', '1997-04-29', 0, 'noel.hamel@edu.ece.fr', '649698423', 2, 'admin', 'ping', 'Roux', ''),
('Dorothée', 'Joséphine', 'Dorojoseph', '1997-01-02', 1, 'dorothee.josephine@edu.ece.fr', '+33698765432', 3, 'admin', 'dsgdhsd', 'Blonde', ''),
('Sovandara', 'CHHIM', 'KlSoven', '1998-03-23', 0, 'soven.chhim@edu.ece.fr', '', 4, 'admin', 'etfyguhij', 'Faker', ''),
('Keerthigan', 'Murugesapilai', 'Kurt', '1997-02-01', 0, 'kurt@edu.ece.fr', '', 5, 'admin', 'tfg', 'gvghbjn', ''),
('Julien', 'Chasport', 'JulienChasport', '2019-03-14', 0, 'julien.chasport@gmail.com', '+33619583722', 6, 'admin', 'aezr', 'zaegazegta', ''),
('user1', '  ', 'user1', '2019-04-02', 1, 'user1@gmai.com', '', 7, 'user', 'gtyhu', '', ''),
('user2', '', 'user2', '2019-04-06', 0, 'user2@gmail.com', '', 8, 'user', 'vgbh', 'vhb jn', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users_in_events`
--

INSERT INTO `users_in_events` (`Id`, `Id_user`, `Id_event`) VALUES
(1, 1, 3),
(2, 2, 1),
(3, 2, 3),
(4, 3, 1),
(6, 5, 5),
(7, 5, 2),
(9, 1, 1),
(10, 6, 3),
(11, 6, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users_in_nests`
--

INSERT INTO `users_in_nests` (`Id_user`, `Id_nest`, `Id`) VALUES
(4, 5, 1),
(2, 5, 2),
(6, 1, 3),
(6, 5, 4),
(1, 3, 6),
(7, 1, 7),
(8, 1, 8);

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
