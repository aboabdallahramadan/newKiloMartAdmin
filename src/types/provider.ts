
export type Provider = {
  providerId: number;
  userId: number;
  displayName: string;
  firstName: string;
  secondName: string;
  companyName: string;
  nationalApprovalId: string;
  ownerName: string;
  ownerNationalId: string;
  email: string;
  isEmailVerified: boolean;
  isActive: boolean;
  totalOrders: number;
  totalProducts: number;
  availableBalance: number;
  receivedBalance: number;
  ownershipDocumentFile: string;
  ownerNationalApprovalFile: string;
};
