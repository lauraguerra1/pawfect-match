export interface Indexable {
  [key: string]: any;
}

export type QuizAnswers = {
  pet: string, 
  query1: string,
  query2: string,
  query3: string
}

export interface Cat {
  length: string;
  origin: string;
  image_link: string;
  family_friendly: number;
  shedding: number;
  general_health: number;
  playfulness: number;
  children_friendly: number;
  grooming: number;
  other_pets_friendly: number;
  min_weight: number;
  max_weight: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  name: string;
}

export interface Dog {
  image_link: string;
  good_with_children: number;
  good_with_other_dogs: number;
  shedding: number;
  grooming: number;
  drooling: number;
  coat_length: number;
  good_with_strangers: number;
  playfulness: number;
  protectiveness: number;
  trainability: number;
  energy: number;
  barking: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  max_height_male: number;
  max_height_female: number;
  max_weight_male: number;
  max_weight_female: number;
  min_height_male: number;
  min_height_female: number;
  min_weight_male: number;
  min_weight_female: number;
  name: string;
}
