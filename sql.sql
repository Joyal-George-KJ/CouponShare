/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.9 : Database - couponsharing
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`couponsharing` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `couponsharing`;

/*Table structure for table `class` */

DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `class` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `class` */

insert  into `class`(`class_id`,`class`,`date`,`time`,`link`,`staff_id`) values 
(2,'mba','21-3-2023','20:30','gjhghkj',NULL),
(3,'bca','2024-03-20','10:28','jkdskdjalkdjslkada',NULL),
(4,'bca','2024-03-13','10:30','jkdskdjalkdjslkadas',2);

/*Table structure for table `complaint` */

DROP TABLE IF EXISTS `complaint`;

CREATE TABLE `complaint` (
  `complaint_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `complaint` varchar(100) DEFAULT NULL,
  `reply` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`complaint_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `complaint` */

insert  into `complaint`(`complaint_id`,`user_id`,`complaint`,`reply`,`date`) values 
(1,1,'hai','yes','2-3-2024'),
(2,2,'sfs','pending','2024-03-03'),
(3,1,'hai','pending','2024-03-03'),
(4,1,'bshs','pending','2024-03-15 20:01:38');

/*Table structure for table `coupon_request` */

DROP TABLE IF EXISTS `coupon_request`;

CREATE TABLE `coupon_request` (
  `crequest_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`crequest_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `coupon_request` */

insert  into `coupon_request`(`crequest_id`,`coupon_id`,`user_id`,`date`,`status`) values 
(1,9,1,'21-2-1291','accept'),
(2,8,1,'2024-03-15','pending'),
(3,2,1,'2024-03-15','pending');

/*Table structure for table `coupons` */

DROP TABLE IF EXISTS `coupons`;

CREATE TABLE `coupons` (
  `coupons_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `coupons` varchar(11) DEFAULT NULL,
  `details` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`coupons_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `coupons` */

insert  into `coupons`(`coupons_id`,`user_id`,`coupons`,`details`,`status`,`date`) values 
(1,2,'6','staff',NULL,NULL),
(8,5,'good','bshs','pending','23-32-2322'),
(9,1,'cvc','ffd','accept','2024-03-15'),
(10,1,'helkk','hello','pending','2024-03-15'),
(11,0,'bca','asdfgh','pending','0'),
(12,0,'cfdgs','asdfghs','pending','0');

/*Table structure for table `evaluator` */

DROP TABLE IF EXISTS `evaluator`;

CREATE TABLE `evaluator` (
  `evaluator_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` int(11) DEFAULT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`evaluator_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `evaluator` */

insert  into `evaluator`(`evaluator_id`,`login_id`,`fname`,`lname`,`place`,`phone`,`email`) values 
(1,10,'dsfdsf','sea','jhwkj','2345678904','kjsjdksa@gmail.com');

/*Table structure for table `fakecomplaint` */

DROP TABLE IF EXISTS `fakecomplaint`;

CREATE TABLE `fakecomplaint` (
  `fakecomplaint` int(11) NOT NULL AUTO_INCREMENT,
  `crequest_id` int(11) DEFAULT NULL,
  `complaint` varchar(100) DEFAULT NULL,
  `details` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`fakecomplaint`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `fakecomplaint` */

insert  into `fakecomplaint`(`fakecomplaint`,`crequest_id`,`complaint`,`details`,`date`) values 
(1,3,'gdh','jshs','2024-03-15'),
(2,3,'gdh','jshs','2024-03-15'),
(6,2,'ggf','dfg','2024-03-15');

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `usertype` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*Data for the table `login` */

insert  into `login`(`login_id`,`username`,`password`,`usertype`) values 
(1,'kk','kk','user'),
(2,'kkk','Kkk@123456','user'),
(3,'admin','Admin@123','admin'),
(4,'sss','Sss@12345','staff'),
(5,'us','User123#','user'),
(6,'staff','Staff@123','staff'),
(7,'hekko','Kerll123#','staff'),
(8,'hai','hai','User'),
(9,'haiooo','haiooo','User'),
(10,'ev','Av@1243!#$','evaluator');

/*Table structure for table `rating` */

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `crequest_id` int(11) DEFAULT NULL,
  `rated` varchar(100) DEFAULT NULL,
  `review` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`rating_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `rating` */

insert  into `rating`(`rating_id`,`user_id`,`crequest_id`,`rated`,`review`) values 
(1,1,3,'3.0','bbb');

/*Table structure for table `staff` */

DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` int(11) DEFAULT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `staff` */

insert  into `staff`(`staff_id`,`login_id`,`fname`,`lname`,`place`,`phone`,`email`) values 
(2,6,'staff','name','jhwkjs','2345678904','kjsjdksa@gmail.com');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` int(11) DEFAULT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`user_id`,`login_id`,`fname`,`lname`,`place`,`phone`,`email`) values 
(1,1,'jhhhhhhhhhhk','kjhj','kjhkj','8888889888','hsbvs@s'),
(2,5,'user','name','jhwkj','2345678904','kjsjdksa@gmail.com'),
(3,9,'Renuka Kamath','Renuka Kamath','1234567890','renukakamath2@gmail.com','place');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
