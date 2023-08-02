import { Dog } from "./types"

const getNames = (animals: Dog[]) => animals.map(animal => animal.name)


const getRandomAnimal = (animals: string[]) => {
  return animals[Math.floor(Math.random() * animals.length) ] 
}

export {getNames, getRandomAnimal}