import { type SchemaTypeDefinition } from "sanity";

import { productListType } from "./productListtype";
import { products } from "./products";
import order from "./order";


// import { order } from "./order";
// import { orderItem } from "./orderItem";
// import { customer } from "./customer";




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ productListType,products,order],
};
