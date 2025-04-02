import { ToastContainer } from 'react-toastify';
import Link from 'next/link'
import {useAuth} from '@/resources'
import { useRouter } from 'next/navigation';

interface TemplateProps {
    children: React.ReactNode
    loading?: boolean;
}

export const Template: React.FC<TemplateProps> = ({
    children,
    loading,
  }: TemplateProps) => {
    return (
      <>
        <Header />
        <div className="container mx-auto mt-8 px-4">
          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid mr-3"></div>
              <span className="text-gray-600 font-semibold">Carregando...</span>
            </div>
          )}
          {!loading && children}
        </div>
        <Footer />
        <ToastContainer position={'top-right'}
                        autoClose={8000}
                        hideProgressBar={false}
                        draggable={false}
                        closeOnClick={true}
                        pauseOnHover={true}       
        />
      </>
    );
  };

const Header: React.FC = () => {

  const auth = useAuth();
  const user = auth.getUserSession();
  const router = useRouter();

  function logout() {
     auth.invalidateSession();
     router.push("/login");   
  } 
 


    return(
        <header className="bg-indigo-950 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
              <Link href="/galeria">
                <h1 className="text-txl font-bold">ImageLite</h1>
              </Link>
              <RenderIf condition={!!user}>
                    <div className='flex items-center'>
                      <div className='relative'>
                        <span className='w-64 py-3 px-3 text-md'>
                            Olá, {auth.getUserSession()?.name}
                        </span>
                        <span className='w-64 py-3 px-3 text-sm'>
                          <a href='#' onClick={logout}>
                            Sair
                          </a>
                        </span>
                      </div>
                    </div>
              </RenderIf>
            </div>            
        </header>
    )
}

interface RenderIfProps {
  condition?: boolean
  children: React.ReactNode
}

export const RenderIf: React.FC<RenderIfProps> = ({ condition = true, children }) => {
  return condition ? <>{children}</> : null;
};


const Footer: React.FC = () => {
    return(
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                Desenvolvido por Wallace Artur 
            </div>

        </footer>
    )
}