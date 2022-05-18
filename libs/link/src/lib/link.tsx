import NextLink from 'next/link';
import clsx from 'clsx';

interface DwLinkProps {
  isExternal: boolean;
  href?: string | null;
  className?: string;
  children: React.ReactNode;
}

export function Link({ className, href, isExternal, children }: DwLinkProps) {
  if (!href) {
    return <div className={clsx(className)}>{children}</div>;
  }

  if (isExternal) {
    return (
      <a className={clsx(className)} href={href}>
        {children}
      </a>
    );
  }

  return (
    <NextLink className={clsx(className)} href={href}>
      <a>{children}</a>
    </NextLink>
  );
}

Link.defaultProps = {
  isExternal: false,
};

export default Link;
