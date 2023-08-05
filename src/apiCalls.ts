import { Cat, Dog } from "./types"

const parseError = (response: Response): Promise<Cat[] | Dog[]> => {
  if(!response.ok) {
    throw new Error(`Error ${response.status} - Please try again!`);
  }
  return response.json();
}

const getAnimalInfo = async(endpoints: string) => {
  const response = await fetch(`https://api.api-ninjas.com/v1/${endpoints}`, {
    headers: {
      "X-Api-Key": process.env.REACT_APP_API_KEY!
    }
  })
  const data = parseError(response);
  return data;
}

export {getAnimalInfo}