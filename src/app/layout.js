import "./assets/styles/globals.css";
import "./assets/styles/app.css";
import Header from './common/header.js';
import Gradient from './common/gradient.js';
import Footer from './common/footer.js'
import { cn } from './utils/cn.js';
import { inter } from './fonts/fonts.js';

function Layout({
  children,
  className,
}) {
  return (
    <html>
    <body className={`${inter.className} antialiased`}>
      <div
        className={cn(
          'relative mx-auto my-0 flex min-h-screen max-w-screen-2xl flex-col overflow-hidden bg-white shadow-2xl',
        className,
        )}
      >
	<Gradient className="absolute bottom-0 left-1/2 top-0 ml-28 hidden w-1/2 lg:block" />
        <Header title={"remote in spain"} />
        <main className="flex-shrink-0 flex-grow items-center lg:flex">
	  {children}
        </main>
        <Footer />
      
      </div>
    </body>
    </html>
  )
}

export default Layout;
