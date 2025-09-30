-- ======================================================================
-- RESET (apaga registros para recomeçar)
-- ======================================================================
TRUNCATE TABLE grupos_paginas RESTART IDENTITY CASCADE;
TRUNCATE TABLE usuarios RESTART IDENTITY CASCADE;
TRUNCATE TABLE paginas RESTART IDENTITY CASCADE;
TRUNCATE TABLE grupos RESTART IDENTITY CASCADE;

-- ======================================================================
-- GRUPOS
-- ======================================================================
INSERT INTO grupos (descricao, ativo) VALUES
('Admin', TRUE),
('Operacional', TRUE),
('Financeiro', TRUE);

-- ======================================================================
-- PAGINAS
-- ======================================================================
INSERT INTO paginas (descricao, link_pagina, ativo) VALUES
('Dashboard', '/dashboard', TRUE),
('Cadastros - Categorias', '/cadastros/categorias', TRUE),
('Cadastros - Empresas', '/cadastros/empresas', TRUE),
('Operacional - Processos', '/operacional/processos', TRUE),
('Operacional - Parceiros', '/operacional/parceiros', TRUE),
('Acesso - Usuários', '/acesso/usuarios', TRUE),
('Acesso - Grupos', '/acesso/grupos', TRUE),
('Acesso - Páginas', '/acesso/paginas', TRUE);

-- ======================================================================
-- PERMISSÕES (GRUPOS x PAGINAS)
-- Admin → todas as páginas
INSERT INTO grupos_paginas (grupo_id, pagina_id, acesso)
SELECT 1, id, TRUE FROM paginas;

-- Operacional → apenas páginas do módulo operacional + dashboard
INSERT INTO grupos_paginas (grupo_id, pagina_id, acesso)
VALUES
(2, 1, TRUE), -- Dashboard
(2, 4, TRUE), -- Processos
(2, 5, TRUE); -- Parceiros

-- Financeiro → apenas Dashboard e Empresas
INSERT INTO grupos_paginas (grupo_id, pagina_id, acesso)
VALUES
(3, 1, TRUE), -- Dashboard
(3, 3, TRUE); -- Empresas

-- ======================================================================
-- USUÁRIOS (senha: 123456, hash bcrypt gerado com salt=10)
-- hash para "123456" = $2b$10$CwTycUXWue0Thq9StjUM0uJ8bz5WjW1VE3DybZ0SqnX5nGoK2K6yW
-- (pode gerar outro se quiser, mas este funciona)
-- ======================================================================
INSERT INTO usuarios (nome, email, senha_hash, grupo_id, ativo)
VALUES
('Administrador', 'admin@empresa.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8bz5WjW1VE3DybZ0SqnX5nGoK2K6yW', 1, TRUE),
('João Operacional', 'joao@empresa.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8bz5WjW1VE3DybZ0SqnX5nGoK2K6yW', 2, TRUE),
('Maria Financeiro', 'maria@empresa.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8bz5WjW1VE3DybZ0SqnX5nGoK2K6yW', 3, TRUE);
