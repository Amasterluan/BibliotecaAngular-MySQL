-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.1.0 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `bancolivraria` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bancolivraria`;

-- Tabela autores
CREATE TABLE IF NOT EXISTS `autores` (
`idautores` INT AUTO_INCREMENT PRIMARY KEY,
  `nome_autor` varchar(100) NOT NULL,
  `email_autor` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Inserindo dados na tabela autores
INSERT IGNORE INTO `autores` (`idautores`, `nome_autor`, `email_autor`) VALUES
(1, 'Diana Wynne Jones', 'diana@example.com'),
(2, 'Aluísio Azevedo', 'Aluísio@example.com'),
(3, 'Matt Haig', 'MattHaig@example.com'),
(4, 'Colleen Hoover', 'Hoover@example.com'),
(5, 'Machado de Assis', 'MachadoAssis@example.com'),
(6, 'Mário de Andrade', 'MárioAndrade@example.com'),
(7, 'Martha Medeiros', 'Martha@example.com'),
(8, 'Joaquim Manuel de Macedo', 'JoaquimManuel@example.com'),
(9, 'Wu Cheng', 'WuCheng@example.com'),
(10, 'Jane Austen', 'janeausten@example.com'),
(11, 'Ayòbámi Adébáyò', 'ayobamiadebayo@example.com'),
(12, 'Julia Quinn', 'juliaquinn@example.com'),
(13, 'Erico Verissimo', 'ericoverissimo@example.com'),
(14, 'Tatiana Maciel e Cleo', 'tatianacleo@example.com'),
(15, 'Adam Silvera', 'adamsilvera@example.com'),
(16, 'Makoto Shinkai e Ranmaru Kotone', 'makotoranmaru@example.com'),
(17, 'Fujita', 'fujita@example.com'),
(18, 'Yoshitoki Oima', 'yoshitokioima@example.com'),
(19, 'Tsugumi Ohba e Takeshi Obata', 'tsugumitakeshi@example.com');

-- Tabela favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `idfavoritos` int NOT NULL,
  `idusuarios` int NOT NULL,
  `idlivros` int NOT NULL,
  PRIMARY KEY (`idfavoritos`,`idusuarios`,`idlivros`),
  CONSTRAINT `fk_favoritos_livros1` FOREIGN KEY (`idlivros`) REFERENCES `livros` (`idlivros`),
  CONSTRAINT `fk_favoritos_usuarios` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Tabela generos
CREATE TABLE IF NOT EXISTS `generos` (
  `idgeneros` INT AUTO_INCREMENT PRIMARY KEY,
  `nome_genero` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Inserindo dados na tabela generos
INSERT IGNORE INTO `generos` (`idgeneros`, `nome_genero`) VALUES
(1, 'Ficcao'),
(2, 'comedia'),
(3, 'Drama'),
(4, 'Romance'),
(5, 'Literatura de viagem'),
(6, 'Suspense');

-- Tabela compras 
CREATE TABLE IF NOT EXISTS `compras` (
  `idlivros` int NULL,
  `idusuario` int NULL,
  `datacompra` date NULL,
  `idformapagamento` int NULL,
  `total` decimal(10,0) NOT NULL,
  PRIMARY KEY (`idlivros`,`idusuario`),
  CONSTRAINT `fk_compras_livros1` FOREIGN KEY (`idlivros`) REFERENCES `livros` (`idlivros`),
  CONSTRAINT `fk_compras_usuarios1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuarios`),
  CONSTRAINT `fk_compras_formaspagamento` FOREIGN KEY (`idformapagamento`) REFERENCES `formas_pagamento` (`idformapagamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Tabela formas_pagamento com o campo desconto
CREATE TABLE IF NOT EXISTS `formas_pagamento` (
  `idformapagamento` int NOT NULL AUTO_INCREMENT,
  `tipo_pagamento` varchar(60) NOT NULL,
  `desconto` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`idformapagamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Inserindo dados na tabela formas_pagamento
INSERT IGNORE INTO `formas_pagamento` (`idformapagamento`, `tipo_pagamento`, `desconto`) VALUES
(1, 'Cartão de Crédito', 5.00),
(2, 'Boleto Bancário', 8.00),
(3, 'Pix', 10.00);

-- Tabela enderecos 
CREATE TABLE IF NOT EXISTS `enderecos` (
  `idendereco` INT AUTO_INCREMENT PRIMARY KEY,
  `idusuario` int NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL
  CONSTRAINT `fk_enderecos_usuarios` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Tabela livros
CREATE TABLE IF NOT EXISTS `livros` (
  `idlivros` INT AUTO_INCREMENT PRIMARY KEY,
  `imagem` longtext,
  `titulo_livro` varchar(250) NOT NULL,
  `anopublicacao` date NOT NULL,
  `descricao` longtext NOT NULL,
  `estoque` int DEFAULT NULL,
  `preco` decimal(10,0) DEFAULT NULL,
  `idautor` int NOT NULL,
  `idgeneros` int NOT NULL,
  `nome_editora` varchar(100) NOT NULL,
  KEY `fk_livros_autor1_idx` (`idautor`),
  KEY `fk_livros_generos1_idx` (`idgeneros`),
  CONSTRAINT `fk_livros_autor1` FOREIGN KEY (`idautor`) REFERENCES `autores` (`idautores`),
  CONSTRAINT `fk_livros_generos1` FOREIGN KEY (`idgeneros`) REFERENCES `generos` (`idgeneros`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


INSERT IGNORE INTO `livros` (`idlivros`, `imagem`, `titulo_livro`, `anopublicacao`, `descricao`, `estoque`, `preco`, `idautor`, `idgeneros`, `nome_editora`) VALUES
(1, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'O Castelo Animado', '2001-01-01', 'Uma história sobre magia, viagem e aventuras em um castelo que se move.', 50, 35.00, 1, 1, 'Teste'),
(2, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'O Primo Basílio', '1878-01-01', 'Um romance que narra a vida de uma mulher casada que se envolve em um caso extraconjugal.', 30, 20.00, 2, 4, 'Teste'),
(3, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'O Presente', '2015-10-01', 'Um romance sobre um homem que está tentando superar sua depressão e encontrar um novo significado para a vida.', 40, 40.00, 3, 3, 'Teste'),
(4, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'Verity', '2018-12-01', 'Um thriller psicológico que segue uma escritora que investiga um caso misterioso de uma colega autora.', 25, 50.00, 4, 6, 'Teste'),
(5, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'Dom Casmurro', '1900-01-01', 'Um dos maiores clássicos da literatura brasileira, narrando a história de Bentinho e sua relação com Capitu.', 20, 25.00, 5, 3, 'Teste'),
(6, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'Macunaíma', '1928-01-01', 'A obra de Mário de Andrade que mistura elementos do folclore brasileiro com a crítica social.', 15, 22.00, 6, 2, 'Teste'),
(7, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'A Cama da Mãe Joana', '2009-04-15', 'Histórias sobre a vida e os dilemas de pessoas comuns, de forma bem-humorada e ao mesmo tempo profunda.', 30, 28.00, 7, 2, 'Teste'),
(8, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'O Primo Basílio', '1878-01-01', 'A história de uma mulher casada e sua relação extraconjugal com seu primo Basílio.', 20, 18.00, 8, 1, 'Teste'),
(9, 'https://m.media-amazon.com/images/I/81JPLgU-EgS._SL1500_.jpg', 'A Menina Submersa', '2012-05-10', 'Um romance fantástico com temas de memória, família e segredos obscuros.', 10, 45.00, 9, 4, 'Teste');

CREATE TABLE IF NOT EXISTS carrinho (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(idusuarios),
  FOREIGN KEY (product_id) REFERENCES livros(idlivros)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  products TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pendente',
  FOREIGN KEY (user_id) REFERENCES usuarios(idusuarios)
);

ALTER TABLE livros ADD INDEX idx_titulo (titulo_livro);
ALTER TABLE livros CHANGE nome_autor autor VARCHAR(255);
ALTER TABLE livros CHANGE nome_genero genero VARCHAR(255);
SHOW CREATE TABLE autores;


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;




