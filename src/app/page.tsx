'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      router.push('/products');
    }
  }, [router, pathname]);

  return null;
};

export default Page;
