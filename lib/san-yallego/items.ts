export type ItemId = 'llave-san-yallego'

export interface Item {
  id: ItemId
  name: string
  description: string
}

export const ITEMS: Record<ItemId, Item> = {
  'llave-san-yallego': {
    id: 'llave-san-yallego',
    name: 'Llave de San Yallego',
    description: 'Cobre viejo con destellos dorados suaves.',
  },
}
