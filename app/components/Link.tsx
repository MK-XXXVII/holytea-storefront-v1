import {
  Link as RemixLink,
  NavLink as RemixNavLink,
  type NavLinkProps as RemixNavLinkProps,
  type LinkProps as RemixLinkProps,
  useMatches,
} from '@remix-run/react';
import * as React from 'react';

type LinkProps = Omit<RemixLinkProps, 'className'> & {
  className?: RemixNavLinkProps['className'] | RemixLinkProps['className'];
};

// Add a type for forwarded ref
type LinkWithForwardedRef = React.PropsWithChildren<LinkProps> &
  React.RefAttributes<HTMLAnchorElement>;

const LinkWithRef = React.forwardRef<HTMLAnchorElement, LinkWithForwardedRef>(
  (props, ref) => {
    const {to, className, ...restOfProps} = props;
    const [root] = useMatches();
    const selectedLocale = root.data?.selectedLocale;

    let toWithLocale = to;

    if (typeof to === 'string') {
      toWithLocale = selectedLocale ? `${selectedLocale.pathPrefix}${to}` : to;
    }

    if (typeof className === 'function') {
      return (
        <RemixNavLink
          ref={ref}
          to={toWithLocale}
          className={className}
          {...restOfProps}
        />
      );
    }

    return (
      <RemixLink
        ref={ref}
        to={toWithLocale}
        className={className}
        {...restOfProps}
      />
    );
  },
);

// Export the wrapped component
export const Link = Object.assign(LinkWithRef, {displayName: 'Link'});
