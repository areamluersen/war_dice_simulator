import { FormEvent, useCallback, useState } from "react";
import { TJogada, WarDiceSimulator } from "../functions/WarDiceSimulator";


export function Game() {
  const [jogadas, setJogadas] = useState<TJogada[]>([])

  const handleSimularJogo = useCallback((event: any) => {
    event.preventDefault()
    const tropasAtaque = event.target[0].value
    const tropasDefesa = event.target[1].value
    if (tropasAtaque > 1 && tropasDefesa > 0) {
      const warDiceSimulator = new WarDiceSimulator()
      warDiceSimulator.simular(tropasAtaque, tropasDefesa)
      setJogadas(warDiceSimulator.getJogadas())
    }
  }, [])

  return (
    <div className="bg-dark-900 p-4 mb-20 rounded-lg  shadow-lg">
      <form className="" onSubmit={handleSimularJogo}>

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
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          Simular disputa
        </button>
      </form>
      <ul>
        <>
          {jogadas.map((jogada) => {
            return <li>
              {`Dados ataque: ${jogada.dadosAtaque}, Dados Devesa: ${jogada.dadosDefesa}
              - Ataque restante ${jogada.tropasAtaqueRestante}
              - Defesa restante ${jogada.tropasDefesaRestante}`}
            </li>
          })}
        </>
      </ul>
    </div>
  );
}
