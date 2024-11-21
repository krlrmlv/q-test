import { v4 as uuidv4 } from 'uuid'
export const getCartId = async(cookies) => {
  return await cookies.get('cart_id') ?? ''
}

export const getOrCreateCartId = async(cookies) => {
  let cartId = await cookies.get('cart_id')

  if (!cartId) {
    cartId = uuidv4()
    await cookies.set('cart_id', cartId, { path: '/', sameSite: true })
  }

  return cartId
}

export const setCartUpdatedAt = async(cookies) => {
  const timestamp = new Date().getTime()
  await cookies.set('cart_updated_at', timestamp, { path: '/', sameSite: true })
}
