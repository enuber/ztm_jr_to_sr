// use Link instead of using <a></a>
// we use Link for server side rendering, only part that changes gets loaded.
// with <a></a> its client side rendering and you will get a flash as the whole page reloads and all the request are made.
import Link from 'next/link';
import Image from '../components/Image';

const Page = () => (
  <div>
    <h1>SSR Magician</h1>
    <Link href="/about">About</Link>
    <Link href="/robots">Robots</Link>
    <Image />
  </div>
);

export default Page;
