const API_URL = "http://localhost:4000";

export async function register(email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors de l'inscription.");
  }

  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Email ou mot de passe incorrect.");
  }

  return data;
}

export async function addAsset(token, symbol, quantity) {
  const res = await fetch(`${API_URL}/portfolio/add-asset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ symbol, quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible d'ajouter l'actif.");
  }

  return data;
}

export async function getAssets(token) {
  const res = await fetch(`${API_URL}/portfolio/assets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return [];
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors de la récupération des actifs.");
  }

  return data;
}

export async function deleteAsset(id, token) {
  const res = await fetch(`${API_URL}/portfolio/assets/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible de supprimer cet actif.");
  }

  return data;
}

export async function removeAssetQuantity(token, assetId, quantity) {
  const res = await fetch(`${API_URL}/portfolio/assets/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ assetId, quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors de la réduction.");
  }

  return data;
}

export async function addAssetQuantity(token, assetId, quantity) {
  const res = await fetch(`${API_URL}/portfolio/assets/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ assetId, quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors de l'ajout de quantité.");
  }

  return data;
}
