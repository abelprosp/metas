'use client'

import { useState, useEffect } from 'react'
import { supabase, Campanha } from '@/lib/supabase'

interface ConfiguracaoCampanhaProps {
  onSuccess: () => void
}

export default function ConfiguracaoCampanha({ onSuccess }: ConfiguracaoCampanhaProps) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valorMeta, setValorMeta] = useState(0)
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [ativa, setAtiva] = useState(true)
  const [loading, setLoading] = useState(false)
  const [campanhas, setCampanhas] = useState<Campanha[]>([])

  useEffect(() => {
    carregarCampanhas()
    
    // Definir data de início como hoje
    const hoje = new Date().toISOString().split('T')[0]
    setDataInicio(hoje)
    
    // Definir data de fim como 30 dias depois
    const fimPadrao = new Date()
    fimPadrao.setDate(fimPadrao.getDate() + 30)
    setDataFim(fimPadrao.toISOString().split('T')[0])
  }, [])

  const carregarCampanhas = async () => {
    try {
      const { data, error } = await supabase
        .from('campanhas')
        .select('*')
        .order('data_inicio', { ascending: false })

      if (error) {
        console.error('Erro ao carregar campanhas:', error)
      } else {
        setCampanhas(data || [])
      }
    } catch (error) {
      console.error('Erro ao carregar campanhas:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('campanhas').insert({
        nome,
        descricao: descricao || null,
        valor_meta: valorMeta,
        data_inicio: dataInicio,
        data_fim: dataFim,
        ativa,
      })

      if (error) {
        console.error('Erro ao criar campanha:', error)
        alert('Erro ao criar campanha. Verifique o console.')
      } else {
        alert('Campanha criada com sucesso!')
        // Resetar formulário
        setNome('')
        setDescricao('')
        setValorMeta(0)
        const hoje = new Date().toISOString().split('T')[0]
        setDataInicio(hoje)
        const fimPadrao = new Date()
        fimPadrao.setDate(fimPadrao.getDate() + 30)
        setDataFim(fimPadrao.toISOString().split('T')[0])
        setAtiva(true)
        await carregarCampanhas()
        onSuccess()
      }
    } catch (error) {
      console.error('Erro ao criar campanha:', error)
      alert('Erro ao criar campanha.')
    } finally {
      setLoading(false)
    }
  }

  const toggleCampanhaAtiva = async (id: number, ativaAtual: boolean) => {
    try {
      const { error } = await supabase
        .from('campanhas')
        .update({ ativa: !ativaAtual, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) {
        console.error('Erro ao atualizar campanha:', error)
        alert('Erro ao atualizar campanha.')
      } else {
        await carregarCampanhas()
        onSuccess()
      }
    } catch (error) {
      console.error('Erro ao atualizar campanha:', error)
    }
  }

  const deletarCampanha = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta campanha?')) return

    try {
      const { error } = await supabase
        .from('campanhas')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao excluir campanha:', error)
        alert('Erro ao excluir campanha.')
      } else {
        await carregarCampanhas()
        onSuccess()
      }
    } catch (error) {
      console.error('Erro ao excluir campanha:', error)
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const calcularDiasRestantes = (dataFim: string) => {
    const hoje = new Date()
    const fim = new Date(dataFim)
    const diff = fim.getTime() - hoje.getTime()
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return dias
  }

  return (
    <div className="space-y-6">
      {/* Formulário de Nova Campanha */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Criar Nova Campanha
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome da Campanha */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Campanha *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Promoção Black Friday 2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (opcional)
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Detalhes sobre a campanha..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Valor da Meta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta de Vendas (R$) *
              </label>
              <input
                type="number"
                value={valorMeta}
                onChange={(e) => setValorMeta(Number(e.target.value))}
                min="0"
                step="0.01"
                placeholder="Ex: 25000.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Status Ativa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center h-[42px]">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ativa}
                    onChange={(e) => setAtiva(e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">
                    {ativa ? 'Campanha Ativa' : 'Campanha Inativa'}
                  </span>
                </label>
              </div>
            </div>

            {/* Data de Início */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Início *
              </label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Data de Fim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Fim *
              </label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando...' : 'Criar Campanha'}
          </button>
        </form>
      </div>

      {/* Lista de Campanhas */}
      {campanhas.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Campanhas Cadastradas
          </h3>
          <div className="space-y-4">
            {campanhas.map((campanha) => {
              const diasRestantes = calcularDiasRestantes(campanha.data_fim)
              const jaIniciou = new Date(campanha.data_inicio) <= new Date()
              const jaTerminou = new Date(campanha.data_fim) < new Date()

              return (
                <div
                  key={campanha.id}
                  className={`border rounded-lg p-4 ${
                    campanha.ativa && jaIniciou && !jaTerminou
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg text-gray-800">
                          {campanha.nome}
                        </h4>
                        {campanha.ativa && jaIniciou && !jaTerminou && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            ATIVA
                          </span>
                        )}
                        {!campanha.ativa && (
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                            PAUSADA
                          </span>
                        )}
                        {jaTerminou && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                            ENCERRADA
                          </span>
                        )}
                        {!jaIniciou && campanha.ativa && (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            AGENDADA
                          </span>
                        )}
                      </div>
                      {campanha.descricao && (
                        <p className="text-sm text-gray-600 mt-1">
                          {campanha.descricao}
                        </p>
                      )}
                      <div className="mt-3 grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Meta</p>
                          <p className="font-semibold text-purple-600">
                            {formatarMoeda(campanha.valor_meta)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Período</p>
                          <p className="text-sm text-gray-700">
                            {formatarData(campanha.data_inicio)} - {formatarData(campanha.data_fim)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            {diasRestantes >= 0 ? 'Dias Restantes' : 'Dias Encerrada'}
                          </p>
                          <p className={`text-sm font-semibold ${
                            diasRestantes > 7 ? 'text-green-600' :
                            diasRestantes > 0 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {diasRestantes >= 0 ? `${diasRestantes} dias` : `${Math.abs(diasRestantes)} dias atrás`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleCampanhaAtiva(campanha.id, campanha.ativa)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          campanha.ativa
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                        title={campanha.ativa ? 'Pausar' : 'Ativar'}
                      >
                        {campanha.ativa ? 'Pausar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => deletarCampanha(campanha.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded text-sm font-medium"
                        title="Excluir"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

