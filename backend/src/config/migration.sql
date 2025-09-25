-- ======================================================================
-- TABELA DE GRUPOS
-- ======================================================================
CREATE TABLE IF NOT EXISTS grupos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE PAGINAS
-- ======================================================================
CREATE TABLE IF NOT EXISTS paginas (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50) UNIQUE NOT NULL,
    link_pagina VARCHAR(150) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- RELACIONAMENTO: PERMISSÕES DE ACESSO
-- Cada grupo tem várias páginas com flag de acesso
-- ======================================================================
CREATE TABLE IF NOT EXISTS grupos_paginas (
    id SERIAL PRIMARY KEY,
    grupo_id INT NOT NULL REFERENCES grupos(id) ON DELETE CASCADE,
    pagina_id INT NOT NULL REFERENCES paginas(id) ON DELETE CASCADE,
    acesso BOOLEAN DEFAULT FALSE,
    UNIQUE (grupo_id, pagina_id)
);

-- ======================================================================
-- TABELA DE USUÁRIOS
-- ======================================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    grupo_id INT REFERENCES grupos(id) ON DELETE SET NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT NOW()
);
