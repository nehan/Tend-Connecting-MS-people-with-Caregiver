-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2016 at 11:19 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tend`
--

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE IF NOT EXISTS `availability` (
  `Availablity_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `week_days` varchar(100) NOT NULL,
  PRIMARY KEY (`Availablity_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bank_account`
--

CREATE TABLE IF NOT EXISTS `bank_account` (
  `Account_ID` int(11) NOT NULL,
  `AccountHolder_Name` varchar(100) DEFAULT NULL,
  `Routing_No` varchar(100) DEFAULT NULL,
  `BankAccount_No` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `card_details`
--

CREATE TABLE IF NOT EXISTS `card_details` (
  `Card_ID` int(11) NOT NULL,
  `Card_Type` varchar(10) DEFAULT NULL,
  `Card_Number` varchar(16) DEFAULT NULL,
  `CVV_Number` int(11) DEFAULT NULL,
  `Expiry_Date` varchar(10) DEFAULT NULL,
  `Name_On_The_Card` varchar(100) DEFAULT NULL,
  `Billing_Address` varchar(1000) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `caregiver`
--

CREATE TABLE IF NOT EXISTS `caregiver` (
  `User_ID` int(11) NOT NULL,
  `Resume_filepath` varchar(1000) NOT NULL,
  `Reference_filepath` varchar(1000) NOT NULL,
  `pay_rate` int(11) NOT NULL,
  `Experience` int(11) NOT NULL,
  `Expertise` varchar(1000) NOT NULL,
  `Account_ID` int(11) NOT NULL,
  `Availability_ID` int(11) NOT NULL,
  `Authorization` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `Home_phone` varchar(15) DEFAULT NULL,
  `Mobile` varchar(15) DEFAULT NULL,
  `Street` varchar(100) NOT NULL,
  `Apt_No` varchar(1000) DEFAULT NULL,
  `City` varchar(100) NOT NULL,
  `State` varchar(100) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `Contact_ID` int(11) NOT NULL,
  `Zip_Code` int(11) NOT NULL,
  PRIMARY KEY (`Contact_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE IF NOT EXISTS `contact_us` (
  `Name` varchar(100) NOT NULL,
  `Contact_Text` varchar(100) NOT NULL,
  `Type_Of_Query` int(11) NOT NULL,
  `isUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `Flag` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `requester`
--

CREATE TABLE IF NOT EXISTS `requester` (
  `User_ID` int(11) NOT NULL,
  `Emergency_name` varchar(100) NOT NULL,
  `Emergency_no` varchar(15) NOT NULL,
  `Emergency_rel` varchar(100) NOT NULL,
  `Contact_ID` int(11) NOT NULL,
  `Card_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `req_car_map`
--

CREATE TABLE IF NOT EXISTS `req_car_map` (
  `requester_ID` int(11) NOT NULL,
  `caregiver_ID` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `days` varchar(100) NOT NULL,
  `hours_per_day` int(11) NOT NULL,
  `approve` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `requester_ID` int(11) NOT NULL,
  `caregiver_ID` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Review_text` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `security_map`
--

CREATE TABLE IF NOT EXISTS `security_map` (
  `Security_Id` int(11) NOT NULL,
  `question` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `security_map`
--

INSERT INTO `security_map` (`Security_Id`, `question`) VALUES
(1, 'What is your favorite movie?'),
(2, 'What is your favorite place?'),
(3, 'What is your favorite country?'),
(4, 'What is your favorite team?'),
(5, 'What is your Grandfather''s name?'),
(6, 'What is your first own car''s model?');

-- --------------------------------------------------------

--
-- Table structure for table `security_question`
--

CREATE TABLE IF NOT EXISTS `security_question` (
  `User_ID` int(11) NOT NULL,
  `Security_Id` int(11) NOT NULL,
  `answer` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE IF NOT EXISTS `testimonial` (
  `Name` varchar(100) NOT NULL,
  `isMember` int(11) NOT NULL,
  `testimonial_text` varchar(2000) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE IF NOT EXISTS `user_details` (
  `User_ID` int(11) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `About_Me` varchar(50000) NOT NULL,
  `Age` int(11) NOT NULL,
  `Contact_ID` int(11) NOT NULL,
  `Flag` int(11) NOT NULL,
  `member_since` date NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `profile_picture` varchar(1000) NOT NULL,
  `subscription` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
