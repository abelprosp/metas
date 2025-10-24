'use client'

import { Venda } from '@/lib/supabase'
import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface GraficoVendasProps {
  vendas: Venda[]
}

export default function GraficoVendas({ vendas }: GraficoVendasProps) {
  const dadosGrafico = useMemo(() => {
    // Agrupar vendas por dia
    const vendasPorDia = vendas.reduce((acc, venda) => {
      const data = new Date(venda.data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })
      
      if (!acc[data]) {
        acc[data] = {
          data,
          redorbai: 0,
          linhas: 0,
          equipamentos: 0,
          treinamentos: 0,
          total: 0,
        }
      }
      
      acc[data][venda.servico] += venda.valor_total
      acc[data].total += venda.valor_total
      
      return acc
    }, {} as Record<string, any>)
    
    return Object.values(vendasPorDia).sort((a: any, b: any) => {
      const [diaA, mesA] = a.data.split('/')
      const [diaB, mesB] = b.data.split('/')
      return new Date(`2024-${mesA}-${diaA}`).getTime() - new Date(`2024-${mesB}-${diaB}`).getTime()
    })
  }, [vendas])

  if (dadosGrafico.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhuma venda registrada ainda</p>
        <p className="text-sm mt-2">Adicione vendas para visualizar o gráfico</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300} className="sm:!h-[400px]">
      <BarChart data={dadosGrafico}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => `R$ ${value.toFixed(2)}`}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <Legend />
        <Bar dataKey="redorbai" name="Redorbai Chat" fill="#3b82f6" />
        <Bar dataKey="linhas" name="Linhas Telefônicas" fill="#10b981" />
        <Bar dataKey="equipamentos" name="Equipamentos" fill="#f97316" />
        <Bar dataKey="treinamentos" name="Treinamentos" fill="#a855f7" />
      </BarChart>
    </ResponsiveContainer>
  )
}

