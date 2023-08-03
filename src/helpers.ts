import { Dog, Cat } from "./types"

const getNames = (animals: Dog[] | Cat[]) => animals.map(animal => animal.name)


const getRandomAnimal = (animals: string[]) => {
  return animals[Math.floor(Math.random() * animals.length) ] 
}

const isCat = (animal: any): animal is Cat =>  {
  return (animal as Cat).general_health !== undefined
}

const isDog = (animal: any): animal is Dog =>  {
  return (animal as Dog).drooling !== undefined
}
export {getNames, getRandomAnimal, isCat, isDog}