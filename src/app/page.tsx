import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <h1>Hello World</h1>
      <nav>
        <Link href="/login">Login</Link>
        <br />
        <Link href="/register">Register</Link>
        <br />
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </main>
  );
};

export default Home;