const getQtdeDados = (legioes: number, isAtack: boolean): number => {
  const legioesAtivas = isAtack ? legioes - 1 : legioes
  if (legioesAtivas > 3) return 3
  return legioesAtivas
}

const getDadosSimulados = (qtdeDados: number): number[] => {
  const dados: number[] = []
  for (let i = 0; i < qtdeDados; i += 1) {
    const dado = Math.floor(Math.random() * 6) + 1
    dados.push(dado)
  }
  return dados.sort((a, b) => b - a)
}

const getResultadoDados = (dadosAtaque: number[], dadosDefesa: number[]): { nrVitoriasAtaque: number, nrVitoriasDefesa: number } => {
  let nrVitoriasAtaque = 0
  let nrVitoriasDefesa = 0
  const iteratorValue = dadosAtaque.length > dadosDefesa.length ? dadosDefesa.length : dadosAtaque.length
  for (let i = 0; i < iteratorValue; i += 1) {
    if (dadosAtaque[i] > dadosDefesa[i]) {
      nrVitoriasAtaque += 1
    } else {
      nrVitoriasDefesa += 1
    }
  }
  return { nrVitoriasAtaque, nrVitoriasDefesa }
}

export type TJogada = {
  dadosAtaque: number[],
  dadosDefesa: number[],
  nrVitoriasAtaque: number,
  nrVitoriasDefesa: number,
  tropasAtaqueRestante: number,
  tropasDefesaRestante: number
}

export class WarDiceSimulator {
  private readonly jogadas: TJogada[] = []
  private vencedor: 'ataque' | 'defesa' | undefined

  getJogadas() {
    return this.jogadas
  }

  getVencedor() {
    return this.vencedor
  }

  simular(ataque: number, defesa: number) {
    const qtde_dados_ataque = getQtdeDados(ataque, true)
    const qtde_dados_defesa = getQtdeDados(defesa, false)
    const dadosAtaque = getDadosSimulados(qtde_dados_ataque)
    console.log("🚀 -------------------------------------------------------------🚀")
    console.log("🚀 ~ file: simulador.ts ~ line 22 ~ dados_ataque", dadosAtaque)
    console.log("🚀 -------------------------------------------------------------🚀")
    const dadosDefesa = getDadosSimulados(qtde_dados_defesa)
    console.log("🚀 -------------------------------------------------------------🚀")
    console.log("🚀 ~ file: simulador.ts ~ line 26 ~ dados_defesa", dadosDefesa)
    console.log("🚀 -------------------------------------------------------------🚀")


    const { nrVitoriasAtaque, nrVitoriasDefesa } = getResultadoDados(dadosAtaque, dadosDefesa)
    console.log("🚀 ---------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: simulador.ts ~ line 45 ~ nrVitoriasAtaque", nrVitoriasAtaque)
    console.log("🚀 ---------------------------------------------------------------------🚀")
    console.log("🚀 ---------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: simulador.ts ~ line 45 ~ nrVitoriasDefesa", nrVitoriasDefesa)
    console.log("🚀 ---------------------------------------------------------------------🚀")

    const tropasAtaqueRestante = ataque - nrVitoriasDefesa
    console.log("🚀 -----------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: simulador.ts ~ line 53 ~ tropasRestanteAtaque", tropasAtaqueRestante)
    console.log("🚀 -----------------------------------------------------------------------------🚀")
    const tropasDefesaRestante = defesa - nrVitoriasAtaque
    console.log("🚀 -----------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: simulador.ts ~ line 57 ~ tropasRestanteDefesa", tropasDefesaRestante)
    console.log("🚀 -----------------------------------------------------------------------------🚀")

    this.jogadas.push({
      dadosAtaque,
      dadosDefesa,
      tropasAtaqueRestante,
      tropasDefesaRestante,
      nrVitoriasAtaque,
      nrVitoriasDefesa
    })

    if (tropasDefesaRestante === 0) {
      console.log(`Vitória do ataque, restaram ${tropasAtaqueRestante} tropas`)
      this.vencedor = 'ataque'
    }
    if (tropasAtaqueRestante === 1) {
      console.log(`Vitória da defesa, restaram ${tropasDefesaRestante} tropas de defesa`)
      this.vencedor = 'defesa'
    }

    if (tropasAtaqueRestante > 1 && tropasDefesaRestante > 0) {
      this.simular(tropasAtaqueRestante, tropasDefesaRestante)
    }
  }
}