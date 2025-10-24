'use client'

import { useEffect, useState } from 'react'
import { supabase, Venda, Meta, Campanha } from '@/lib/supabase'
import Dashboard from '@/components/Dashboard'
import FormularioVenda from '@/components/FormularioVenda'
import ConfiguracaoMeta from '@/components/ConfiguracaoMeta'
import ConfiguracaoCampanha from '@/components/ConfiguracaoCampanha'

export default function Home() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarConfigMeta, setMostrarConfigMeta] = useState(false)
  const [mostrarConfigCampanha, setMostrarConfigCampanha] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      setLoading(true)
      
      // Carregar vendas do mês atual
      const inicioMes = new Date()
      inicioMes.setDate(1)
      inicioMes.setHours(0, 0, 0, 0)
      
      const { data: vendasData, error: vendasError } = await supabase
        .from('vendas')
        .select('*')
        .gte('data', inicioMes.toISOString())
        .order('data', { ascending: false })

      if (vendasError) {
        console.error('Erro ao carregar vendas:', vendasError)
      } else {
        setVendas(vendasData || [])
      }

      // Carregar meta do mês atual
      const mesAtual = `${inicioMes.getFullYear()}-${String(inicioMes.getMonth() + 1).padStart(2, '0')}`
      
      const { data: metaData, error: metaError } = await supabase
        .from('metas')
        .select('*')
        .eq('mes', mesAtual)
        .single()

      if (metaError) {
        console.error('Erro ao carregar meta:', metaError)
      } else {
        setMeta(metaData)
      }

      // Carregar campanhas ativas
      const { data: campanhasData, error: campanhasError } = await supabase
        .from('campanhas')
        .select('*')
        .eq('ativa', true)
        .order('data_inicio', { ascending: false })

      if (campanhasError) {
        console.error('Erro ao carregar campanhas:', campanhasError)
      } else {
        setCampanhas(campanhasData || [])
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNovaVenda = async () => {
    await carregarDados()
    setMostrarFormulario(false)
  }

  const handleMetaAtualizada = async () => {
    await carregarDados()
    setMostrarConfigMeta(false)
  }

  const handleCampanhaAtualizada = async () => {
    await carregarDados()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Dashboard de Vendas
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Acompanhamento de vendas e metas - Luxus
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold shadow-lg transition-all"
          >
            {mostrarFormulario ? 'Fechar' : 'Nova Venda'}
          </button>
          <button
            onClick={() => setMostrarConfigMeta(!mostrarConfigMeta)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold shadow-lg transition-all"
          >
            {mostrarConfigMeta ? 'Fechar' : 'Meta'}
          </button>
          <button
            onClick={() => setMostrarConfigCampanha(!mostrarConfigCampanha)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold shadow-lg transition-all col-span-2 sm:col-span-1"
          >
            {mostrarConfigCampanha ? 'Fechar' : 'Campanhas'}
          </button>
          <button
            onClick={carregarDados}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold shadow-lg transition-all hidden sm:block"
          >
            Atualizar
          </button>
        </div>

        {/* Formulário de Nova Venda */}
        {mostrarFormulario && (
          <div className="mb-6">
            <FormularioVenda onSuccess={handleNovaVenda} />
          </div>
        )}

        {/* Configuração de Meta */}
        {mostrarConfigMeta && (
          <div className="mb-6">
            <ConfiguracaoMeta metaAtual={meta} onSuccess={handleMetaAtualizada} />
          </div>
        )}

        {/* Configuração de Campanhas */}
        {mostrarConfigCampanha && (
          <div className="mb-6">
            <ConfiguracaoCampanha onSuccess={handleCampanhaAtualizada} />
          </div>
        )}

        {/* Dashboard Principal */}
        <Dashboard vendas={vendas} meta={meta} campanhas={campanhas} />
      </div>
    </main>
  )
}

