-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 17, 2025 at 01:51 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guitarstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Fender'),
(2, 'Gibson'),
(3, 'Ibanez'),
(4, 'PRS');

-- --------------------------------------------------------

--
-- Table structure for table `guitars`
--

CREATE TABLE `guitars` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guitars`
--

INSERT INTO `guitars` (`id`, `name`, `brand_id`, `image_name`, `user_id`, `description`) VALUES
(1, 'Fender Stratocaster', 1, 'stratocaster.jpg', NULL, 'A classic electric guitar used in many genres.'),
(2, 'Gibson Les Paul', 2, 'lespaul.jpg', NULL, 'A versatile guitar known for its warm, thick tone.'),
(3, 'Ibanez RG', 3, 'ibanez_rg.jpg', NULL, 'A shred-friendly guitar with a sleek, fast neck.'),
(4, 'PRS Custom 24', 4, 'prs_custom24.jpg', NULL, 'A high-end guitar with stunning aesthetics and playability.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'hi@hello.com', '$2b$10$oo5JTQ0GEW8lJEcfvtBK6upvSCIBp9v6f5brlda.MYJNRJ2Bp2fja'),
(3, 'hello@hi.com', '$2b$10$KETHf7FSu2RfOD2zOxghIOKsH8ZCcqhO3nLgNgBEJRLx729L.HSw2'),
(4, 'leil123@hello.com', '$2b$10$Zy7cnc1tkCQgGsfs95IA5OxJSXyusejZXzolBPTVzP5rU9q9DdcuC'),
(7, 'test123@gmail.com', '$2b$10$OZMP5yYbo0BkbmshvfTwserXVhgV6F/JYpVz9eHRzN3LX471ZPKiW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guitars`
--
ALTER TABLE `guitars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `guitar_id` (`brand_id`),
  ADD KEY `guitars_ibfk2` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `guitars`
--
ALTER TABLE `guitars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guitars`
--
ALTER TABLE `guitars`
  ADD CONSTRAINT `guitars_ibfk1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `guitars_ibfk2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
