import React from 'react'

const AvisosCheck = () => {
  return (
    <div className="w-full p-4 shadow mt-4 bg-white rounded-lg">
    <h1 className="text-xl font-bold mb-4">Lançar Aviso</h1>
    <div className="flex flex-col md:flex-row">
      <section className="w-full md:w-6/12 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Pré-visualização</h2>
        <div className="bg-red-500 p-2 text-white rounded-lg">Opa</div>
      </section>
      <section className="w-full md:w-6/12 flex flex-col p-4 space-y-4">
        <input 
          type="text" 
          placeholder="Título" 
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea 
          placeholder="Conteúdo" 
          rows={3} 
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <div className="flex flex-col space-y-2">
          <section className='flex flex-row justify-around'>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="alert1" className="h-5 w-5 focus:ring-0" style={{ accentColor: 'yellow' }}/>
              <label htmlFor="alert1" className="ml-2 text-yellow-600">Alerta</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="alert2" className="h-5 w-5 focus:ring-0" style={{ accentColor: 'red' }}/>
              <label htmlFor="alert2" className="ml-2 text-red-600">Negativo</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="alert3" className="h-5 w-5 focus:ring-0" style={{ accentColor: 'green' }}/>
              <label htmlFor="alert3" className="ml-2 text-green-600">Successo</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="alert4" className="h-5 w-5 focus:ring-0" style={{ accentColor: 'purple' }}/>
              <label htmlFor="alert4" className="ml-2 text-purple-600">Evento</label>
            </div>
          </section>
        </div>
        <button className="w-full md:w-3/12 text-white shadow bg-blue-500 hover:bg-blue-600 rounded-xl px-4 py-2 transition duration-200 m-auto mt-5">
          Lançar
        </button>
      </section>
    </div>
  </div>
  )
}

export default AvisosCheck