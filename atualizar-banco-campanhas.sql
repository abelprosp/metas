-- ========================================
-- ATUALIZAÇÃO: ADICIONAR TABELA DE CAMPANHAS
-- ========================================
-- Execute este script se você já tem o banco configurado 
-- e quer adicionar apenas a funcionalidade de campanhas

-- 1. Criar Tabela de Campanhas
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

-- 2. Adicionar campo campanha_id na tabela vendas (se não existir)
-- ========================================
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vendas' AND column_name = 'campanha_id'
  ) THEN
    ALTER TABLE vendas ADD COLUMN campanha_id BIGINT;
  END IF;
END $$;

-- 3. Criar Índices
-- ========================================
CREATE INDEX IF NOT EXISTS idx_vendas_campanha ON vendas(campanha_id);
CREATE INDEX IF NOT EXISTS idx_campanhas_ativa ON campanhas(ativa);
CREATE INDEX IF NOT EXISTS idx_campanhas_datas ON campanhas(data_inicio, data_fim);

-- 4. Configurar RLS (Row Level Security)
-- ========================================
ALTER TABLE campanhas ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir leitura pública campanhas" ON campanhas;
DROP POLICY IF EXISTS "Permitir inserção pública campanhas" ON campanhas;
DROP POLICY IF EXISTS "Permitir atualização pública campanhas" ON campanhas;
DROP POLICY IF EXISTS "Permitir exclusão pública campanhas" ON campanhas;

-- Políticas para campanhas
CREATE POLICY "Permitir leitura pública campanhas" 
  ON campanhas FOR SELECT 
  USING (true);

CREATE POLICY "Permitir inserção pública campanhas" 
  ON campanhas FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir atualização pública campanhas" 
  ON campanhas FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir exclusão pública campanhas" 
  ON campanhas FOR DELETE 
  USING (true);

-- 5. Dados de Exemplo (opcional)
-- ========================================
INSERT INTO campanhas (nome, descricao, valor_meta, data_inicio, data_fim, ativa) VALUES
  ('Campanha de Lançamento', 'Promoção especial de lançamento dos novos serviços', 25000.00, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true),
  ('Black Friday 2024', 'Mega promoção de Black Friday com descontos especiais', 100000.00, '2024-11-22', '2024-11-29', false)
ON CONFLICT DO NOTHING;

-- Verificar
SELECT * FROM campanhas;

-- Mensagem de confirmação
SELECT 'Tabela de campanhas criada com sucesso!' as status;

