// Préfixe tous les liens/assets internes avec la base du déploiement.
// En local et en prod safespace.nc la base est '/', sur GitHub Pages c'est '/safespace-beta'.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path: string): string {
  return base + path;
}
