// crops.constant.ts

export const agricultureTypes = [
  'Organic',
  'Conventional',
  'Hydroponic',
  'Biodynamic',
  'Integrated',
  'Permaculture',
] as const

export const cropCategories = [
  'Fruits',
  'Vegetables',
  'Grains',
  'Legumes',
  'Nuts',
  'Herbs',
  'Tubers',
  'Other',
] as const

export const quantityUnits = [
  'kg',
  'g',
  'ton',
  'lb',
  'pieces',
  'bunch',
  'dozen',
  'crate',
  'bag',
  'box',
] as const

export const growingEnvironments = [
  'Field',
  'Greenhouse',
  'Indoor',
  'Vertical Farm',
  'Aquaponic System',
  'Hydroponic System',
] as const

export const cropsSearchableFields = [
  'name',
  'location',
  'agriculture_type',
  'classification',
  'grown_in'
];
