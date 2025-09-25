-- ========================================================
-- 1. Criar grupo "Administrador"
-- ========================================================
INSERT INTO grupos (descricao, ativo)
VALUES ('Administrador', TRUE)
ON CONFLICT (descricao) DO NOTHING;

-- Recuperar o id do grupo criado
WITH g AS (
    SELECT id FROM grupos WHERE descricao = 'Administrador'
)

-- ========================================================
-- 2. Criar páginas "/grupos" e "/paginas"
-- ========================================================
INSERT INTO paginas (descricao, link_pagina, ativo)
VALUES 
    ('Gerenciar Grupos', '/grupos', TRUE),
    ('Gerenciar Páginas', '/paginas', TRUE)
ON CONFLICT (link_pagina) DO NOTHING;

-- ========================================================
-- 3. Amarrar grupo "Administrador" às páginas criadas
-- ========================================================
INSERT INTO grupos_paginas (grupo_id, pagina_id, acesso)
SELECT g.id, p.id, TRUE
FROM grupos g
JOIN paginas p ON p.link_pagina IN ('/grupos','/paginas')
WHERE g.descricao = 'Administrador'
ON CONFLICT (grupo_id, pagina_id) DO NOTHING;

-- ========================================================
-- 4. Criar usuário Admin vinculado ao grupo "Administrador"
-- (IMPORTANTE: ajustar a senha já como hash gerado pelo bcrypt)
-- https://bcrypt-generator.com/
-- ========================================================

-- Supondo hash de "123456" gerado com bcrypt = 
-- $2b$10$CwTycUXWue0Thq9StjUM0uJ8jfQyLmopjHh8XIvFz1K6rCbl1P9/S

INSERT INTO usuarios (nome, email, senha_hash, grupo_id, ativo)
SELECT 'Admin', 'admin@admin.com', 
       '$2b$10$CwTycUXWue0Thq9StjUM0uJ8jfQyLmopjHh8XIvFz1K6rCbl1P9/S', 
       g.id, TRUE
FROM grupos g
WHERE g.descricao = 'Administrador'
ON CONFLICT (email) DO NOTHING;
