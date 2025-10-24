-- ========================================
-- ATUALIZAR: ADICIONAR SERVIÇO DE TREINAMENTOS
-- ========================================
-- Execute este script se você já tem o banco configurado
-- e quer adicionar o novo serviço de Treinamentos - Luxus Evolution

-- Remover a constraint antiga
ALTER TABLE vendas DROP CONSTRAINT IF EXISTS vendas_servico_check;

-- Adicionar nova constraint com treinamentos
ALTER TABLE vendas ADD CONSTRAINT vendas_servico_check 
  CHECK (servico IN ('redorbai', 'linhas', 'equipamentos', 'treinamentos'));

-- Verificar
SELECT DISTINCT servico FROM vendas;

-- Mensagem de confirmação
SELECT 'Serviço de Treinamentos adicionado com sucesso!' as status;

