-- ========================================
-- LIMPAR TODOS OS DADOS DO DASHBOARD
-- ========================================
-- Execute este script no SQL Editor do Supabase para remover todos os dados

-- ATENÇÃO: Este comando vai apagar TODOS os dados!
-- Certifique-se de que deseja fazer isso antes de executar.

-- Limpar todas as vendas
DELETE FROM vendas;

-- Limpar todas as metas
DELETE FROM metas;

-- Limpar todas as campanhas
DELETE FROM campanhas;

-- Resetar os contadores de ID (opcional)
ALTER SEQUENCE vendas_id_seq RESTART WITH 1;
ALTER SEQUENCE metas_id_seq RESTART WITH 1;
ALTER SEQUENCE campanhas_id_seq RESTART WITH 1;

-- Verificar se está vazio
SELECT COUNT(*) as total_vendas FROM vendas;
SELECT COUNT(*) as total_metas FROM metas;
SELECT COUNT(*) as total_campanhas FROM campanhas;

-- Mensagem de confirmação
SELECT 'Banco de dados limpo com sucesso!' as status;

