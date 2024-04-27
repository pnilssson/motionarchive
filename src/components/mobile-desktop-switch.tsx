'use client';

import useScreenSize from '../hooks/useScreenSize';

export default function Component({
  desktop,
  mobile,
}: {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}) {
  const screenSize = useScreenSize();
  return <>{screenSize.width < 768 ? mobile : desktop}</>;
}
