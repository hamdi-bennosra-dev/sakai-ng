// export interface Reservation {
//     id: string; // UUID
//     loanedOn: Date;
//     loanedFrom: Date;
//     loanedUntil: Date;
//     userId: string; // UUID of the user
//     //price?: Price;
//     //product?: Product;
//   }
  
export interface Reservation {
  id: string;
  loanedOn: string;  // Assurez-vous que c'est une chaîne
  loanedFrom: string; // Assurez-vous que c'est une chaîne
  loanedUntil: string; // Assurez-vous que c'est une chaîne
  userId: string;
  price: {
    id: string;
    amount: number;
    currency: string;
  };
  product: {
    id: string;
    reference: string;
    productModel: {
      id: string;
      name: string;
    };
  };
}

