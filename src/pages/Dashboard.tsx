import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Radio Manager</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Bem-vindo ao Radio Manager!
              </h2>
              <p className="text-gray-500">
                O sistema está configurado e funcionando.
                <br />
                Em breve: Gestão de Pacientes, Protocolos e Planos de Tratamento.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
