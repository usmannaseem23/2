import { type SchemaTypeDefinition } from "sanity";

import { productListType } from "./productListtype";
import { products } from "./products";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ productListType,  products],
};
