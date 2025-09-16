import Hero from "./components/hero";
import About from "./components/about";
import Products from "./components/products";
import Innovations from "./components/innovations";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Innovations />
    </main>
  );
}
