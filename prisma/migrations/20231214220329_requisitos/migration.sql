-- CreateTable
CREATE TABLE `tbl_clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `DPI` DOUBLE NOT NULL,
    `Nombre` CHAR(200) NOT NULL,
    `Apellido` CHAR(200) NOT NULL,
    `Correo` VARCHAR(200) NOT NULL,
    `Telefono` DOUBLE NOT NULL,
    `NIM` DOUBLE NOT NULL,
    `NIT` DOUBLE NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_clientes_DPI_key`(`DPI`),
    UNIQUE INDEX `tbl_clientes_Correo_key`(`Correo`),
    UNIQUE INDEX `tbl_clientes_NIM_key`(`NIM`),
    UNIQUE INDEX `tbl_clientes_NIT_key`(`NIT`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_permisos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Componente` CHAR(200) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_permisos_Nombre_key`(`Nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_departamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` CHAR(200) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_departamentos_Nombre_key`(`Nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_actividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` CHAR(200) NOT NULL,
    `Imagen` CHAR(200) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipotramite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` CHAR(200) NOT NULL,
    `Tiempo_estimado` DATETIME NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_tipotramite_Nombre_key`(`Nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_requisitos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` CHAR(200) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_requisitos_Nombre_key`(`Nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
