 export type Job ={
    uuid: string;
    title: string;
    company_uuid: string;
    url: string;
    is_top: boolean;
    gpa: number;
    years_of_experience: number[];
    geolocation: {
      latitude: number;
      longitude: number;
    };
    willing_to_travel: boolean;
    willing_to_relocate: boolean;
    owns_a_car: boolean;
    visa_sponsorship: boolean;
    salary: {
      min: number;
      max: number;
    };
    gender: string;
    description: string;
    requirements: string;
    translations: any[];
    skills: string[];
    uri: string;
    posted_at: string;
    score: number;
    is_applied: boolean;
    applied_at: string | null;
    outside: boolean;
    has_profile: boolean;
    outside_key: string | null;
    hidden_columns: any[];
    job_type: string[];
    degree: string[];
    industry: string[];
    major: string[];
    nationality: string[];
    career_level: string[];
    languages: {
      [key: string]: number;
    }[];
    location: {
      city: string;
      country: string;
    };
    category: string[];
  }
 export type JobDetails= {
    uuid: string;
    title: string;
    company_uuid: string;
    url: string;
    is_top: boolean;
    gpa: number;
    years_of_experience: number[];
    geolocation: {
      latitude: number;
      longitude: number;
    };
    willing_to_travel: boolean;
    willing_to_relocate: boolean;
    owns_a_car: boolean;
    visa_sponsorship: boolean;
    salary: {
      min: number;
      max: number;
    };
    gender: 'Male' | 'Female' | 'Other';
    description: string;
    requirements: string;
    translations: string[];
    skills: string[];
    uri: string;
    posted_at: string;
    score: number;
    is_applied: boolean;
    applied_at: string | null;
    outside: boolean;
    has_profile: boolean;
    outside_key: string | null;
    hidden_columns: string[];
    job_type: string[];
    degree: string[];
    industry: string[];
    major: string[];
    nationality: string[];
    career_level: string[];
    languages: Array<{
      [key: string]: number;
    }>;
    location: {
      city: string;
      country: string;
    };
    category: string[];
  };
