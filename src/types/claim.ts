export interface Claim {
  id?: string;
  title: string;
  description: string;
  receptionDate: Date;
  image?: File | null;
  imageUrl?: string;
  sector?: string;
}

export interface FormErrors {
  title?: string;
  description?: string;
  receptionDate?: string;
  image?: string;
}
