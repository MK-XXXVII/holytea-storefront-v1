import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {Form, useParams} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {EnhancedMenu} from '~/lib/utils';
import {Link} from '../Link';
import {Input} from '../Input';
import {IconSearch} from '../Icon';
import {AccountLink} from './AccountLink';
import {CartCount} from './CartCount';
import {FaLeaf} from '@react-icons/all-files/fa/FaLeaf';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-notice/80 text-primary'
      } ${
        !isHome && y > 50 && ' shadow-lightHeader'
      } hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-4`}
    >
      <div className="flex gap-12">
        <Link
          className="font-bold text-2xl uppercase tracking-tighter inline-flex items-center"
          to="/"
          prefetch="intent"
        >
          <FaLeaf className="w-8 h-8 mr-2" />
          {title}
        </Link>
        <nav className="flex gap-8 items-center">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) =>
            item.items && item.items.length > 0 ? (
              <Menu
                as="div"
                className="relative inline-block justify-center text-left"
                key={item.id}
              >
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#FF9540] px-3 py-1 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-contrast hover:bg-contrast">
                  {item.title}
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-notice shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {item.items.map((child) => (
                        <Menu.Item key={child.id}>
                          {({active}) => (
                            <Link
                              to={child.to}
                              target={child.target}
                              prefetch="intent"
                              className={classNames(
                                active
                                  ? 'bg-[#FF9540] text-primary'
                                  : 'text-primary',
                                'block px-4 py-2 text-sm',
                              )}
                            >
                              {child.title}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                key={item.id}
                to={item.to}
                target={item.target}
                prefetch="intent"
                className={({isActive}) =>
                  isActive ? 'pb-1 border-contrast border-b-2 -mb-px' : 'pb-1'
                }
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <Form
          method="get"
          action={params.lang ? `/${params.lang}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-primary/80 dark:focus:border-primary/80'
                : 'focus:border-primary/80'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch className="hover:text-[#FF9540]" />
          </button>
        </Form>
        <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 hover:text-[#FF9540]" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}
