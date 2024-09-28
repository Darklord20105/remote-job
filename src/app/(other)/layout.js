// import "../assets/styles/globals.css";
// import "../assets/styles/app.css";
import Header from '../common/header.js';
import Footer from '../common/footer.js'
import { cn } from '../utils/cn.js';
// import { inter } from '../fonts/fonts.js';
import { getAuthenticatedAppForUser } from '../../lib/firebase/serverApp'

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default async function OtherLayout({
  children,
  className,
}) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <div
      className={cn(
        'relative mx-auto my-0 flex min-h-screen max-w-screen-2xl flex-col overflow-hidden bg-white shadow-2xl',
        className,
      )}
    >
      <Header initialUser={currentUser?.toJSON()} />
      <main className="bg-gray-100 flex flex-shrink-0 flex-grow xl:flex ">
        {children}
      </main>
      <Footer />

    </div>
  )
}

