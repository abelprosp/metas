'use client'

import { useState, useEffect } from 'react'
import { supabase, Meta } from '@/lib/supabase'

interface ConfiguracaoMetaProps {
  metaAtual: Meta | null
  onSuccess: () => void
}

export default function ConfiguracaoMeta({ metaAtual, onSuccess }: ConfiguracaoMetaProps) {
  const [valorMeta, setValorMeta] = useState(0)
  const [mes, setMes] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (metaAtual) {
      setValorMeta(metaAtual.valor_meta)
      setMes(metaAtual.mes)
    } else {
      // Definir mês atual
      const hoje = new Date()
      const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`
      setMes(mesAtual)
    }
  }, [metaAtual])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (metaAtual) {
        // Atualizar meta existente
        const { error } = await supabase
          .from('metas')
          .update({ valor_meta: valorMeta, updated_at: new Date().toISOString() })
          .eq('id', metaAtual.id)

        if (error) {
          console.error('Erro ao atualizar meta:', error)
          alert('Erro ao atualizar meta. Verifique o console.')
        } else {
          alert('Meta atualizada com sucesso!')
          onSuccess()
        }
      } else {
        // Criar nova meta
        const { error } = await supabase.from('metas').insert({
          mes,
          valor_meta: valorMeta,
        })

        if (error) {
          console.error('Erro ao criar meta:', error)
          alert('Erro ao criar meta. Verifique o console.')
        } else {
          alert('Meta criada com sucesso!')
          onSuccess()
        }
      }
    } catch (error) {
      console.error('Erro ao salvar meta:', error)
      alert('Erro ao salvar meta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Configurar Meta Mensal
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mês */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mês
            </label>
            <input
              type="month"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={!!metaAtual}
            />
            {metaAtual && (
              <p className="text-xs text-gray-500 mt-1">
                Não é possível alterar o mês de uma meta existente
              </p>
            )}
          </div>

          {/* Valor da Meta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor da Meta (R$)
            </label>
            <input
              type="number"
              value={valorMeta}
              onChange={(e) => setValorMeta(Number(e.target.value))}
              min="0"
              step="0.01"
              placeholder="Ex: 50000.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Botão de Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : metaAtual ? 'Atualizar Meta' : 'Criar Meta'}
        </button>
      </form>
    </div>
  )
}

