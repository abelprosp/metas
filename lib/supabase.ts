import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL não está configurada. ' +
    'Por favor, adicione as variáveis de ambiente no Vercel ou crie o arquivo .env.local'
  )
}

if (!supabaseAnonKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurada. ' +
    'Por favor, adicione as variáveis de ambiente no Vercel ou crie o arquivo .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Venda = {
  id: number
  data: string
  servico: 'redorbai' | 'linhas' | 'equipamentos' | 'treinamentos'
  quantidade: number
  valor_unitario: number
  valor_total: number
  vendedor?: string
  observacoes?: string
  campanha_id?: number
  created_at: string
}

export type Meta = {
  id: number
  mes: string
  valor_meta: number
  created_at: string
  updated_at: string
}

export type Campanha = {
  id: number
  nome: string
  descricao?: string
  valor_meta: number
  data_inicio: string
  data_fim: string
  ativa: boolean
  created_at: string
  updated_at: string
}

