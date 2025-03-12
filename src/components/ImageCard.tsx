export const ImageCard: React.FC = () => {
    return (
        <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img src="https://elviajerofeliz.com/wp-content/uploads/2015/09/paisajes-de-Canada.jpg" className="h-56 w-full object-cover rounded-t-md" alt=""/>
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">Nome da Imagem</h5>
                <p className="text-gray-600">Tamanho</p>
                <p className="text-gray-600">Data de upload</p>

            </div>
        </div>
    )
}