/**
 * Génère un ID unique simple sans dépendance externe
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
