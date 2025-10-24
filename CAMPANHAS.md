# 🎯 Sistema de Campanhas

## Visão Geral

O sistema de campanhas permite criar e gerenciar promoções e eventos especiais com período definido, meta de vendas específica e acompanhamento em tempo real.

## 📋 Características

### Campos da Campanha

- **Nome**: Identificação da campanha (obrigatório)
- **Descrição**: Detalhes sobre a campanha (opcional)
- **Meta de Vendas**: Valor alvo em R$ (obrigatório)
- **Data de Início**: Quando a campanha começa (obrigatório)
- **Data de Fim**: Quando a campanha termina (obrigatório)
- **Status**: Ativa ou Pausada (padrão: ativa)

### Status de Campanhas

As campanhas podem ter os seguintes status:

- **✅ ATIVA**: Campanha em andamento dentro do período
- **⏸ PAUSADA**: Campanha desativada manualmente
- **⏰ AGENDADA**: Campanha criada mas ainda não iniciou
- **✕ ENCERRADA**: Campanha que passou da data de fim

## 🚀 Como Usar

### Criar Nova Campanha

1. No dashboard, clique em **"🎯 Gerenciar Campanhas"**
2. Preencha o formulário:
   - Nome da campanha
   - Descrição (opcional)
   - Meta de vendas em reais
   - Selecione a data de início
   - Selecione a data de fim
   - Marque se está ativa
3. Clique em **"💾 Criar Campanha"**

### Gerenciar Campanhas Existentes

Na lista de campanhas cadastradas, você pode:

- **Pausar/Ativar**: Clique no botão ⏸/▶ para pausar ou ativar
- **Excluir**: Clique no botão 🗑 para remover (pede confirmação)

### Visualização no Dashboard

Campanhas **ativas** e **em andamento** aparecem automaticamente no dashboard principal com:

- Nome e descrição
- Meta de vendas
- Total vendido no período
- Percentual de progresso
- Barra de progresso visual
- Período da campanha
- Dias restantes

## 📊 Cálculo de Progresso

O progresso da campanha é calculado automaticamente:

1. Sistema filtra vendas dentro do período (data_inicio até data_fim)
2. Soma o valor total dessas vendas
3. Calcula o percentual: `(total_vendido / meta) * 100`

**Exemplo:**
- Campanha: "Black Friday 2024"
- Período: 22/11/2024 a 29/11/2024
- Meta: R$ 100.000,00
- Total vendido no período: R$ 45.000,00
- Progresso: 45%

## 💡 Casos de Uso

### 1. Promoção Sazonal

```
Nome: Black Friday 2024
Descrição: Mega promoção de fim de ano
Meta: R$ 150.000,00
Início: 22/11/2024
Fim: 29/11/2024
```

### 2. Campanha de Lançamento

```
Nome: Lançamento Redorbai Plus
Descrição: Campanha de lançamento do novo plano
Meta: R$ 50.000,00
Início: 01/12/2024
Fim: 31/12/2024
```

### 3. Desafio Mensal

```
Nome: Desafio Dezembro
Descrição: Meta extra para o time de vendas
Meta: R$ 80.000,00
Início: 01/12/2024
Fim: 31/12/2024
```

### 4. Campanha por Serviço

```
Nome: Semana do Equipamento
Descrição: Foco em venda de equipamentos
Meta: R$ 30.000,00
Início: 04/12/2024
Fim: 10/12/2024
```

## 🎨 Recursos Visuais

### Cores e Indicadores

- **Verde** (>7 dias restantes): Campanha no prazo
- **Laranja** (≤7 dias): Atenção, prazo acabando
- **Vermelho** (encerrada): Campanha finalizada

### Barra de Progresso

- Preenchimento dinâmico de 0% a 100%
- Atualização automática conforme vendas

## ⚙️ Configurações Técnicas

### Banco de Dados

A tabela `campanhas` armazena:
- ID único auto-incremento
- Dados da campanha
- Timestamps de criação e atualização
- Constraint: data_fim >= data_inicio

### Relacionamento com Vendas

- Campo `campanha_id` na tabela vendas (opcional)
- Vendas associadas a campanhas (futura implementação)
- Cálculo de progresso baseado em período de datas

## 📈 Benefícios

1. **Foco em Objetivos**: Metas específicas para períodos definidos
2. **Motivação da Equipe**: Visualização clara do progresso
3. **Múltiplas Campanhas**: Execute várias campanhas simultaneamente
4. **Flexibilidade**: Pause, reative ou encerre campanhas conforme necessário
5. **Análise de Performance**: Compare resultados de diferentes campanhas

## 🔧 Manutenção

### Limpar Campanhas Antigas

```sql
-- Ver campanhas encerradas
SELECT * FROM campanhas WHERE data_fim < CURRENT_DATE;

-- Deletar campanhas antigas (cuidado!)
DELETE FROM campanhas WHERE data_fim < CURRENT_DATE - INTERVAL '6 months';
```

### Reativar Campanha

```sql
-- Reativar campanha específica
UPDATE campanhas SET ativa = true WHERE id = 1;
```

### Estender Campanha

```sql
-- Estender prazo de campanha
UPDATE campanhas 
SET data_fim = '2024-12-31', updated_at = NOW() 
WHERE id = 1;
```

## ⚠️ Dicas Importantes

1. **Planejamento**: Crie campanhas com antecedência
2. **Metas Realistas**: Defina metas alcançáveis mas desafiadoras
3. **Acompanhamento**: Monitore diariamente o progresso
4. **Múltiplas Campanhas**: Não sobreponha muitas campanhas
5. **Análise Posterior**: Revise resultados após o encerramento

## 🆘 Problemas Comuns

### Campanha não aparece no dashboard

**Possíveis causas:**
- Status está como "inativa"
- Data de início ainda não chegou
- Data de fim já passou

**Solução:**
- Verifique o status na lista de campanhas
- Confirme as datas
- Ative a campanha se necessário

### Progresso não atualiza

**Possíveis causas:**
- Vendas fora do período da campanha
- Cache do navegador

**Solução:**
- Clique em "🔄 Atualizar"
- Verifique as datas das vendas
- Atualize a página (F5)

## 📞 Suporte

Para dúvidas sobre campanhas:
1. Verifique se a data de início/fim estão corretas
2. Confirme que a campanha está ativa
3. Verifique se há vendas no período

