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
  const {headline, tagline} = props;

  return (
    <Section className="mx-auto py-5 sm:py-20 px-2 sm:px-6 md:px-16">
      <h2 className="text-center text-title sm:text-heading lg:text-display font-bold leading-3 sm:leading-10 text-primary/90 sm:truncate">
        {headline}
      </h2>
      {tagline && (
        <p className="text-center text-base sm:text-xl md:text-2xl max-w-full sm:max-w-7xl text-primary/80 mb-4">
          {tagline}
        </p>
      )}
      <div className="flex flex-wrap justify-center sm:space-x-5 mt-5">
        {socialMedia.map(({name, IconComponent}) => {
          if (!(props as any)[name]) return null;
          const link = (props as any)[name];
          return (
            <div
              key={name}
              className="
              relative flex items-left justify-center rounded-lg 
              border border-primary bg-brandPurple/70 hover:bg-primaryGreen
              p-2 sm:p-4 shadow-md focus-within:ring-2 focus-within:ring-contrast 
              focus-within:ring-offset-2 hover:border-primary m-2 sm:m-0"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <IconComponent
                  className={`hover:${
                    socialMedia.find((item) => item.name === name)?.hoverColor
                  } text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
                />
              </a>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
