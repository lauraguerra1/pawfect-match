import { Cat, Dog } from "./types"

const parseError = (response: Response) => {
  if(!response.ok) {
    throw new Error(`Error ${response.status} - Please try again!`);
  }
}

const getAnimalInfo = async(endpoints: string): Promise<Cat[] | Dog[]> => {
  const response = await fetch(`https://api.api-ninjas.com/v1/${endpoints}`, {
    headers: {
      "X-Api-Key": process.env.REACT_APP_API_KEY!
    }
  })
  parseError(response);
  return response.json();
}

const getChatGPTFunFact = async (animalName: string): Promise<{ choices: [{text: string}]}> => {
  const reqBody = {
    "model": "text-davinci-002",
    "temperature": 0.7,
    "max_tokens": 250,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "prompt": `Give me a fun fact about this animal breed: ${animalName}`
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ process.env.REACT_APP_AI_KEY,
      'organization': 'org-CJUIDmy91NGowrKIalGhRw2U'
    },
    body: JSON.stringify(reqBody)
  };

  const response = await fetch('https://api.openai.com/v1/completions', requestOptions)
  parseError(response)
  return response.json();
};

export {getAnimalInfo, getChatGPTFunFact}