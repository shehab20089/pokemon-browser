import { useParams } from "react-router-dom";

export default function PokemonDetailsPage() {
  const { name } = useParams<{ name: string }>();
  return (
    <div>
      <h2>Pokemon Details</h2>
      <p>Name: {name}</p>
    </div>
  );
}
