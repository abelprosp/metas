-- ========================================
-- DADOS FAKE PARA TESTAR O DASHBOARD
-- ========================================
-- Execute este script no SQL Editor do Supabase para popular o banco com dados de exemplo

-- Limpar dados existentes (opcional - descomente se quiser começar do zero)
-- DELETE FROM vendas;
-- DELETE FROM metas;

-- ========================================
-- 1. CRIAR META DO MÊS ATUAL
-- ========================================
INSERT INTO metas (mes, valor_meta) 
VALUES (
  TO_CHAR(CURRENT_DATE, 'YYYY-MM'),
  75000.00
) ON CONFLICT (mes) DO UPDATE SET valor_meta = 75000.00;

-- ========================================
-- 2. VENDAS DO MÊS ATUAL
-- ========================================

-- Semana 1 (dias 1-7)
INSERT INTO vendas (data, servico, quantidade, valor_unitario, valor_total, vendedor, observacoes) VALUES
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '0 days', 'redorbai', 3, 147.00, 441.00, 'João Silva', 'Cliente novo - indicação'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '0 days', 'linhas', 5, 89.90, 449.50, 'Maria Santos', 'Empresa ABC Ltda'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 day', 'equipamentos', 2, 450.00, 900.00, 'Pedro Costa', 'Aparelhos Motorola'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 day', 'redorbai', 1, 147.00, 147.00, 'Ana Paula', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '2 days', 'linhas', 3, 95.00, 285.00, 'Carlos Mendes', 'Luxus Premium'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '2 days', 'redorbai', 2, 147.00, 294.00, 'João Silva', 'Renovação'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '3 days', 'equipamentos', 1, 890.00, 890.00, 'Maria Santos', 'Telefone IP'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '3 days', 'equipamentos', 3, 320.00, 960.00, 'Pedro Costa', 'Headsets'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '4 days', 'redorbai', 4, 147.00, 588.00, 'Ana Paula', 'Promoção empresarial'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '4 days', 'linhas', 2, 89.90, 179.80, 'Carlos Mendes', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '5 days', 'equipamentos', 1, 1200.00, 1200.00, 'João Silva', 'Central telefônica'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '6 days', 'redorbai', 2, 147.00, 294.00, 'Maria Santos', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '6 days', 'linhas', 4, 89.90, 359.60, 'Pedro Costa', 'Empresa XYZ'),

-- Semana 2 (dias 8-14)
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '7 days', 'equipamentos', 2, 560.00, 1120.00, 'Ana Paula', 'Smartphones corporativos'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '8 days', 'redorbai', 5, 147.00, 735.00, 'João Silva', 'Grande cliente'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '8 days', 'linhas', 6, 95.00, 570.00, 'Carlos Mendes', 'Plano premium'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '9 days', 'equipamentos', 1, 450.00, 450.00, 'Maria Santos', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '9 days', 'redorbai', 1, 147.00, 147.00, 'Pedro Costa', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '10 days', 'linhas', 8, 89.90, 719.20, 'Ana Paula', 'Expansão escritório'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '10 days', 'redorbai', 3, 147.00, 441.00, 'João Silva', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '11 days', 'equipamentos', 4, 380.00, 1520.00, 'Carlos Mendes', 'Tablets para equipe'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '12 days', 'redorbai', 2, 147.00, 294.00, 'Maria Santos', 'Cliente recorrente'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '12 days', 'linhas', 3, 95.00, 285.00, 'Pedro Costa', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '13 days', 'equipamentos', 1, 750.00, 750.00, 'Ana Paula', 'Notebook'),

-- Semana 3 (dias 15-21)
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '14 days', 'redorbai', 6, 147.00, 882.00, 'João Silva', 'Mega venda!'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '14 days', 'linhas', 5, 89.90, 449.50, 'Carlos Mendes', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '15 days', 'equipamentos', 2, 490.00, 980.00, 'Maria Santos', 'Roteadores'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '15 days', 'redorbai', 1, 147.00, 147.00, 'Pedro Costa', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '16 days', 'linhas', 4, 95.00, 380.00, 'Ana Paula', 'Plano corporativo'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '16 days', 'redorbai', 3, 147.00, 441.00, 'João Silva', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '17 days', 'equipamentos', 5, 280.00, 1400.00, 'Carlos Mendes', 'Webcams HD'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '17 days', 'linhas', 2, 89.90, 179.80, 'Maria Santos', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '18 days', 'redorbai', 4, 147.00, 588.00, 'Pedro Costa', 'Renovação anual'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '19 days', 'equipamentos', 1, 1500.00, 1500.00, 'Ana Paula', 'Servidor VoIP'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '19 days', 'redorbai', 2, 147.00, 294.00, 'João Silva', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '20 days', 'linhas', 7, 89.90, 629.30, 'Carlos Mendes', 'Nova filial'),

-- Semana 4 (dias 22-28)
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '21 days', 'equipamentos', 3, 420.00, 1260.00, 'Maria Santos', 'Monitores'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '21 days', 'redorbai', 5, 147.00, 735.00, 'Pedro Costa', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '22 days', 'linhas', 3, 95.00, 285.00, 'Ana Paula', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '22 days', 'redorbai', 1, 147.00, 147.00, 'João Silva', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '23 days', 'equipamentos', 2, 680.00, 1360.00, 'Carlos Mendes', 'Impressoras'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '23 days', 'linhas', 4, 89.90, 359.60, 'Maria Santos', NULL),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '24 days', 'redorbai', 3, 147.00, 441.00, 'Pedro Costa', 'Fechamento mensal'),
  (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '24 days', 'equipamentos', 1, 890.00, 890.00, 'Ana Paula', NULL)
ON CONFLICT DO NOTHING;

-- ========================================
-- 3. META DO MÊS ANTERIOR
-- ========================================
INSERT INTO metas (mes, valor_meta) 
VALUES (
  TO_CHAR(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM'),
  65000.00
) ON CONFLICT (mes) DO UPDATE SET valor_meta = 65000.00;

-- ========================================
-- 4. ALGUMAS VENDAS DO MÊS ANTERIOR
-- ========================================
INSERT INTO vendas (data, servico, quantidade, valor_unitario, valor_total, vendedor, observacoes) VALUES
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') + INTERVAL '5 days', 'redorbai', 8, 147.00, 1176.00, 'João Silva', 'Venda recorde'),
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') + INTERVAL '10 days', 'linhas', 10, 89.90, 899.00, 'Maria Santos', NULL),
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') + INTERVAL '15 days', 'equipamentos', 6, 500.00, 3000.00, 'Pedro Costa', 'Pacote completo'),
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') + INTERVAL '20 days', 'redorbai', 5, 147.00, 735.00, 'Ana Paula', NULL),
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') + INTERVAL '25 days', 'linhas', 7, 95.00, 665.00, 'Carlos Mendes', NULL)
ON CONFLICT DO NOTHING;

-- ========================================
-- VERIFICAÇÃO DOS DADOS
-- ========================================

-- Ver total de vendas do mês atual
SELECT 
  servico,
  COUNT(*) as total_vendas,
  SUM(quantidade) as total_unidades,
  SUM(valor_total) as valor_total
FROM vendas
WHERE data >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY servico
ORDER BY servico;

-- Ver total geral do mês
SELECT 
  COUNT(*) as total_vendas,
  SUM(valor_total) as valor_total_mes
FROM vendas
WHERE data >= DATE_TRUNC('month', CURRENT_DATE);

-- Ver progresso da meta
SELECT 
  m.mes,
  m.valor_meta,
  COALESCE(SUM(v.valor_total), 0) as valor_atual,
  ROUND((COALESCE(SUM(v.valor_total), 0) / m.valor_meta * 100)::numeric, 2) as progresso_percentual
FROM metas m
LEFT JOIN vendas v ON TO_CHAR(v.data, 'YYYY-MM') = m.mes
WHERE m.mes = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
GROUP BY m.mes, m.valor_meta;

