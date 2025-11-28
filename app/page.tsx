import Hero from "./components/hero";
import About from "./components/about";
import Products from "./components/products";
import Innovations from "./components/innovations";
import Team from "./components/team";
import ApplyNow from "./components/applyNow";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Innovations />
      <Team />
      <ApplyNow />
    </main>
  );
}
