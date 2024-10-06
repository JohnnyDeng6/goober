import OpenAI from 'openai';

import { isOKToInvite, getRandomUser, insertInvitation, numPossibleInvites } from './db.js';

let client;

export async function setupOpenAI() {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function sendInvites(hostUser, numMatches, eventId) {
  try {
    try {
      await insertInvitation(hostUser.id, eventId, 't');

      const numPossibleMatches = await numPossibleInvites(eventId);

      if (numPossibleMatches < numMatches) {
        console.log("Less people available than attempting to invite: " + numPossibleMatches.toString());
        numMatches = numPossibleMatches;
      }
    } catch (err) {
      // pass
    }

    let matchedUsers = [];

    while (matchedUsers.length < numMatches) {
      const randomUser = await getRandomUser(hostUser.name);

      if (!randomUser || !isOKToInvite(randomUser.id, eventId)) {
        continue;
      }

      const chatCompletion = await client.chat.completions.create({
        messages: [{
          role: 'user',
          content: 'Given someone has the description "'
            + hostUser.description
            + '" and someone else with the description "'
            + randomUser.description
            + '" would you say that these people "match"? Reply "Yes." or "No".'
        }],
        model: 'gpt-3.5-turbo',
      });

      if (chatCompletion.choices[0].message.content === "Yes.") {
        try {
          await insertInvitation(randomUser.id, eventId, 'f');
          matchedUsers.push(randomUser);
        } catch (err) {
          // pass
        }
      } else {
        // pass
      }
    }

    return matchedUsers;
  } catch (err) {
    console.log("Error in sendInvites: " + err.toString());
  }
}
