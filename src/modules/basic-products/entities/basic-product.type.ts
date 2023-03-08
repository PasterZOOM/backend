export type ProductPhotoType = {
  id: string
  url: string
}

export type PhotosType = Record<string, ProductPhotoType[]>
