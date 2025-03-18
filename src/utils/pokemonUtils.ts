// Formate l'ID
export const formatId = (id: number): string => {
  return id.toString().padStart(3, "0");
};

// Mapping des couleurs par type
const typeColors: Record<string, string> = {
  normal: "bg-gray-500",
  fire: "bg-gradient-to-br from-orange-400 to-red-500",
  water: "bg-gradient-to-br from-blue-400 to-blue-600",
  grass: "bg-gradient-to-br from-green-400 to-emerald-600",
  electric: "bg-gradient-to-br from-yellow-300 to-amber-500",
  ice: "bg-gradient-to-br from-cyan-300 to-sky-500",
  fighting: "bg-gradient-to-br from-red-600 to-rose-700",
  poison: "bg-gradient-to-br from-purple-400 to-fuchsia-600",
  ground: "bg-gradient-to-br from-yellow-600 to-amber-700",
  flying: "bg-gradient-to-br from-indigo-300 to-violet-400",
  psychic: "bg-gradient-to-br from-pink-400 to-rose-500",
  bug: "bg-gradient-to-br from-lime-400 to-green-500",
  rock: "bg-gradient-to-br from-yellow-700 to-amber-800",
  ghost: "bg-gradient-to-br from-purple-600 to-indigo-800",
  dragon: "bg-gradient-to-br from-indigo-600 to-purple-700",
  dark: "bg-gradient-to-br from-gray-700 to-gray-900",
  steel: "bg-gradient-to-br from-gray-400 to-slate-500",
  fairy: "bg-gradient-to-br from-pink-300 to-pink-500",
};

export const getTypeColor = (type: string): string => {
  return typeColors[type] || typeColors.normal;
};

// Mapping des couleurs par type pour les badges
const badgeColors: Record<string, string> = {
  normal: "bg-gray-500",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  ice: "bg-cyan-500",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-amber-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-slate-500",
  fairy: "bg-pink-400",
};

export const getTypeBadgeColor = (type: string): string => {
  return badgeColors[type] || badgeColors.normal;
};

// Couleurs pour les barres de statistiques
const statColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

export const getStatBarColor = (statName: string): string => {
  return statColors[statName.toLowerCase()] || "bg-gray-500";
};
