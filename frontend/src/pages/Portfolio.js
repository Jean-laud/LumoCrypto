import { useEffect, useState } from "react";
import { 
  getAssets, 
  deleteAsset, 
  removeAssetQuantity, 
  addAssetQuantity 
} from "../services/api";
import AddAssetForm from "../components/AddAssetForm";
import LogoutButton from "../components/LogoutButton";
import "../styles/portfolio.css";

function Portfolio() {
  const [assets, setAssets] = useState([]);
  const [reduceQty, setReduceQty] = useState({});
  const [increaseQty, setIncreaseQty] = useState({});
  const [popupMessage, setPopupMessage] = useState("");

  const loadAssets = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getAssets(token);
      setAssets(data);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const total = assets.reduce((sum, a) => sum + a.value, 0);

  const handleAssetAdded = async () => {
    await loadAssets();
    setPopupMessage("Crypto ajoutée au portefeuille !");
    setTimeout(() => setPopupMessage(""), 2000);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await deleteAsset(id, token);
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Impossible de supprimer cet actif.");
    }
  };

  const handleReduce = async (id) => {
    const qty = Number(reduceQty[id]);
    if (!qty || qty <= 0) return alert("Quantité invalide.");

    try {
      const token = localStorage.getItem("token");
      await removeAssetQuantity(token, id, qty);
      await loadAssets();
      setReduceQty((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleIncrease = async (id) => {
    const qty = Number(increaseQty[id]);
    if (!qty || qty <= 0) return alert("Quantité invalide.");

    try {
      const token = localStorage.getItem("token");
      await addAssetQuantity(token, id, qty);
      await loadAssets();
      setIncreaseQty((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="portfolio">

      <header className="portfolio-header">
        <h2>Mon portefeuille</h2>
        <LogoutButton />
      </header>

      <section className="portfolio-add">
        <AddAssetForm onAssetAdded={handleAssetAdded} />
      </section>

      <section className="portfolio-total">
        <h3>Valeur totale</h3>
        <p>{total.toFixed(2)} €</p>
      </section>

      <section className="portfolio-list">
        {assets.length === 0 && (
          <p className="portfolio-empty">Aucun actif pour le moment</p>
        )}

        {assets.map((asset) => (
          <article className="asset" key={asset.id}>

            <header className="asset-header">
              <div>
                <h4>{asset.symbol}</h4>
                <span>{asset.quantity} unités</span>
              </div>

              <p className="asset-value">{asset.value.toFixed(2)} €</p>
            </header>

            <footer className="asset-footer">

              <div className="asset-action asset-action-left">
                <input
                  type="number"
                  placeholder="+ quantité"
                  value={increaseQty[asset.id] || ""}
                  onChange={(e) =>
                    setIncreaseQty((prev) => ({
                      ...prev,
                      [asset.id]: e.target.value,
                    }))
                  }
                />
                <button onClick={() => handleIncrease(asset.id)}>Ajouter</button>
              </div>

              <div className="asset-action asset-action-center">
                <input
                  type="number"
                  placeholder="- quantité"
                  value={reduceQty[asset.id] || ""}
                  onChange={(e) =>
                    setReduceQty((prev) => ({
                      ...prev,
                      [asset.id]: e.target.value,
                    }))
                  }
                />
                <button onClick={() => handleReduce(asset.id)}>Retirer</button>
              </div>

              <button
                className="asset-delete"
                onClick={() => handleDelete(asset.id)}
              >
                Supprimer
              </button>

            </footer>
          </article>
        ))}
      </section>

      {popupMessage && (
        <div className="popup">
          {popupMessage}
        </div>
      )}

    </main>
  );
}

export default Portfolio;