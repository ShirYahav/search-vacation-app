-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2022 at 09:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookingproject3`
--
CREATE DATABASE IF NOT EXISTS `bookingproject3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bookingproject3`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followerId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL,
  `userId` char(36) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followerId`, `vacationId`, `userId`) VALUES
(8, 5, '63175ea1-8f5d-432f-8e1f-154dab9abd82'),
(103, 9, 'ed0a3375-0a19-45d5-aeb8-9d6b9d69bb04'),
(104, 10, 'ed0a3375-0a19-45d5-aeb8-9d6b9d69bb04'),
(113, 12, 'bcbd70c6-291e-4313-b154-b0c010166151'),
(117, 5, 'bcbd70c6-291e-4313-b154-b0c010166151'),
(122, 14, 'ed0a3375-0a19-45d5-aeb8-9d6b9d69bb04'),
(123, 4, 'bcbd70c6-291e-4313-b154-b0c010166151'),
(130, 14, 'bcbd70c6-291e-4313-b154-b0c010166151'),
(132, 5, '6db45c17-d7f5-4798-b45d-0a808264719e'),
(134, 30, 'bcbd70c6-291e-4313-b154-b0c010166151');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
('5f3a28aa-2bf5-4ae0-a76c-a8caa58dcec7', 'Zohar', 'Shushan', 'Zohar_Shushan', 'be283400e20f17ea34049a204415c672660a1a08f44ffb13728376b075a8da1cdeda27a1ccff73d07ca02c02fcd3c3c68b9df9e4bbf32f0ce10696a4ca4743c7', 'Admin'),
('63175ea1-8f5d-432f-8e1f-154dab9abd82', 'Noa', 'Lidan', 'Noa123', '1611ee302fa9a366b6cddafd095bfd705b487e839e9278e76bbae34d49274fa2a9d15645b05f42814003dfed7d0dc715a1e5799007ffaca55e86cc39f6ce94b4', 'User'),
('6db45c17-d7f5-4798-b45d-0a808264719e', 'Rachel', 'Yahav', 'Rachely', '2a57807f73a2b407adbff4ece87ba3f38502996791976235ea2b2613ad1e5ddbcc66e4195c5a5f7741730c1b9778fb054194d712f1379ab2e235e7ad057d9047', 'User'),
('716d88a7-26d0-479c-a211-337a9f11bc03', 'Inbar', 'Levy', 'Amber', '647f13d755f48b64e5a73243adc62868bead6d9bc1971f47f9bd6424d7cc2b1811d5b2052ac50dd6ab21bbde373b9bd93a09e9e667356e116c07ce8b08f5a3ed', 'User'),
('bcbd70c6-291e-4313-b154-b0c010166151', 'oz', 'levy', 'ozzy', '7179388b27dfa86c29b6d72474ddb67cb52aaf0a911170d4c7c9b3d1d716ac5d6322299ba8b13cef1a1980bdae1bc510d5594d8f3a15369532446972b63accea', 'User'),
('ed0a3375-0a19-45d5-aeb8-9d6b9d69bb04', 'shir', 'yahav', 'shirshir', 'be283400e20f17ea34049a204415c672660a1a08f44ffb13728376b075a8da1cdeda27a1ccff73d07ca02c02fcd3c3c68b9df9e4bbf32f0ce10696a4ca4743c7', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `description` varchar(550) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `imageName` varchar(150) NOT NULL,
  `fromDate` date NOT NULL,
  `untilDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `imageName`, `fromDate`, `untilDate`, `price`) VALUES
(4, 'Romantic vacation in Paris, Take your partner and anjoy the Eiffel Tower', 'Paris', '4be14f4f-0d2b-4120-b04e-54c33d42fd1e.jpg', '2022-11-28', '2022-12-05', '1539.00'),
(5, 'For picture-perfect pink scenes and picnics, head to Japan for cherry blossom season.', 'Japan', '9f5dac4a-c6d0-475d-8bb8-35d38005e39c.jpg', '2022-05-09', '2022-05-23', '2000.00'),
(9, 'In a country as vast and geographically diverse as the USA its ALWAYS road trip season somewhere', 'USA Road Trip', '92e168ac-c932-4785-8b17-35b8bbdcfd5d.jpg', '2022-05-28', '2022-06-26', '3256.00'),
(10, 'There’s nothing like immersing yourself in nature on a woodsy getaway where days are wiled away hiking, swimming or kayaking.', 'Costa Rica', '33b5099a-c231-4529-819b-17efcdcc947f.jpg', '2022-10-30', '2023-01-30', '10000.99'),
(12, 'Venture to the Land of Fire and Ice with Nordic Visitor', 'Iceland', '5c7db03b-3e28-4180-b7be-6931c8303e15.jpg', '2022-12-29', '2023-01-29', '15000.00'),
(14, 'Amboseli, Lake Naivasha and Mara - Mid-Range', 'SAFARI IN KENYA', '4f158dde-604c-4248-8de9-9a5de1fc63f6.jpg', '2023-12-30', '2024-01-05', '9000.00'),
(30, 'The art, the architecture, the history, the food: a trip to Italy is a winner in all categories', 'Italy', '4e826b60-f50e-4ae6-9f4e-1822945e58d7.jpg', '2022-07-31', '2022-08-06', '2379.00'),
(32, 'Want diversity? Get yourself to Australia. The pristine beaches, rugged terrain and bustling coastal cities in this part of the world are the living embodiment of variety.', 'Australia', '837fb315-1676-4769-a835-7f07632b6e71.jpg', '2023-01-01', '2023-01-31', '5320.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followerId`),
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
