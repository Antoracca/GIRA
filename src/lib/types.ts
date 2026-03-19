export interface ContactFormData {
  nom: string;
  prenom: string;
  organisation: string;
  fonction: string;
  pays: string;
  email: string;
  telephone?: string;
  typeDemande: string;
  message: string;
  rgpd: boolean;
  honeypot?: string;
}

export interface CandidatureFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  poste: string;
  message: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroInterneProps {
  title: string;
  subtitle?: string;
  breadcrumb: BreadcrumbItem[];
}
