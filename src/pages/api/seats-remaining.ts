export const prerender = false;

import type { APIRoute } from 'astro';
import { getBrevoListDetails } from '~/utils/brevo';

const seatsAvailable = 100;

export const GET: APIRoute = async () => {
  // Check to make sure the Waitlist ID is defined in an environment variable
  const listIdStr: string = import.meta.env.BREVO_WAITLIST_LIST_ID ?? process.env.BREVO_WAITLIST_LIST_ID;
  if (listIdStr) {
    // Ensure the list ID is a number
    const listId = parseInt(listIdStr, 10);

    const listDetails = await getBrevoListDetails(listId);
    const contactsWaitlisted = listDetails?.totalSubscribers || 0;
    const seatsRemaining = seatsAvailable - contactsWaitlisted;

    return new Response(JSON.stringify({ seatsRemaining }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(null, { status: 400 });
  }
};
