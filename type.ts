export interface OrderData {
    fullName: string;
    email: string;
    address: string;
    phone: string;
    totalAmount: number;
    products: Array<{
      productId: string;
      quantity: number;
      size: string;
    }>;
  }
  