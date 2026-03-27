-- Script para crear la base de datos y tabla de productos
-- MySQL/MariaDB

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS MDG;
USE MDG;

-- Crear la tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100) NOT NULL,
    imagen VARCHAR(500),
    disponible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, precio, descripcion, categoria, imagen, disponible) VALUES
('Guitarra Acústica Fender', 8500.00, 'Guitarra acústica de calidad profesional con cuerpo de pino', 'Guitarras', 'https://picsum.photos/seed/guitar1/400/300', TRUE),
('Guitarra Eléctrica Ibanez', 12000.00, 'Guitarra eléctrica ideal para rock y metal con micrófono humbucker', 'Guitarras', 'https://picsum.photos/seed/guitar2/400/300', TRUE),
('Cuerdas D''Addario 10-46', 250.00, 'Juego de cuerdas de acero niquelado para guitarra eléctrica', 'Cuerdas', 'https://picsum.photos/seed/strings/400/300', TRUE),
('Púas Dunlop Tortex', 80.00, 'Púas de nylon resistente, paquete de 12 piezas', 'Púas', 'https://picsum.photos/seed/puas/400/300', TRUE),
('Amplificador Marshal MG30', 4500.00, 'Amplificador de 30 watts con efectos integrados', 'Amplificadores', 'https://picsum.photos/seed/amp/400/300', TRUE),
('Correa de Cuero Levys', 450.00, 'Correa de cuero premium para guitarra, ajustable', 'Accesorios', 'https://picsum.photos/seed/strap/400/300', TRUE),
('Afinador Electrónico Cromático', 350.00, 'Afinador digital con pantalla LCD y pinza', 'Accesorios', 'https://picsum.photos/seed/tuner/400/300', TRUE),
('Funda para Guitarra', 600.00, 'Funda acolchonada con cierre y bolsillo', 'Fundas', 'https://picsum.photos/seed/case/400/300', TRUE);

-- Verificar los datos insertados
SELECT * FROM productos;
