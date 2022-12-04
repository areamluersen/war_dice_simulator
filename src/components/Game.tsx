import { useCallback, useState } from "react";
import { TJogada, TVencedor, WarDiceSimulator } from "../functions/WarDiceSimulator";

const Jogada = ({ jogada, numero }: { jogada: TJogada, numero: number }) => {
  const { dadosAtaque, dadosDefesa, nrVitoriasAtaque, nrVitoriasDefesa, tropasAtaqueRestante, tropasDefesaRestante } = jogada
  return (
    <tr className="text-base font-medium border-t border-slate-500 rounded-md bg-dark-850">
      <td>
        {numero}
      </td>
      <td>
        <div className="bg-red-800 rounded-md my-1">Ataque: {dadosAtaque.join(', ')}</div>
        <div className="bg-yellow-500 rounded-md my-1 text-dark-900">Defesa: {dadosDefesa.join(', ')}</div>
      </td>
      <td>
        <div>{nrVitoriasAtaque}</div>
        <div>{nrVitoriasDefesa}</div>
      </td>
      <td>
        <div>{tropasAtaqueRestante}</div>
        <div>{tropasDefesaRestante}</div>
      </td>
      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </tr>
  )
}

const Jogadas = ({ jogadas }: { jogadas: TJogada[] }) => {
  return (

    <div className="!max-h-[50vh] overflow-auto">
      <table className="table-auto rounded-md bg-dark-800 w-full">
        <thead >
          <tr className="bg-transparent  ">
            <th>nº</th>
            <th>Dados</th>
            <th>Vitórias</th>
            <th>Sobrou</th>
          </tr>
        </thead>
        <tbody>
          {jogadas.map((jogada, index) => (<Jogada jogada={jogada} numero={index + 1} />))}
        </tbody>
      </table>
    </div>
  )
}


export function Game() {
  const [jogadas, setJogadas] = useState<TJogada[]>([])
  const [vencedor, setVencedor] = useState<TVencedor>()

  const handleSimularJogo = useCallback((event: any) => {
    event.preventDefault()
    const tropasAtaque = event.target[0].value
    const tropasDefesa = event.target[1].value
    if (tropasAtaque > 1 && tropasDefesa > 0) {
      const warDiceSimulator = new WarDiceSimulator()
      warDiceSimulator.simular(tropasAtaque, tropasDefesa)
      setJogadas(warDiceSimulator.getJogadas())
      setVencedor(warDiceSimulator.getVencedor())
    }
  }, [])

  const ultimaJogada = jogadas[jogadas.length - 1]

  return (
    <div className="bg-dark-900 p-4 rounded-lg  shadow-lg">
      <form className="mb-3" onSubmit={handleSimularJogo}>
        <div className='grid grid-cols-2 gap-2'>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="username">
              Legiões de ataque
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ataque" type="number" placeholder="Legiões de Ataque" />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="username">
              Legiões de Defesa
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="defesa" type="number" placeholder="Legiões de defesa" />
          </div>
        </div>
        <button
          className="bg-transparent hover:bg-red-600/50 text-gray-200 font-semibold hover:text-white py-1 px-4 border border-red-800 hover:border-transparent rounded"
          type="submit"
        >
          Simular disputa
        </button>
      </form>
      {vencedor &&
        (<div className="text-lg md:text-xl lg:text-2xl mb-2">
          <span>{`Vitória do(a) ${vencedor}. Sobraram`}</span><br />
          <span>{`${ultimaJogada.tropasAtaqueRestante} tropa(s) do atacante e`}</span><br />
          <span>{`${ultimaJogada.tropasDefesaRestante} tropa(s) do defensor`}</span>
        </div>)}
      {jogadas.length > 0 && <Jogadas jogadas={jogadas} />}
    </div>
  );
}
