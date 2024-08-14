import Menu from './menu.js'
import SocialLinks from './social-links.js'

function Footer() {
  return (
    <footer className="bg-primary-400 pb-6 text-sm leading-5 tracking-normal text-white lg:bg-transparent lg:text-gray-400">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex flex-col items-center lg:flex-row lg:items-end lg:justify-between">
          <nav className="flex flex-col items-center text-black lg:order-1 lg:items-center">
            <SocialLinks className="flex gap-4" />
            <Menu className="flex gap-4" />
          </nav>
          <div className="">&copy; DarkLord Inc</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

