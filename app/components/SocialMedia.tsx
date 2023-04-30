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

export function SocialMedia({
  facebook,
  twitter,
  instagram,
  tiktok,
  pinterest,
  youtube,
  linkedin,
  className,
  headline,
  tagline,
}: SocialMediaProps) {
  return (
    <div
      className={`grid md:grid-cols-3 grid-cols-1 px-12 py-8 bg-notice items-center gap-4 mx-12 border-primary border-2 mb-8 rounded-md ${className}`}
    >
      <div className="md:col-span-2 md:border-r-2 md:border-primary">
        {headline && (
          <h1 className="text-heading lg:text-display font-semibold text-primary pb-4">
            {headline}
          </h1>
        )}
        {tagline && (
          <h2 className="text-copy lg:text-lead text-primary pb-4">
            {tagline}
          </h2>
        )}
      </div>
      <div className="flex justify-center space-x-4 md:col-span-1 pt-8">
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="hover:text-blue-600 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
        {youtube && (
          <a href={youtube} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-red-500 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
        {tiktok && (
          <a href={tiktok} target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:text-purple-600 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
        {pinterest && (
          <a href={pinterest} target="_blank" rel="noopener noreferrer">
            <FaPinterest className="hover:text-red-500 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-blue-400 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="hover:text-blue-700 text-3xl md:text-4xl lg:text-5xl" />
          </a>
        )}
      </div>
    </div>
  );
}
