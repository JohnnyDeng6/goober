import OpenAI from 'openai';

import { getEventById, getInvitableUsers, insertInvitation } from './db.js';

let client;

export async function setupOpenAI() {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

//recursivly sends invitations until matched
export async function sendInvites(hostUser, numInvites, eventId) {
  try {
    if (numInvites < 1) {
      return [];
    }

    let randomUsers = [];

    try {
      const event = getEventById(eventId)
      if (event.host_id != hostUser.id)
        await insertInvitation(hostUser.id, eventId, 't'); // host is auto invited & confirmed attending
      randomUsers = await getInvitableUsers(hostUser.id, numInvites, eventId);
    } catch (err) {
      console.log("HELP " + err.toString());
      return [];
    }

    // randomUsers is array of numInvites users

    const matchedUsers = [];

    for (const user of randomUsers) {
      // query OpenAI checking for compatibility
      const chatCompletion = await client.chat.completions.create({
        messages: [{
          role: 'user',
          content: 'Given someone has the description "'
            + hostUser.description
            + '" and someone else with the description "'
            + user.description
            + '" would you say that these people would get along? Reply "Yes." or "No".'
        }],
        model: 'gpt-3.5-turbo',
      });

      if (chatCompletion.choices[0].message.content === "Yes.") {
        try {
          await insertInvitation(user.id, eventId, 'f');
          matchedUsers.push(user);
        } catch (err) {
          console.log("err at thingy: " + err.toString());
        }
      } else {
        console.log(chatCompletion.choices[0].message.content)
        console.log("chat said no :(")}
    }

    if (randomUsers.length > 0) {
      const nextMatches = await sendInvites(hostUser, numInvites - matchedUsers.length, eventId);
      return [...matchedUsers, ...nextMatches];
    }
  } catch (err) {
    console.log("Error in sendInvites: " + err.toString());
  }

  return [];
}
