import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
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
  {name: 'facebook', IconComponent: FaFacebookF, hoverColor: 'text-blue-600'},
  {name: 'instagram', IconComponent: FaInstagram, hoverColor: 'text-pink-500'},
  {name: 'youtube', IconComponent: FaYoutube, hoverColor: 'text-red-500'},
  {name: 'tiktok', IconComponent: FaTiktok, hoverColor: 'text-purple-600'},
  {name: 'pinterest', IconComponent: FaPinterest, hoverColor: 'text-red-500'},
  {name: 'twitter', IconComponent: FaTwitter, hoverColor: 'text-blue-400'},
  {name: 'linkedin', IconComponent: FaLinkedinIn, hoverColor: 'text-blue-700'},
];

export function SocialMedia(props: SocialMediaProps) {
  const classNames = `grid grid-cols-1 md:grid-cols-3 px-8 mx-6 md:mx-12 md:px-12 py-12 bg-brandPurple items-center gap-4 md:my-16 border-primary border-2 rounded-sm ${props.className}`;

  return (
    <div className={classNames}>
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
        {socialMedia.map(({name, IconComponent, hoverColor}) => {
          const url = props[name as keyof SocialMediaProps]; // This works assuming that the social media names in your `socialMedia` array match the keys in `SocialMediaProps`.

          return url ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <IconComponent
                className={`hover:${hoverColor} text-xl md:text-2xl lg:text-3xl`}
              />
            </a>
          ) : null;
        })}
      </div>
    </div>
  );
}
