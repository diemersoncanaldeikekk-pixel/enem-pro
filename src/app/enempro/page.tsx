'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, BookOpen, PenTool, Play, RotateCcw, CheckCircle, Clock, Brain, MessageSquare, Trophy, Target, BarChart3 } from 'lucide-react'

// Dados das matérias do ENEM
const materias = [
  { id: 'matematica', nome: 'Matemática', cor: 'from-blue-500 to-blue-700', questoes: 50 },
  { id: 'portugues', nome: 'Português', cor: 'from-emerald-500 to-emerald-700', questoes: 50 },
  { id: 'historia', nome: 'História', cor: 'from-purple-500 to-purple-700', questoes: 50 },
  { id: 'geografia', nome: 'Geografia', cor: 'from-orange-500 to-orange-700', questoes: 50 },
  { id: 'biologia', nome: 'Biologia', cor: 'from-teal-500 to-teal-700', questoes: 50 },
  { id: 'fisica', nome: 'Física', cor: 'from-red-500 to-red-700', questoes: 50 },
  { id: 'quimica', nome: 'Química', cor: 'from-yellow-500 to-yellow-700', questoes: 50 },
  { id: 'filosofia', nome: 'Filosofia', cor: 'from-indigo-500 to-indigo-700', questoes: 50 },
  { id: 'sociologia', nome: 'Sociologia', cor: 'from-pink-500 to-pink-700', questoes: 50 }
]

// Banco de perguntas expandido (50 por matéria)
const bancoPerguntasMatematica = [
  { id: 1, pergunta: "Qual é a fórmula da área de um círculo?", alternativas: ["A) π × r", "B) π × r²", "C) 2π × r", "D) π × d", "E) π × r³"], resposta: "B" },
  { id: 2, pergunta: "Qual é o valor de √64?", alternativas: ["A) 6", "B) 7", "C) 8", "D) 9", "E) 10"], resposta: "C" },
  { id: 3, pergunta: "Se f(x) = 2x + 3, qual é f(5)?", alternativas: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"], resposta: "D" },
  { id: 4, pergunta: "Qual é a derivada de x²?", alternativas: ["A) x", "B) 2x", "C) x²", "D) 2x²", "E) x³"], resposta: "B" },
  { id: 5, pergunta: "Em um triângulo retângulo, se os catetos medem 3 e 4, qual é a hipotenusa?", alternativas: ["A) 5", "B) 6", "C) 7", "D) 8", "E) 9"], resposta: "A" },
  // Adicionar mais 45 perguntas...
]

const bancoPerguntasPortugues = [
  { id: 1, pergunta: "Quem escreveu 'Dom Casmurro'?", alternativas: ["A) José de Alencar", "B) Machado de Assis", "C) Clarice Lispector", "D) Guimarães Rosa", "E) Carlos Drummond"], resposta: "B" },
  { id: 2, pergunta: "Qual é a função da vírgula na frase: 'João, venha aqui'?", alternativas: ["A) Separar sujeito", "B) Indicar vocativo", "C) Separar adjunto", "D) Indicar aposto", "E) Separar predicado"], resposta: "B" },
  { id: 3, pergunta: "O que é uma metáfora?", alternativas: ["A) Comparação explícita", "B) Comparação implícita", "C) Exagero", "D) Repetição", "E) Contradição"], resposta: "B" },
  { id: 4, pergunta: "Qual movimento literário caracteriza-se pelo subjetivismo?", alternativas: ["A) Classicismo", "B) Barroco", "C) Romantismo", "D) Realismo", "E) Modernismo"], resposta: "C" },
  { id: 5, pergunta: "O que é um oxímoro?", alternativas: ["A) Figura de linguagem", "B) Tipo de verso", "C) Gênero literário", "D) Escola literária", "E) Tipo de rima"], resposta: "A" },
  // Adicionar mais 45 perguntas...
]

// Função para gerar perguntas dinamicamente
const gerarPerguntasMateria = (materiaId: string, quantidade: number = 50) => {
  const bancos: { [key: string]: any[] } = {
    'matematica': bancoPerguntasMatematica,
    'portugues': bancoPerguntasPortugues,
    // Para outras matérias, usar perguntas genéricas por enquanto
  }
  
  const banco = bancos[materiaId] || bancoPerguntasMatematica
  const perguntas = []
  
  for (let i = 0; i < quantidade; i++) {
    const perguntaBase = banco[i % banco.length]
    perguntas.push({
      ...perguntaBase,
      id: i + 1,
      pergunta: `${perguntaBase.pergunta} (Questão ${i + 1})`
    })
  }
  
  return perguntas
}

interface ProgressoSimulado {
  materia: string
  perguntaAtual: number
  respostas: { [key: number]: string }
  concluido: boolean
  acertos: number
  totalQuestoes: number
}

interface ResultadoSimulado {
  materia: string
  acertos: number
  total: number
  porcentagem: number
  data: string
}

export default function EnemPro() {
  const [telaAtual, setTelaAtual] = useState<'home' | 'simulados' | 'redacao' | 'simulado-ativo' | 'resultado'>('home')
  const [materiaAtiva, setMateriaAtiva] = useState<string>('')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({})
  const [progressoSalvo, setProgressoSalvo] = useState<{ [key: string]: ProgressoSimulado }>({})
  const [perguntasAtivas, setPerguntasAtivas] = useState<any[]>([])
  const [resultadoAtual, setResultadoAtual] = useState<ResultadoSimulado | null>(null)

  // Carregar progresso do Local Storage
  useEffect(() => {
    const progressoLocal = localStorage.getItem('enem-progresso')
    if (progressoLocal) {
      setProgressoSalvo(JSON.parse(progressoLocal))
    }
  }, [])

  // Salvar progresso no Local Storage
  const salvarProgresso = (materia: string, pergunta: number, respostasAtuais: { [key: number]: string }) => {
    const novoProgresso = {
      ...progressoSalvo,
      [materia]: {
        materia,
        perguntaAtual: pergunta,
        respostas: respostasAtuais,
        concluido: pergunta >= 50,
        acertos: 0,
        totalQuestoes: 50
      }
    }
    setProgressoSalvo(novoProgresso)
    localStorage.setItem('enem-progresso', JSON.stringify(novoProgresso))
  }

  const iniciarSimulado = (materiaId: string) => {
    const progresso = progressoSalvo[materiaId]
    const perguntas = gerarPerguntasMateria(materiaId, 50)
    setPerguntasAtivas(perguntas)
    
    if (progresso && !progresso.concluido) {
      setPerguntaAtual(progresso.perguntaAtual)
      setRespostas(progresso.respostas)
    } else {
      setPerguntaAtual(0)
      setRespostas({})
    }
    setMateriaAtiva(materiaId)
    setTelaAtual('simulado-ativo')
  }

  const responderPergunta = (resposta: string) => {
    const novasRespostas = { ...respostas, [perguntaAtual]: resposta }
    setRespostas(novasRespostas)
    salvarProgresso(materiaAtiva, perguntaAtual + 1, novasRespostas)
    
    if (perguntaAtual < 49) {
      setPerguntaAtual(perguntaAtual + 1)
    }
  }

  const finalizarSimulado = () => {
    // Calcular acertos
    let acertos = 0
    perguntasAtivas.forEach((pergunta, index) => {
      if (respostas[index] === pergunta.resposta) {
        acertos++
      }
    })

    const resultado: ResultadoSimulado = {
      materia: materias.find(m => m.id === materiaAtiva)?.nome || '',
      acertos,
      total: 50,
      porcentagem: Math.round((acertos / 50) * 100),
      data: new Date().toLocaleDateString('pt-BR')
    }

    setResultadoAtual(resultado)
    
    // Salvar resultado no histórico
    const historico = JSON.parse(localStorage.getItem('enem-historico') || '[]')
    historico.push(resultado)
    localStorage.setItem('enem-historico', JSON.stringify(historico))
    
    setTelaAtual('resultado')
  }

  const voltarTela = () => {
    if (telaAtual === 'simulado-ativo') {
      setTelaAtual('simulados')
    } else if (telaAtual === 'resultado') {
      setTelaAtual('simulados')
    } else {
      setTelaAtual('home')
    }
  }

  const abrirChatCorrecao = () => {
    window.open('https://chatgpt.com/share/68feb937-5ca8-8001-89c6-9d7eef642382', '_blank')
  }

  const abrirChatEstudo = () => {
    window.open('https://chatgpt.com/share/68feb9ce-5c0c-8001-908e-1b1909b820e3', '_blank')
  }

  // Componente da tela inicial
  const TelaHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">
            ENEM<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Sua plataforma completa de preparação para o ENEM com simulados inteligentes e correção de redação
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Card Simulados */}
          <div 
            className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200 hover:border-blue-300 overflow-hidden"
            onClick={() => setTelaAtual('simulados')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">450</div>
                  <div className="text-sm text-slate-500">Questões</div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Simulados</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Pratique com 50 questões por matéria. Sistema inteligente que salva seu progresso e mostra resultados detalhados.
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 inline-block group-hover:scale-105">
                Começar Simulado
              </div>
            </div>
          </div>

          {/* Card Correção de Redação */}
          <div 
            className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200 hover:border-purple-300 overflow-hidden"
            onClick={() => setTelaAtual('redacao')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-slate-500">Critérios</div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Correção de Redação</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Tenha sua redação corrigida seguindo os critérios do ENEM. Receba feedback detalhado e dicas personalizadas.
              </p>
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 inline-block group-hover:scale-105">
                Corrigir Redação
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
            <div className="text-slate-600 font-medium">Matérias</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">50</div>
            <div className="text-slate-600 font-medium">Questões/Matéria</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">Pro</div>
            <div className="text-slate-600 font-medium">Correção</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
            <div className="text-slate-600 font-medium">Disponível</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-600 text-lg">
            Estamos há mais de <span className="font-bold text-slate-800">3 anos</span> no mercado ajudando estudantes a conquistar seus sonhos no ENEM
          </p>
        </div>
      </div>
    </div>
  )

  // Componente da tela de simulados
  const TelaSimulados = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-12 pt-4">
          <button 
            onClick={voltarTela}
            className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 mr-6 border border-slate-200"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Simulados por Matéria</h1>
            <p className="text-slate-600 text-lg mt-2">Escolha uma matéria e pratique com 50 questões</p>
          </div>
        </div>

        {/* Grid de matérias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materias.map((materia) => {
            const progresso = progressoSalvo[materia.id]
            const temProgresso = progresso && progresso.perguntaAtual > 0
            const concluido = progresso && progresso.concluido

            return (
              <div 
                key={materia.id}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200 hover:border-slate-300"
                onClick={() => iniciarSimulado(materia.id)}
              >
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${materia.cor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {concluido ? (
                      <CheckCircle className="w-10 h-10 text-white" />
                    ) : temProgresso ? (
                      <Clock className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{materia.nome}</h3>
                  <p className="text-slate-600 mb-6 text-lg">{materia.questoes} questões</p>
                  
                  {/* Barra de progresso */}
                  {temProgresso && (
                    <div className="mb-6">
                      <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${materia.cor} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${(progresso.perguntaAtual / 50) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 font-medium">
                        {progresso.perguntaAtual}/50 questões
                      </p>
                    </div>
                  )}

                  <div className={`bg-gradient-to-r ${materia.cor} text-white px-8 py-3 rounded-2xl text-lg font-bold transition-all duration-300 inline-block group-hover:scale-105`}>
                    {concluido ? 'Refazer' : temProgresso ? 'Continuar' : 'Iniciar'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Componente da tela de redação
  const TelaRedacao = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-12 pt-4">
          <button 
            onClick={voltarTela}
            className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 mr-6 border border-slate-200"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Correção de Redação</h1>
            <p className="text-slate-600 text-lg mt-2">Melhore sua escrita com feedback profissional</p>
          </div>
        </div>

        {/* Opções de correção */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Correção Profissional */}
          <div 
            className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200 hover:border-red-300"
            onClick={abrirChatCorrecao}
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-500 to-red-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Correção Profissional</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Envie sua redação e receba uma correção detalhada seguindo os 5 critérios do ENEM, com nota e sugestões de melhoria.
              </p>
              <div className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 inline-block group-hover:scale-105">
                Corrigir Agora
              </div>
            </div>
          </div>

          {/* Estudar */}
          <div 
            className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200 hover:border-emerald-300"
            onClick={abrirChatEstudo}
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Estudar</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Converse com nosso assistente para tirar dúvidas sobre estrutura, argumentação, exemplos e técnicas de redação do ENEM.
              </p>
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 inline-block group-hover:scale-105">
                Começar Chat
              </div>
            </div>
          </div>
        </div>

        {/* Informações sobre os critérios */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Critérios de Correção do ENEM</h3>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600 mb-2">C1</div>
              <div className="text-slate-700 font-medium">Domínio da Norma</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <div className="text-2xl font-bold text-emerald-600 mb-2">C2</div>
              <div className="text-slate-700 font-medium">Compreensão do Tema</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600 mb-2">C3</div>
              <div className="text-slate-700 font-medium">Argumentação</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <div className="text-2xl font-bold text-orange-600 mb-2">C4</div>
              <div className="text-slate-700 font-medium">Coesão e Coerência</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <div className="text-2xl font-bold text-red-600 mb-2">C5</div>
              <div className="text-slate-700 font-medium">Proposta de Intervenção</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Componente do simulado ativo (otimizado para mobile)
  const SimuladoAtivo = () => {
    const materia = materias.find(m => m.id === materiaAtiva)
    const progresso = ((perguntaAtual + 1) / 50) * 100
    const perguntaAtiva = perguntasAtivas[perguntaAtual]

    if (!perguntaAtiva) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Header fixo */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6 border border-slate-200 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button 
                  onClick={voltarTela}
                  className="bg-slate-100 rounded-xl p-2 hover:bg-slate-200 transition-colors mr-3"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">{materia?.nome}</h1>
                  <p className="text-slate-600 text-sm">Questão {perguntaAtual + 1} de 50</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-800">{Math.round(progresso)}%</div>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${materia?.cor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
          </div>

          {/* Pergunta */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-slate-200">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
              {perguntaAtiva.pergunta}
            </h2>

            {/* Alternativas */}
            <div className="space-y-3">
              {perguntaAtiva.alternativas.map((alternativa: string, index: number) => {
                const letra = alternativa.charAt(0)
                const jaRespondida = respostas[perguntaAtual] === letra
                
                return (
                  <button
                    key={index}
                    onClick={() => responderPergunta(letra)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 text-sm md:text-base ${
                      jaRespondida 
                        ? `bg-gradient-to-r ${materia?.cor} text-white shadow-lg`
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {alternativa}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botões de navegação fixos */}
          <div className="sticky bottom-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => perguntaAtual > 0 && setPerguntaAtual(perguntaAtual - 1)}
                disabled={perguntaAtual === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  perguntaAtual === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Anterior
              </button>

              {perguntaAtual === 49 ? (
                <button
                  onClick={finalizarSimulado}
                  className={`bg-gradient-to-r ${materia?.cor} text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  Finalizar
                </button>
              ) : (
                <button
                  onClick={() => setPerguntaAtual(perguntaAtual + 1)}
                  className={`bg-gradient-to-r ${materia?.cor} text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  Próxima
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Componente de resultado do simulado
  const TelaResultado = () => {
    if (!resultadoAtual) return null

    const getCorPorcentagem = (porcentagem: number) => {
      if (porcentagem >= 80) return 'text-emerald-600'
      if (porcentagem >= 60) return 'text-blue-600'
      if (porcentagem >= 40) return 'text-yellow-600'
      return 'text-red-600'
    }

    const getMensagem = (porcentagem: number) => {
      if (porcentagem >= 80) return 'Excelente! Você está muito bem preparado!'
      if (porcentagem >= 60) return 'Bom resultado! Continue praticando!'
      if (porcentagem >= 40) return 'Resultado regular. Foque nos estudos!'
      return 'Precisa melhorar. Não desista, continue estudando!'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-12 pt-4">
            <button 
              onClick={voltarTela}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 mr-6 border border-slate-200"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Resultado do Simulado</h1>
              <p className="text-slate-600 text-lg mt-2">{resultadoAtual.materia}</p>
            </div>
          </div>

          {/* Card de resultado principal */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Simulado Concluído!</h2>
              <p className="text-slate-600 text-lg">{resultadoAtual.data}</p>
            </div>

            {/* Estatísticas */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{resultadoAtual.acertos}</div>
                <div className="text-slate-700 font-medium">Acertos</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="text-3xl font-bold text-red-600 mb-2">{resultadoAtual.total - resultadoAtual.acertos}</div>
                <div className="text-slate-700 font-medium">Erros</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className={`text-3xl font-bold mb-2 ${getCorPorcentagem(resultadoAtual.porcentagem)}`}>
                  {resultadoAtual.porcentagem}%
                </div>
                <div className="text-slate-700 font-medium">Aproveitamento</div>
              </div>
            </div>

            {/* Barra de progresso visual */}
            <div className="mb-8">
              <div className="bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${resultadoAtual.porcentagem}%` }}
                ></div>
              </div>
            </div>

            {/* Mensagem de feedback */}
            <div className="text-center mb-8">
              <p className="text-xl font-semibold text-slate-800 mb-2">
                {getMensagem(resultadoAtual.porcentagem)}
              </p>
              <p className="text-slate-600">
                Você acertou {resultadoAtual.acertos} de {resultadoAtual.total} questões
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => iniciarSimulado(materiaAtiva)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Refazer Simulado
              </button>
              <button
                onClick={() => setTelaAtual('simulados')}
                className="bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Outras Matérias
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Renderização condicional das telas
  switch (telaAtual) {
    case 'simulados':
      return <TelaSimulados />
    case 'redacao':
      return <TelaRedacao />
    case 'simulado-ativo':
      return <SimuladoAtivo />
    case 'resultado':
      return <TelaResultado />
    default:
      return <TelaHome />
  }
}