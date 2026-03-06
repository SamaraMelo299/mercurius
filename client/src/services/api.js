const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api'

export async function getProducts(filters = {}) {
  const params = new URLSearchParams()

  if (filters.category && filters.category !== 'all') {
    params.append('category', filters.category)
  }

  if (filters.q) {
    params.append('q', filters.q)
  }

  if (filters.sort && filters.sort !== 'default') {
    params.append('sort', filters.sort)
  }

  const queryString = params.toString()
  const url = queryString
    ? `${API_BASE_URL}/products?${queryString}`
    : `${API_BASE_URL}/products`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos.')
  }

  const result = await response.json()
  return result.data
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar produto.')
  }

  const result = await response.json()
  return result.data
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Erro ao criar pedido.')
  }

  return result.data
}