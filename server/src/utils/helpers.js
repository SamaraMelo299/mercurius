export function generateId(collection) {
    if (!Array.isArray(collection) || collection.length === 0) {
        return 1
    }

    return Math.max(...collection.map((item) => item.id)) + 1
}

export function normalizeText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

export function parsePrice(value) {
    return Number(Number(value).toFixed(2))
}