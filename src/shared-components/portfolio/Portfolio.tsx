import useSealedPokemonProducts from "../../hooks/pokemon/useSealedPokemonProducts";

const Portfolio = () => {
  const { sealedProducts, isLoading, error } = useSealedPokemonProducts();

  //console.log(sealedProducts); // check the browser console

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {sealedProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
};

export default Portfolio
