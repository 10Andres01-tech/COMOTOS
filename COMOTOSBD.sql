CREATE DATABASE comotos;
USE comotos;

CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(100) NOT NULL UNIQUE,
    logo_url VARCHAR(255) NULL,
    pais_origen VARCHAR(100) NULL
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motos (
    id_moto INT AUTO_INCREMENT PRIMARY KEY,
    marca_id INT NOT NULL,
    categoria_id INT NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    version VARCHAR(50) NULL,
    anio INT NOT NULL,
    precio_base DECIMAL(12, 2) NULL,
    imagen_url VARCHAR(255) NULL,
    descripcion TEXT NULL,
    CONSTRAINT fk_motos_marcas FOREIGN KEY (marca_id) 
        REFERENCES marcas(id_marca) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_motos_categorias FOREIGN KEY (categoria_id) 
        REFERENCES categorias(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE especificaciones (
    id_especificacion INT AUTO_INCREMENT PRIMARY KEY,
    moto_id INT NOT NULL UNIQUE, 
    motor_tipo VARCHAR(100) NULL,
    cilindrada INT NULL,
    potencia_cv INT NULL,
    torque_nm INT NULL,
    transmision VARCHAR(50) NULL,
    peso_kg INT NULL,
    capacidad_tanque DECIMAL(5, 2) NULL,
    CONSTRAINT fk_especificaciones_motos FOREIGN KEY (moto_id) 
        REFERENCES motos(id_moto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    moto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT NULL,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resenas_motos FOREIGN KEY (moto_id) 
        REFERENCES motos(id_moto) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_resenas_usuarios FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comparativas_guardadas (
    id_comparativa INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comparativas_usuarios FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE items_comparativa (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    comparativa_id INT NOT NULL,
    moto_id INT NOT NULL,
    CONSTRAINT fk_items_comparativas FOREIGN KEY (comparativa_id) 
        REFERENCES comparativas_guardadas(id_comparativa) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_items_motos FOREIGN KEY (moto_id) 
        REFERENCES motos(id_moto) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_comparativa_moto UNIQUE (comparativa_id, moto_id) 
);