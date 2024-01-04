import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
} from 'react-icons/fa';
import {Section} from './Text';

interface SocialMediaProps {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  pinterest?: string;
  className?: string;
  headline?: string;
  tagline?: string;
}

const socialMedia = [
  {name: 'facebook', IconComponent: FaFacebook, hoverColor: 'text-blue-600'},
  {name: 'instagram', IconComponent: FaInstagram, hoverColor: 'text-pink-500'},
  {name: 'youtube', IconComponent: FaYoutube, hoverColor: 'text-red-500'},
  {name: 'tiktok', IconComponent: FaTiktok, hoverColor: 'text-purple-600'},
  {name: 'pinterest', IconComponent: FaPinterest, hoverColor: 'text-red-500'},
  {name: 'twitter', IconComponent: FaTwitter, hoverColor: 'text-blue-400'},
  {name: 'linkedin', IconComponent: FaLinkedin, hoverColor: 'text-blue-700'},
];

export function SocialMedia(props: SocialMediaProps) {
  const {
    facebook,
    twitter,
    instagram,
    youtube,
    linkedin,
    tiktok,
    pinterest,
    className,
    headline,
    tagline,
  } = props;
  const classNames = `grid grid-cols-1 md:grid-cols-3 px-8 mx-6 md:mx-12 md:px-12 py-12 bg-brandPurple items-center gap-4 md:my-16 border-primary border-2 rounded-sm ${props.className}`;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 px-8 m-6 md:px-16 py-12 bg-notice items-center gap-4 md:my-16 border-primary border-2 rounded-md ${classNames}`}
    >
      <div className="md:col-span-2 md:border-r-2 md:border-primary">
        {props.headline && (
          <h1 className="text-heading lg:text-display font-bold text-primary pb-8">
            {props.headline}
          </h1>
        )}
        {props.tagline && (
          <h2 className="text-copy lg:text-lead text-primary pb-4">
            {props.tagline}
          </h2>
        )}
      </div>
      <div className="flex justify-center align-middle space-x-4 md:col-span-1 pt-8">
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-600 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
        {youtube && (
          <a href={youtube} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-red-500 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
        {tiktok && (
          <a href={tiktok} target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:text-purple-600 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
        {pinterest && (
          <a href={pinterest} target="_blank" rel="noopener noreferrer">
            <FaPinterest className="hover:text-red-500 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-blue-400 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-700 text-2xl md:text-3xl lg:text-4xl" />
          </a>
        )}
      </div>
    </div>
  );
}
