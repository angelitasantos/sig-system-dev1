SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';

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

-- ======================================================================
-- TABELA DE CATEGORIAS
-- ======================================================================
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE SERVIÇOS
-- ======================================================================
CREATE TABLE IF NOT EXISTS servicos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE TIPO DE SERVIÇOS
-- ======================================================================
CREATE TABLE IF NOT EXISTS tipos_servico (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE TIPO COMEX
-- ======================================================================
CREATE TABLE IF NOT EXISTS tipos_comex (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE STATUS DO PROCESSO
-- ======================================================================
CREATE TABLE IF NOT EXISTS status_processo (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE MODAL
-- ======================================================================
CREATE TABLE IF NOT EXISTS modais (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE EMPRESAS
-- ======================================================================
CREATE TABLE IF NOT EXISTS empresas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    sigla_importacao VARCHAR(10),
    sigla_exportacao VARCHAR(10),
    numero_inicial INT NOT NULL DEFAULT 0,
    cnpj VARCHAR(20) UNIQUE NOT NULL,
    nome_completo VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA DE SEQUÊNCIAS DE PROCESSOS
-- ======================================================================
CREATE TABLE IF NOT EXISTS sequencias_processos (
    empresa_id INT REFERENCES empresas(id) ON DELETE CASCADE,
    ultimo_numero INT NOT NULL,
    PRIMARY KEY (empresa_id)
);

-- ======================================================================
-- TABELA DE PARCEIROS
-- ======================================================================
CREATE TABLE IF NOT EXISTS parceiros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    cnpj_cpf VARCHAR(20) UNIQUE NOT NULL,
    insc_est VARCHAR(20),
    nome_completo VARCHAR(200) NOT NULL,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ======================================================================
-- TABELA VINCULAR PARCEIROS x EMPRESAS (N:N)
-- ======================================================================
CREATE TABLE IF NOT EXISTS parceiros_empresas (
    parceiro_id INT REFERENCES parceiros(id) ON DELETE CASCADE,
    empresa_id INT REFERENCES empresas(id) ON DELETE CASCADE,
    sigla_import VARCHAR(10) NOT NULL,
    sigla_export VARCHAR(10) NOT NULL,
    PRIMARY KEY (parceiro_id, empresa_id)
);
