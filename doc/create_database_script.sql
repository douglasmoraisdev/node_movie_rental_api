SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `movie_rental` ;
CREATE SCHEMA IF NOT EXISTS `movie_rental` DEFAULT CHARACTER SET latin1 ;
USE `movie_rental` ;

-- -----------------------------------------------------
-- Table `movie_rental`.`MovieTitles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_rental`.`MovieTitles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `directorName` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `movie_rental`.`MovieCopies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_rental`.`MovieCopies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `barcode` VARCHAR(255) NOT NULL,
  `movieTitle_ID` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `barcode` (`barcode` ASC),
  INDEX `movieTitle_ID` (`movieTitle_ID` ASC),
  CONSTRAINT `MovieCopies_ibfk_1`
    FOREIGN KEY (`movieTitle_ID`)
    REFERENCES `movie_rental`.`MovieTitles` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `movie_rental`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_rental`.`Users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NULL DEFAULT NULL,
  `lastName` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `movie_rental`.`Rentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_rental`.`Rentals` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `movieCopy_ID` INT(11) NULL DEFAULT NULL,
  `User_ID` INT(11) NULL DEFAULT NULL,
  `rentalDate` DATETIME NULL DEFAULT NULL,
  `returnDate` DATETIME NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `movieCopy_ID` (`movieCopy_ID` ASC),
  INDEX `User_ID` (`User_ID` ASC),
  CONSTRAINT `Rentals_ibfk_1`
    FOREIGN KEY (`movieCopy_ID`)
    REFERENCES `movie_rental`.`MovieCopies` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `Rentals_ibfk_2`
    FOREIGN KEY (`User_ID`)
    REFERENCES `movie_rental`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
