import { Link } from "react-router-dom";

const samplePokemon = ["bulbasaur", "charmander", "squirtle"];

export default function PokemonListPage() {
  return (
    <div>
      <h2>Pokemon</h2>
      <ul>
        {samplePokemon.map((name) => (
          <li key={name}>
            <Link to={name}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
