'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface FormularioVendaProps {
  onSuccess: () => void
}

export default function FormularioVenda({ onSuccess }: FormularioVendaProps) {
  const [servico, setServico] = useState<'redorbai' | 'linhas' | 'equipamentos' | 'treinamentos'>('redorbai')
  const [quantidade, setQuantidade] = useState(1)
  const [valorUnitario, setValorUnitario] = useState(147)
  const [vendedor, setVendedor] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [data, setData] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  const handleServicoChange = (novoServico: 'redorbai' | 'linhas' | 'equipamentos' | 'treinamentos') => {
    setServico(novoServico)
    if (novoServico === 'redorbai') {
      setValorUnitario(147)
    } else {
      setValorUnitario(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const valorTotal = quantidade * valorUnitario

      const { error } = await supabase.from('vendas').insert({
        data,
        servico,
        quantidade,
        valor_unitario: valorUnitario,
        valor_total: valorTotal,
        vendedor: vendedor || null,
        observacoes: observacoes || null,
      })

      if (error) {
        console.error('Erro ao salvar venda:', error)
        alert('Erro ao salvar venda. Verifique o console.')
      } else {
        alert('Venda registrada com sucesso!')
        // Resetar formulário
        setQuantidade(1)
        setValorUnitario(servico === 'redorbai' ? 147 : 0)
        setVendedor('')
        setObservacoes('')
        setData(new Date().toISOString().split('T')[0])
        onSuccess()
      }
    } catch (error) {
      console.error('Erro ao salvar venda:', error)
      alert('Erro ao salvar venda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Registrar Nova Venda
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Serviço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serviço
            </label>
            <select
              value={servico}
              onChange={(e) => handleServicoChange(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="redorbai">Redorbai Chat (R$ 147/mês)</option>
              <option value="linhas">Linhas Telefônicas - Luxus Telefonia</option>
              <option value="equipamentos">Equipamentos - Luxus Digital</option>
              <option value="treinamentos">Treinamentos - Luxus Evolution</option>
            </select>
          </div>

          {/* Quantidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Valor Unitário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Unitário (R$)
            </label>
            <input
              type="number"
              value={valorUnitario}
              onChange={(e) => setValorUnitario(Number(e.target.value))}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={servico === 'redorbai'}
            />
          </div>

          {/* Vendedor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendedor (opcional)
            </label>
            <input
              type="text"
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
              placeholder="Nome do vendedor"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Valor Total (calculado) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Total
            </label>
            <div className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-green-600">
              R$ {(quantidade * valorUnitario).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Observações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observações (opcional)
          </label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Informações adicionais sobre a venda"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Botão de Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Salvar Venda'}
        </button>
      </form>
    </div>
  )
}

