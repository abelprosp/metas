'use client'

import { Venda, Meta, Campanha } from '@/lib/supabase'
import { useMemo } from 'react'
import GraficoVendas from './GraficoVendas'
import ListaVendas from './ListaVendas'

interface DashboardProps {
  vendas: Venda[]
  meta: Meta | null
  campanhas: Campanha[]
}

export default function Dashboard({ vendas, meta, campanhas }: DashboardProps) {
  const estatisticas = useMemo(() => {
    const totalVendas = vendas.reduce((acc, venda) => acc + venda.valor_total, 0)
    
    const vendasRedorbai = vendas.filter(v => v.servico === 'redorbai')
    const totalRedorbai = vendasRedorbai.reduce((acc, v) => acc + v.valor_total, 0)
    const qtdRedorbai = vendasRedorbai.reduce((acc, v) => acc + v.quantidade, 0)
    
    const vendasLinhas = vendas.filter(v => v.servico === 'linhas')
    const totalLinhas = vendasLinhas.reduce((acc, v) => acc + v.valor_total, 0)
    const qtdLinhas = vendasLinhas.reduce((acc, v) => acc + v.quantidade, 0)
    
    const vendasEquipamentos = vendas.filter(v => v.servico === 'equipamentos')
    const totalEquipamentos = vendasEquipamentos.reduce((acc, v) => acc + v.valor_total, 0)
    const qtdEquipamentos = vendasEquipamentos.reduce((acc, v) => acc + v.quantidade, 0)
    
    const vendasTreinamentos = vendas.filter(v => v.servico === 'treinamentos')
    const totalTreinamentos = vendasTreinamentos.reduce((acc, v) => acc + v.valor_total, 0)
    const qtdTreinamentos = vendasTreinamentos.reduce((acc, v) => acc + v.quantidade, 0)
    
    const valorMeta = meta?.valor_meta || 0
    const progressoMeta = valorMeta > 0 ? (totalVendas / valorMeta) * 100 : 0

    return {
      totalVendas,
      totalRedorbai,
      qtdRedorbai,
      totalLinhas,
      qtdLinhas,
      totalEquipamentos,
      qtdEquipamentos,
      totalTreinamentos,
      qtdTreinamentos,
      valorMeta,
      progressoMeta,
    }
  }, [vendas, meta])

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const calcularProgressoCampanha = (campanha: Campanha) => {
    const inicio = new Date(campanha.data_inicio)
    const fim = new Date(campanha.data_fim)
    
    // Filtrar vendas dentro do período da campanha
    const vendasCampanha = vendas.filter(v => {
      const dataVenda = new Date(v.data)
      return dataVenda >= inicio && dataVenda <= fim
    })
    
    const totalVendido = vendasCampanha.reduce((acc, v) => acc + v.valor_total, 0)
    const progresso = campanha.valor_meta > 0 ? (totalVendido / campanha.valor_meta) * 100 : 0
    
    return { totalVendido, progresso }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const calcularDiasRestantes = (dataFim: string) => {
    const hoje = new Date()
    const fim = new Date(dataFim)
    const diff = fim.getTime() - hoje.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // Filtrar campanhas ativas e em andamento
  const campanhasAtivas = campanhas.filter(c => {
    const hoje = new Date()
    const inicio = new Date(c.data_inicio)
    const fim = new Date(c.data_fim)
    return c.ativa && inicio <= hoje && fim >= hoje
  })

  return (
    <div className="space-y-6">
      {/* Card da Meta */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Meta do Mês</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p className="text-purple-100 text-xs sm:text-sm mb-1 sm:mb-2">Valor da Meta</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{formatarMoeda(estatisticas.valorMeta)}</p>
          </div>
          <div>
            <p className="text-purple-100 text-xs sm:text-sm mb-1 sm:mb-2">Progresso</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{estatisticas.progressoMeta.toFixed(1)}%</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-6">
          <div className="bg-white/20 rounded-full h-4 sm:h-6 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1 sm:pr-2"
              style={{ width: `${Math.min(estatisticas.progressoMeta, 100)}%` }}
            >
              {estatisticas.progressoMeta > 15 && (
                <span className="text-xs sm:text-sm font-bold text-purple-600">
                  {estatisticas.progressoMeta.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg">
          Total Vendido: <span className="font-bold">{formatarMoeda(estatisticas.totalVendas)}</span>
        </p>
      </div>

      {/* Campanhas Ativas */}
      {campanhasAtivas.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {campanhasAtivas.map(campanha => {
            const { totalVendido, progresso } = calcularProgressoCampanha(campanha)
            const diasRestantes = calcularDiasRestantes(campanha.data_fim)
            
            return (
              <div key={campanha.id} className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold pr-2">{campanha.nome}</h3>
                    {campanha.descricao && (
                      <p className="text-xs sm:text-sm text-orange-100 mt-1">{campanha.descricao}</p>
                    )}
                  </div>
                  <span className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    ATIVA
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs text-orange-100">Meta</p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold truncate">{formatarMoeda(campanha.valor_meta)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-orange-100">Vendido</p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold truncate">{formatarMoeda(totalVendido)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-orange-100">Progresso</p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold">{progresso.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="bg-white/20 rounded-full h-3 sm:h-4 overflow-hidden mb-3">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progresso, 100)}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs sm:text-sm">
                  <span className="truncate">{formatarData(campanha.data_inicio)} - {formatarData(campanha.data_fim)}</span>
                  <span className={`${diasRestantes <= 7 ? 'font-bold' : ''} whitespace-nowrap`}>
                    {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'} restantes
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Cards dos Serviços */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Redorbai Chat */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-500">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Redorbai Chat
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Assinaturas</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{estatisticas.qtdRedorbai}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Valor Total</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {formatarMoeda(estatisticas.totalRedorbai)}
              </p>
            </div>
            <p className="text-xs text-gray-500">R$ 147,00/mês por assinatura</p>
          </div>
        </div>

        {/* Linhas Telefônicas */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-green-500">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Linhas Telefônicas
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Unidades Vendidas</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{estatisticas.qtdLinhas}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Valor Total</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {formatarMoeda(estatisticas.totalLinhas)}
              </p>
            </div>
            <p className="text-xs text-gray-500">Luxus Telefonia</p>
          </div>
        </div>

        {/* Equipamentos */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-orange-500">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Equipamentos
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Unidades Vendidas</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">{estatisticas.qtdEquipamentos}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Valor Total</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {formatarMoeda(estatisticas.totalEquipamentos)}
              </p>
            </div>
            <p className="text-xs text-gray-500">Luxus Digital</p>
          </div>
        </div>

        {/* Treinamentos */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-purple-500">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Treinamentos
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Unidades Vendidas</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{estatisticas.qtdTreinamentos}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Valor Total</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {formatarMoeda(estatisticas.totalTreinamentos)}
              </p>
            </div>
            <p className="text-xs text-gray-500">Luxus Evolution</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Vendas */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Evolução de Vendas
        </h3>
        <GraficoVendas vendas={vendas} />
      </div>

      {/* Lista de Vendas */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Últimas Vendas
        </h3>
        <ListaVendas vendas={vendas} />
      </div>
    </div>
  )
}

