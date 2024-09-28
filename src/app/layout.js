import "./assets/styles/globals.css";
import "./assets/styles/app.css";
import { inter } from './fonts/fonts.js';

export default function Layout({ children }) {
  return (
    <html>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}