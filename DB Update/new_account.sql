-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2019 at 08:15 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_account`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`id`, `username`, `password`) VALUES
(1, 'admin_wan', '12345'),
(2, 'admin_joko', '12345'),
(3, 'admin_lina', '12345'),
(4, 'admin_sani', '123');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `id_kawin` int(4) NOT NULL,
  `id_penghasilan` int(4) NOT NULL,
  `id_rumah` int(4) NOT NULL,
  `id_anak` int(4) NOT NULL,
  `tempat_lahir` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `alamat` varchar(20) NOT NULL,
  `status_member` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `nama`, `id_kawin`, `id_penghasilan`, `id_rumah`, `id_anak`, `tempat_lahir`, `tanggal_lahir`, `alamat`, `status_member`) VALUES
(0, 'putri handayani', 2, 1, 1, 4, 'bandung', '2000-06-12', 'Jl.Kayumanis Timur N', 'iya'),
(1, 'Hidayat Kusuma', 2, 2, 3, 2, 'Jakarta', '1990-07-28', 'Jakarta Timur', 'tidak');

-- --------------------------------------------------------

--
-- Table structure for table `penghasilan`
--

CREATE TABLE `penghasilan` (
  `id` int(4) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `point` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penghasilan`
--

INSERT INTO `penghasilan` (`id`, `nama`, `point`) VALUES
(1, '1 - 5 Juta', 1),
(2, '5 - 10 Juta', 2),
(3, '10 - 15 Juta', 3),
(4, '> 20 Juta', 4),
(14, '', 0),
(15, 'oi', 43);

-- --------------------------------------------------------

--
-- Table structure for table `status_anak`
--

CREATE TABLE `status_anak` (
  `id` int(3) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `point` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_anak`
--

INSERT INTO `status_anak` (`id`, `nama`, `point`) VALUES
(1, '1', 3),
(2, '2', 2),
(3, '> 2', 1),
(4, 'Belum Ada', 4);

-- --------------------------------------------------------

--
-- Table structure for table `status_nikah`
--

CREATE TABLE `status_nikah` (
  `id` int(3) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `point` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_nikah`
--

INSERT INTO `status_nikah` (`id`, `nama`, `point`) VALUES
(1, 'Nikah', 1),
(2, 'Belum Nikah', 2);

-- --------------------------------------------------------

--
-- Table structure for table `status_rumah`
--

CREATE TABLE `status_rumah` (
  `id` int(3) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `point` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_rumah`
--

INSERT INTO `status_rumah` (`id`, `nama`, `point`) VALUES
(1, 'Milik Orang Tua', 3),
(2, 'Milik Sendiri (lunas)', 4),
(3, 'Milik Sendiri (cicil)', 2),
(4, 'Kontrak', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penghasilan`
--
ALTER TABLE `penghasilan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_anak`
--
ALTER TABLE `status_anak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_nikah`
--
ALTER TABLE `status_nikah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_rumah`
--
ALTER TABLE `status_rumah`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `penghasilan`
--
ALTER TABLE `penghasilan`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `status_anak`
--
ALTER TABLE `status_anak`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status_nikah`
--
ALTER TABLE `status_nikah`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status_rumah`
--
ALTER TABLE `status_rumah`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
