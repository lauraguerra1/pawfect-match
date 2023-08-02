import { Dog, Cat } from "./types"

const getNames = (animals: Dog[] | Cat[]) => animals.map(animal => animal.name)


const getRandomAnimal = (animals: string[]) => {
  return animals[Math.floor(Math.random() * animals.length) ] 
}

export {getNames, getRandomAnimal}