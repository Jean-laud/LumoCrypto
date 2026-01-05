import { useState } from "react";
import { addAsset } from "../services/api";

const CRYPTOS = [
  "BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "DOT", "AVAX", "MATIC", "LTC", "TRX", "LINK", "XLM", "ATOM", "ETC", "XMR", "BCH"
];

function AddAssetForm({ onAssetAdded }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCryptos = CRYPTOS.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!symbol || !quantity) return;

    try {
      await addAsset(token, symbol, Number(quantity));
      setSymbol("");
      setQuantity("");
      setSearch("");
      onAssetAdded();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de l'actif.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">

      <h3>Ajouter un actif</h3>

      <div className="crypto-selector">
        <button
          type="button"
          className="burger-btn"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {symbol || "Choisir une crypto"}
        </button>

        {openMenu && (
          <div className="crypto-menu">
            
            <input
              type="text"
              className="crypto-search"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
              {filteredCryptos.length === 0 && (
                <li className="no-result">Aucun résultat</li>
              )}

              {filteredCryptos.map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setSymbol(c);
                    setOpenMenu(false);
                    setSearch("");
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <input
        type="number"
        step="any"
        placeholder="Quantité"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddAssetForm;