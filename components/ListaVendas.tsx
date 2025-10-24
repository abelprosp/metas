'use client'

import { Venda } from '@/lib/supabase'

interface ListaVendasProps {
  vendas: Venda[]
}

export default function ListaVendas({ vendas }: ListaVendasProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const getNomeServico = (servico: string) => {
    switch (servico) {
      case 'redorbai':
        return 'Redorbai Chat'
      case 'linhas':
        return 'Linhas Telefônicas'
      case 'equipamentos':
        return 'Equipamentos'
      case 'treinamentos':
        return 'Treinamentos'
      default:
        return servico
    }
  }

  const getCorServico = (servico: string) => {
    switch (servico) {
      case 'redorbai':
        return 'bg-blue-100 text-blue-800'
      case 'linhas':
        return 'bg-green-100 text-green-800'
      case 'equipamentos':
        return 'bg-orange-100 text-orange-800'
      case 'treinamentos':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (vendas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhuma venda registrada ainda</p>
        <p className="text-sm mt-2">Adicione sua primeira venda usando o botão acima</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Data</th>
            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Serviço</th>
            <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Qtd</th>
            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm hidden md:table-cell">Valor Unit.</th>
            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Total</th>
            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm hidden lg:table-cell">Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr
              key={venda.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{formatarData(venda.data)}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCorServico(venda.servico)}`}>
                  {getNomeServico(venda.servico)}
                </span>
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-center text-gray-800 font-medium text-xs sm:text-sm">
                {venda.quantidade}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-gray-600 text-xs sm:text-sm hidden md:table-cell">
                {formatarMoeda(venda.valor_unitario)}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold text-green-600 text-xs sm:text-sm">
                {formatarMoeda(venda.valor_total)}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden lg:table-cell">
                {venda.vendedor || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

