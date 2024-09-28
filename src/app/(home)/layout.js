import Header from '../common/header.js';
import Footer from '../common/footer.js'
import { cn } from '../utils/cn.js';
import { getAuthenticatedAppForUser } from '../../lib/firebase/serverApp'
import { ProviderWrapper } from "./wrapper";

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export async function HomeLayout({
  children,
  className,
}) {

  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <div className={cn('relative mx-auto my-0 flex min-h-screen max-w-screen-2xl flex-col overflow-hidden bg-white shadow-2xl', className,)} >
      <Header initialUser={currentUser?.toJSON()} />
      <main className="bg-gray-100 flex flex-shrink-0 flex-grow xl:flex ">
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </main>
      <Footer />
    </div>

  )
}

export default HomeLayout;
