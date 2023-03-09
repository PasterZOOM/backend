export type ProductPhotoType = {
  id: string
  url: string
}
export enum EFilterKeys {
  ASSIGNMENTS = 'assignments',
  CATEGORIES = 'categories',
  LEATHERS = 'leathers',
  LEATHER_COLORS = 'leatherColors',
}

export type PhotosType = Record<string, ProductPhotoType[]>
