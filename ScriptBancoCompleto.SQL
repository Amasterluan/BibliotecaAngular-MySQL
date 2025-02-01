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
  `idautores` int NOT NULL,
  `nome_autor` varchar(100) NOT NULL,
  `email_autor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idautores`)
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

-- Tabela editora
CREATE TABLE IF NOT EXISTS `editora` (
  `ideditora` int NOT NULL,
  `nome_editora` varchar(100) DEFAULT NULL,
  `CNPJ` varchar(45) DEFAULT NULL,
  `email_editora` varchar(100) DEFAULT NULL,
  `anofundacao` date DEFAULT NULL,
  `telefone_editora` int DEFAULT NULL,
  PRIMARY KEY (`ideditora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Inserindo dados na tabela editora
INSERT IGNORE INTO `editora` (`ideditora`, `nome_editora`, `CNPJ`, `email_editora`, `anofundacao`, `telefone_editora`) VALUES
(1, 'Edições Alvorada', '12345678901234', 'contato@edicoesalvorada.com', '1995-08-20', 993456789),
(2, 'Editora Estrela do Norte', '23456789012345', 'contato@estreladonorteeditora.com', '2000-04-10', 234567890),
(3, 'Livros Harmonia', '34567890123456', 'contato@livrosharmonia.com', '2008-12-05', 995678901),
(4, 'Editorial Aurora', '45678901234567', 'contato@editorialaurora.com', '1990-06-15', 996789012),
(5, 'Casa das Letras', '56789012345678', 'contato@casadasletras.com', '2012-10-25', 997890123),
(6, 'Editora Páginas Douradas', '67890123456789', 'contato@paginasdouradaseditora.com', '2005-07-30', 978901234),
(7, 'Publicações Veredas', '78901234567890', 'contato@publicacoesveredas.com', '2017-03-18', 989012345),
(8, 'Palavras Mágicas Editora', '89012345678901', 'contato@palavrasmagicaseditora.com', '2010-11-22', 990123456),
(9, 'Editora colonial', '12345678901234', 'contato@editoracolonial.com', '1815-08-20', 993456789);

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
  `idgeneros` int NOT NULL,
  `nome_genero` varchar(45) NOT NULL,
  PRIMARY KEY (`idgeneros`)
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
  `idlivros` int NOT NULL,
  `idusuario` int NOT NULL,
  `datacompra` date NOT NULL,
  `idformapagamento` int NOT NULL,
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
  `idendereco` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  PRIMARY KEY (`idendereco`),
  CONSTRAINT `fk_enderecos_usuarios` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Tabela livros
CREATE TABLE IF NOT EXISTS `livros` (
  `idlivros` int NOT NULL,
  `imagem` longtext,
  `titulo_livro` varchar(100) NOT NULL,
  `anopublicacao` date NOT NULL,
  `descricao` longtext NOT NULL,
  `estoque` int DEFAULT NULL,
  `preco` decimal(10,0) DEFAULT NULL,
  `idautor` int NOT NULL,
  `idgeneros` int NOT NULL,
  `ideditora` int NOT NULL,
  PRIMARY KEY (`idlivros`),  -- Aqui estou usando apenas `idlivros` como chave primária
  KEY `fk_livros_autor1_idx` (`idautor`),
  KEY `fk_livros_generos1_idx` (`idgeneros`),
  KEY `fk_livros_editora1_idx` (`ideditora`),
  CONSTRAINT `fk_livros_autor1` FOREIGN KEY (`idautor`) REFERENCES `autores` (`idautores`),
  CONSTRAINT `fk_livros_editora1` FOREIGN KEY (`ideditora`) REFERENCES `editora` (`ideditora`),
  CONSTRAINT `fk_livros_generos1` FOREIGN KEY (`idgeneros`) REFERENCES `generos` (`idgeneros`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
ALTER TABLE autores ADD INDEX idx_nome_autor (nome_autor);
ALTER TABLE generos ADD INDEX idx_nome_genero (nome_genero);
ALTER TABLE editora ADD INDEX idx_nome_editora (nome_editora);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
