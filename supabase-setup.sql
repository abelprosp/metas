-- ========================================
-- SETUP DO BANCO DE DADOS SUPABASE
-- Dashboard de Vendas - Luxus
-- ========================================

-- 1. Criar Tabela de Vendas
-- ========================================
CREATE TABLE IF NOT EXISTS vendas (
  id BIGSERIAL PRIMARY KEY,
  data DATE NOT NULL,
  servico TEXT NOT NULL CHECK (servico IN ('redorbai', 'linhas', 'equipamentos', 'treinamentos')),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  valor_unitario DECIMAL(10, 2) NOT NULL CHECK (valor_unitario >= 0),
  valor_total DECIMAL(10, 2) NOT NULL CHECK (valor_total >= 0),
  vendedor TEXT,
  observacoes TEXT,
  campanha_id BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Criar Tabela de Metas
-- ========================================
CREATE TABLE IF NOT EXISTS metas (
  id BIGSERIAL PRIMARY KEY,
  mes TEXT NOT NULL UNIQUE,
  valor_meta DECIMAL(10, 2) NOT NULL CHECK (valor_meta >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Criar Tabela de Campanhas
-- ========================================
CREATE TABLE IF NOT EXISTS campanhas (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  valor_meta DECIMAL(10, 2) NOT NULL CHECK (valor_meta >= 0),
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (data_fim >= data_inicio)
);

-- 4. Criar Índices para Performance
-- ========================================
CREATE INDEX IF NOT EXISTS idx_vendas_data ON vendas(data);
CREATE INDEX IF NOT EXISTS idx_vendas_servico ON vendas(servico);
CREATE INDEX IF NOT EXISTS idx_vendas_campanha ON vendas(campanha_id);
CREATE INDEX IF NOT EXISTS idx_metas_mes ON metas(mes);
CREATE INDEX IF NOT EXISTS idx_campanhas_ativa ON campanhas(ativa);
CREATE INDEX IF NOT EXISTS idx_campanhas_datas ON campanhas(data_inicio, data_fim);

-- 5. Configurar Row Level Security (RLS)
-- ========================================

-- Opção A: DESENVOLVIMENTO - Desabilitar RLS (NÃO RECOMENDADO PARA PRODUÇÃO)
-- Descomente as linhas abaixo apenas para testes locais:
-- ALTER TABLE vendas DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE metas DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE campanhas DISABLE ROW LEVEL SECURITY;

-- Opção B: PRODUÇÃO - Habilitar RLS com políticas públicas
-- Descomente as linhas abaixo para produção:

ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE campanhas ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir leitura pública vendas" ON vendas;
DROP POLICY IF EXISTS "Permitir leitura pública metas" ON metas;
DROP POLICY IF EXISTS "Permitir leitura pública campanhas" ON campanhas;
DROP POLICY IF EXISTS "Permitir inserção pública vendas" ON vendas;
DROP POLICY IF EXISTS "Permitir inserção pública metas" ON metas;
DROP POLICY IF EXISTS "Permitir inserção pública campanhas" ON campanhas;
DROP POLICY IF EXISTS "Permitir atualização pública vendas" ON vendas;
DROP POLICY IF EXISTS "Permitir atualização pública metas" ON metas;
DROP POLICY IF EXISTS "Permitir atualização pública campanhas" ON campanhas;
DROP POLICY IF EXISTS "Permitir exclusão pública vendas" ON vendas;
DROP POLICY IF EXISTS "Permitir exclusão pública metas" ON metas;
DROP POLICY IF EXISTS "Permitir exclusão pública campanhas" ON campanhas;

-- Políticas de leitura pública
CREATE POLICY "Permitir leitura pública vendas" 
  ON vendas FOR SELECT 
  USING (true);

CREATE POLICY "Permitir leitura pública metas" 
  ON metas FOR SELECT 
  USING (true);

CREATE POLICY "Permitir leitura pública campanhas" 
  ON campanhas FOR SELECT 
  USING (true);

-- Políticas de inserção pública
CREATE POLICY "Permitir inserção pública vendas" 
  ON vendas FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir inserção pública metas" 
  ON metas FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir inserção pública campanhas" 
  ON campanhas FOR INSERT 
  WITH CHECK (true);

-- Políticas de atualização pública
CREATE POLICY "Permitir atualização pública vendas" 
  ON vendas FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir atualização pública metas" 
  ON metas FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir atualização pública campanhas" 
  ON campanhas FOR UPDATE 
  USING (true);

-- Políticas de exclusão pública
CREATE POLICY "Permitir exclusão pública vendas" 
  ON vendas FOR DELETE 
  USING (true);

CREATE POLICY "Permitir exclusão pública metas" 
  ON metas FOR DELETE 
  USING (true);

CREATE POLICY "Permitir exclusão pública campanhas" 
  ON campanhas FOR DELETE 
  USING (true);

-- 6. Dados de Exemplo (opcional)
-- ========================================

-- Inserir meta de exemplo para o mês atual
INSERT INTO metas (mes, valor_meta) 
VALUES (
  TO_CHAR(CURRENT_DATE, 'YYYY-MM'),
  50000.00
) ON CONFLICT (mes) DO NOTHING;

-- Inserir campanha de exemplo
INSERT INTO campanhas (nome, descricao, valor_meta, data_inicio, data_fim, ativa) VALUES
  ('Campanha de Lançamento', 'Promoção especial de lançamento dos novos serviços', 25000.00, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true)
ON CONFLICT DO NOTHING;

-- Inserir vendas de exemplo
INSERT INTO vendas (data, servico, quantidade, valor_unitario, valor_total, vendedor) VALUES
  (CURRENT_DATE, 'redorbai', 2, 147.00, 294.00, 'João Silva'),
  (CURRENT_DATE, 'linhas', 3, 89.90, 269.70, 'Maria Santos'),
  (CURRENT_DATE, 'equipamentos', 1, 350.00, 350.00, 'Pedro Costa'),
  (CURRENT_DATE - INTERVAL '1 day', 'redorbai', 1, 147.00, 147.00, 'João Silva'),
  (CURRENT_DATE - INTERVAL '2 days', 'equipamentos', 2, 450.00, 900.00, 'Ana Paula')
ON CONFLICT DO NOTHING;

-- ========================================
-- FIM DO SETUP
-- ========================================

-- Para verificar se tudo foi criado corretamente:
-- SELECT * FROM vendas;
-- SELECT * FROM metas;
-- SELECT * FROM campanhas;

