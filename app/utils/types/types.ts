export interface Preference {
  remote: boolean;
  hybrid: boolean;
  onsite: boolean;
}

export interface Relocation {
  anotherState: boolean;
  anotherCountry: boolean;
}

export interface RecruiteRequest {
  id: string;
  office_location_city: string;
  office_location_country: string;
  avatar: string;
  hiring_ad: string;
  application_status: boolean;
  work_mode: string;
  organization_url: string;
  twitter_recruiter: string;
  amount: string;
  position: string;
  organization: string;
  name: string;
  tags: { tagNames: string[] };
}

interface Category {
  id: string;
  name: string;
  subCategories: string[];
  showSubCategories: boolean;
}

export interface WorkInterface {
  id: number;
  work: string;
}
export interface ExperienceInterface {
  id: number;
  role: string;
  from: string;
  to: string;
  city: string;
  country: string;
  remote: string;
  work: WorkInterface[] | [];
}

export interface CV {
  id: string;
  avatar: string;
  country: string;
  location: string;
  resume_id: string;
  experience: ExperienceInterface[];
  name: string;
  preference: { preferences: Preference[] };
  relocation: { relocateTo: Relocation[] };
  salary: string;
  is_hired: boolean;
  years_of_experience: number;
  profession: string;
}

export interface AdminInterface {
  id: string;
  name: string;
  resume_count: number;
  referral_earnings: number;
  referral_count: number;
}
