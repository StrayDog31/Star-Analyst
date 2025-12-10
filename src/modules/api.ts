export interface StarClass {
  id: number;
  name: string;
  temperature: number;
  color: string;
  spectre: string;
  examples: string;
  isDeleted: boolean;
  image_url?: string;
  massRequestToClass: any | null;
}

export interface RequestBin {
  request_id: number;
  item_count: number;
}

const getApiBase = () => {
  const isTauri =
    typeof window !== "undefined" && (window as any).__TAURI__ !== undefined;
  return "http://localhost:8080/api";
};

const API_BASE = getApiBase();

const MOCK_CLASSES: StarClass[] = [
  {
    id: 1,
    name: "O",
    temperature: 30000,
    color: "Голубой",
    spectre: "O5-O9",
    examples: "Зета Ориона",
    isDeleted: false,
    image_url: "/images/default.png",
    massRequestToClass: null,
  },
  {
    id: 2,
    name: "B",
    temperature: 20000,
    color: "Бело-голубой",
    spectre: "B0-B9",
    examples: "Ригель",
    isDeleted: false,
    image_url: "/images/default.png",
    massRequestToClass: null,
  },
  {
    id: 3,
    name: "A",
    temperature: 8500,
    color: "Белый",
    spectre: "A0-A9",
    examples: "Сириус, Вега",
    isDeleted: false,
    image_url: "/images/default.png",
    massRequestToClass: null,
  },
];

const MOCK_REQUEST_BIN: RequestBin = {
  request_id: 0,
  item_count: 0,
};

function mapBackendToFrontend(data: any): StarClass {
  return {
    id: data.ID,
    name: data.Name,
    temperature: data.Temperature,
    color: data.Color,
    spectre: data.Spectre,
    examples: data.Examples,
    isDeleted: data.IsDeleted,
    image_url: data.Image,
    massRequestToClass: data.MassRequestToClass,
  };
}

export async function fetchClasses(query: string = ""): Promise<StarClass[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append("query", query);

    const res = await fetch(`${API_BASE}/classes?${params}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return Array.isArray(data) ? data.map(mapBackendToFrontend) : [];
  } catch (err) {
    console.warn("Using mock data for classes:", err);
    console.log("API_BASE used:", API_BASE); // Для отладки
    return MOCK_CLASSES.filter(
      (cls) =>
        !cls.isDeleted &&
        (cls.name.toLowerCase().includes(query.toLowerCase()) ||
          cls.examples.toLowerCase().includes(query.toLowerCase()) ||
          cls.spectre.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

export async function fetchClassById(id: string): Promise<StarClass | null> {
  try {
    const res = await fetch(`${API_BASE}/classes/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return mapBackendToFrontend(data);
  } catch (err) {
    console.warn("Using mock data for class ID:", id, err);
    console.log("API_BASE used:", API_BASE); // Для отладки
    const classId = parseInt(id);
    return (
      MOCK_CLASSES.find((cls) => cls.id === classId && !cls.isDeleted) || null
    );
  }
}

export async function createStarClass(
  starClass: Omit<StarClass, "id">
): Promise<StarClass> {
  try {
    const res = await fetch(`${API_BASE}/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: starClass.name,
        Temperature: starClass.temperature,
        Color: starClass.color,
        Spectre: starClass.spectre,
        Examples: starClass.examples,
        Image: starClass.image_url || "",
        IsDeleted: false,
        MassRequestToClass: null,
      }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return mapBackendToFrontend(data);
  } catch (err) {
    console.error("Error creating star class:", err);
    throw err;
  }
}

export async function updateStarClass(
  id: string,
  starClass: Omit<StarClass, "id">
): Promise<StarClass> {
  try {
    const res = await fetch(`${API_BASE}/classes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: starClass.name,
        Temperature: starClass.temperature,
        Color: starClass.color,
        Spectre: starClass.spectre,
        Examples: starClass.examples,
        Image: starClass.image_url || "",
        IsDeleted: starClass.isDeleted,
        MassRequestToClass: starClass.massRequestToClass,
      }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return mapBackendToFrontend(data);
  } catch (err) {
    console.error("Error updating star class:", err);
    throw err;
  }
}

export async function deleteStarClass(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/classes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  } catch (err) {
    console.error("Error deleting star class:", err);
    throw err;
  }
}

export async function fetchRequestBin(): Promise<RequestBin> {
  try {
    const res = await fetch(`${API_BASE}/requests/cart`);
    if (!res.ok) throw new Error("Cart fetch failed");
    return await res.json();
  } catch (err) {
    console.warn("Using mock request bin:", err);
    return MOCK_REQUEST_BIN;
  }
}

export async function fetchCartCount(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/mass-requests/star-calculation`);
    if (!response.ok) throw new Error("Failed to fetch cart count");

    const data = await response.json();
    return data.item_count || 0;
  } catch (error) {
    console.warn("Using mock cart count:", error);
    return 3;
  }
}
