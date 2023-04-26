import {Header, Footer} from '~/components';
import type {LayoutData} from '../root';

export function Layout({
  children,
  layout,
}: {
  children: React.ReactNode;
  layout: LayoutData;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
          title={layout?.shop.name ?? 'HOLYTEA'}
          menu={layout?.headerMenu}
        />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer menu={layout?.footerMenu} />
    </>
  );
}
