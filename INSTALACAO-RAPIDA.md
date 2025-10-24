# 🚀 Guia de Instalação Rápida

## Passo 1: Instalar Dependências

```bash
npm install
```

## Passo 2: Configurar Supabase

### 2.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha os dados e aguarde a criação

### 2.2 Criar Tabelas no Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor SQL
5. Clique em "Run" ou pressione `Ctrl + Enter`

### 2.3 Obter Credenciais

1. Vá em **Settings** (ícone de engrenagem) → **API**
2. Você verá:
   - **Project URL** (exemplo: `https://xxxxx.supabase.co`)
   - **Project API keys** → **anon public** (uma chave longa)

## Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo `env-example.txt` para `.env.local`:

```bash
# No Windows PowerShell:
Copy-Item env-example.txt .env.local

# Ou crie manualmente o arquivo .env.local
```

2. Abra `.env.local` e substitua pelos seus dados:

```env
NEXT_PUBLIC_SUPABASE_URL=https://sua-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

## Passo 4: Executar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## ✅ Pronto!

Agora você pode:
- ✅ Adicionar vendas
- ✅ Configurar metas
- ✅ Visualizar gráficos
- ✅ Acompanhar o progresso

## ⚠️ Problemas Comuns

### Erro: "Invalid API key"
- Verifique se copiou a chave correta (anon/public)
- Certifique-se que não há espaços extras

### Erro: "relation vendas does not exist"
- Execute o script SQL `supabase-setup.sql` no SQL Editor

### Erro ao inserir dados
- Verifique as políticas RLS no Supabase
- Confirme que as tabelas foram criadas corretamente

## 📞 Suporte

Qualquer dúvida, verifique o arquivo `README.md` completo.

