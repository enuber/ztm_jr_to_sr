import Link from 'next/link';

const About = () => {
  return (
    <div style={{ color: 'blue', fontSize: '20px' }}>
      <h1>About</h1>
      <Link href="/">Back</Link>
      <p> I was a magician once.</p>
    </div>
  );
};
export default About;
