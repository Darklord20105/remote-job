import {
  LinkedinSvg,
  YoutubeSvg,
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
  GoogleSvg
} from '../common/svg'
export const SOCIAL_LINKS = [
  {
    name: `LinkedIn`,
    url: `https://linkedin.com`,
    svg: <LinkedinSvg />
  },
  {
    name: `Youtube`,
    url: `https://youtube.com`,
    svg: <YoutubeSvg />
  },
  {
    name: `Facebook`,
    url: `https://facebook.com`,
    svg: <FacebookSvg />
  },
  {
    name: `Instagram`,
    url: `https://instagram.com`,
    svg: <InstagramSvg />
  },
  {
    name: `Google`,
    url: `https://google.com`,
    svg: <GoogleSvg />
  },
  {
    name: `Twitter`,
    url: `https://twitter.com`,
    svg: <TwitterSvg />
  },
]

function SocialLinks() {
  return (
    <ul className={'flex items-center justify-center gap-4 my-4'}>
      {SOCIAL_LINKS.map((link) => (
        <li className="text-gray-700 hover:text-orange-600" key={link.name}>
          <a href={link.url}>
            <span className="sr-only">{link.name}</span>
            {link.svg}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks;