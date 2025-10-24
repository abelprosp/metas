# 🗂️ Gerenciar Dados do Dashboard

## 📋 Scripts Disponíveis

### 1. `dados-fake.sql` - Adicionar Dados de Teste
Use este script para popular o dashboard com dados de exemplo para testes.

**O que adiciona:**
- ✅ Meta do mês atual (R$ 75.000)
- ✅ 45+ vendas do mês atual distribuídas ao longo do mês
- ✅ Vendas dos 3 serviços (Redorbai, Linhas, Equipamentos)
- ✅ Meta e vendas do mês anterior
- ✅ Diferentes vendedores e valores

### 2. `limpar-dados.sql` - Limpar Todos os Dados
Use este script para remover TODOS os dados do dashboard.

**⚠️ ATENÇÃO:** Este script apaga permanentemente:
- ❌ Todas as vendas
- ❌ Todas as metas
- ❌ Reseta os contadores de ID

---

## 🚀 Como Usar

### Para ADICIONAR dados fake:

1. Abra o Supabase
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Copie e cole o conteúdo de `dados-fake.sql`
5. Clique em **Run** (ou `Ctrl + Enter`)
6. Atualize o dashboard no navegador

### Para LIMPAR todos os dados:

1. Abra o Supabase
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Copie e cole o conteúdo de `limpar-dados.sql`
5. Clique em **Run** (ou `Ctrl + Enter`)
6. Atualize o dashboard no navegador

---

## 💡 Dicas

### Começar do Zero
Se você quer limpar tudo e começar com dados reais:
```sql
-- Execute apenas isto no SQL Editor:
DELETE FROM vendas;
DELETE FROM metas;
```

### Manter Estrutura, Limpar Dados
Se quiser manter as tabelas mas remover os dados:
```sql
-- Remove apenas os dados de exemplo, mantém dados reais se houver
DELETE FROM vendas WHERE vendedor IN ('João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Paula', 'Carlos Mendes');
```

### Ver Estatísticas Atuais
```sql
-- Ver total de vendas
SELECT COUNT(*) as total_vendas, SUM(valor_total) as valor_total FROM vendas;

-- Ver vendas por serviço
SELECT servico, COUNT(*) as quantidade, SUM(valor_total) as total 
FROM vendas 
GROUP BY servico;

-- Ver metas cadastradas
SELECT * FROM metas ORDER BY mes DESC;
```

---

## 🔄 Workflow Recomendado

1. **Desenvolvimento/Testes:** Use `dados-fake.sql` para testar o dashboard
2. **Antes de usar em produção:** Execute `limpar-dados.sql`
3. **Produção:** Adicione dados reais através da interface do dashboard
4. **Novo mês:** Configure a meta do novo mês através do dashboard

---

## ⚠️ Avisos Importantes

- ⚠️ Não há como desfazer após executar `limpar-dados.sql`
- ⚠️ Sempre faça backup antes de limpar dados importantes
- ⚠️ Em produção, crie políticas de RLS apropriadas para proteger os dados
- ⚠️ Os scripts fake são apenas para testes e desenvolvimento

