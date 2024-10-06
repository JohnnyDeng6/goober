import OpenAI from 'openai';

import { getRandomUser } from './db.js';

let client;

export async function setupOpenAI() {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function matchUser(targetUser) {
  console.log('Matching for target user:');
  console.log(JSON.stringify(targetUser));

  const randomUser = await getRandomUser(targetUser.name);

  console.log('Random user is:');
  console.log(JSON.stringify(randomUser));

  const chatCompletion = await client.chat.completions.create({
    messages: [{
      role: 'user',
      content: 'Given someone has the description "'
        + targetUser.description
        + '" and someone else with the description "'
        + randomUser.description
        + '" would you say that these people "match"? Reply "Yes." or "No".'
    }],
    model: 'gpt-3.5-turbo',
  });

  console.log('OpenAI response is:');
  console.log(JSON.stringify(chatCompletion));
}
