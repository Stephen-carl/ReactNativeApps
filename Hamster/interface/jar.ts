export interface theJar{
    "childId": number, 
    "currentAmount": number, 
    "guardianId": number, 
    "id": number, 
    "previousAmount": number, 
    "topUpDate": number
}

export interface theTransactionItem {
  id: number;
  childId: number;
  amount: number;
  reason: string;
  takeOutId: number;
  itemProfile: string;
  date: string;
}

export type theTransaction = theTransactionItem[];