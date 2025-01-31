export interface Product {
  _id: string;
  _type: string;
  name: string;
  slug: { current: string };
  inStock: boolean;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
  colors?: string[];
  department: string;
  rating?: number;
  stock?: number;
  reviews: Review[]; 
}

export interface Product1 {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export type Address = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: "yes" | "no";
};
export type unit = "ounce" | "gram" | "kilogram" | "pound";
export type dimensionUnit = "inch" | "centimeter";

export type Package = {
  weight: {
    value: number;
    unit: unit;
  };
  dimensions: {
    height: number;
    width: number;
    length: number;
    unit: dimensionUnit;
  };
};

export type Rate = {
  rateId: string;
  rateType: string;
  carrierId: string;
  shippingAmount: {
    currency: string;
    amount: number;
  };
  serviceType: string;
  serviceCode: string;
  trackable: boolean;
  carrierFriendlyName: string;
  validationStatus: string;
  warningMessages?: string[];
};

export interface trackingObjType {
  trackingNumber: string;
  labelId: string;
  carrierCode: string;
}

export interface TrackingData {
  trackingNumber?: string;
  statusDescription?: string;
  carrierStatusDescription?: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
}
