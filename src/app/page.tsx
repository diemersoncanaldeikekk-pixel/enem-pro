'use client'

import { useState } from 'react'
import { BookOpen, PenTool, Star, Users, Award, CheckCircle, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react'

export default function Home() {
  const [showPayment, setShowPayment] = useState(false)

  const abrirPagamento = () => {
    window.open('https://pay.kirvano.com/9095f86f-d584-4cc0-9555-e6c31ffe7d7a', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-black text-slate-800">
              ENEM<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pro</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section - Mais Compacto */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Mais de 3 anos no mercado
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
            Conquiste sua vaga no
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              ENEM 2025 e 2026
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            A plataforma mais completa para sua preparação: <strong>simulados inteligentes</strong> com 450 questões e 
            <strong> correção profissional de redação</strong>.
          </p>

          <div className="flex justify-center mb-12">
            <button
              onClick={abrirPagamento}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Começar Agora
            </button>
          </div>

          {/* Estatísticas Compactas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600 mb-1">450</div>
              <div className="text-slate-600 text-sm font-medium">Questões</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 mb-1">9</div>
              <div className="text-slate-600 text-sm font-medium">Matérias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-1">5</div>
              <div className="text-slate-600 text-sm font-medium">Critérios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-600 mb-1">24h</div>
              <div className="text-slate-600 text-sm font-medium">Acesso</div>
            </div>
          </div>
        </div>

        {/* Funcionalidades Principais - Mais Compactas */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Simulados */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Simulados Inteligentes</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Pratique com <strong>50 questões por matéria</strong> em todas as 9 disciplinas do ENEM. 
              Sistema que <strong>salva automaticamente</strong> seu progresso.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                <span>450 questões atualizadas</span>
              </div>
              <div className="flex items-center text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                <span>Progresso salvo automaticamente</span>
              </div>
              <div className="flex items-center text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                <span>Resultados detalhados</span>
              </div>
            </div>
          </div>

          {/* Correção de Redação */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Correção Profissional</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Tenha sua redação corrigida seguindo <strong>rigorosamente os 5 critérios do ENEM</strong>. 
              Receba feedback detalhado e <strong>sugestões personalizadas</strong>.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                <span>Correção pelos 5 critérios oficiais</span>
              </div>
              <div className="flex items-center text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                <span>Feedback detalhado e personalizado</span>
              </div>
              <div className="flex items-center text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                <span>Assistente para tirar dúvidas</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final Compacto */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para conquistar sua vaga?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se aos milhares de estudantes que já estão se preparando conosco.
          </p>
          
          <button
            onClick={abrirPagamento}
            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Adquirir Agora
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 mt-16 border-t border-slate-200">
          <p className="text-slate-600">
            <strong>ENEMPro</strong> - Estamos há mais de <span className="font-bold text-slate-800">3 anos</span> no mercado 
            ajudando estudantes a conquistar seus sonhos no ENEM
          </p>
        </div>
      </div>
    </div>
  )
}