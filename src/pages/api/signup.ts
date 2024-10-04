// This API endpoint:
// 1. Sends a notification to NTFY if enabled
// 2. Adds a contact to a list in Brevo if enabled

// Args:
// - name: string
// - email: string
// - message: string

// Returns:
// - 200 status if the message was sent successfully
// - 400 status if an error occurred

export const prerender = false;

import type { APIRoute } from 'astro';
import { createBrevoContact } from '~/utils/brevo';
import { sendNotification } from '~/utils/ntfy';
// import { createBrevoContact } from '~/utils/brevo'

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type') !== 'application/json') {
    // If the POST request is not a JSON request, return a 400 status to our frontend
    return new Response(null, { status: 400 });
  }

  // Initialize the success flag
  let ntfySuccess = false;
  let brevoSuccess = false;

  const body = await request.json();
  const email = body.email;
  // const first_name = body.first_name;
  // const last_name = body.last_name;
  // const password = body.password;
  // const confirm_password = body.confirm_password;

  // Debug the body
  console.debug('Data received:', body);

  try {
    /* ------------------------ Add contact to Brevo List ----------------------- */

    // Check to make sure the Waitlist ID is defined in an environment variable
    const BREVO_WAITLIST_LIST_ID = import.meta.env.BREVO_WAITLIST_LIST_ID ?? process.env.BREVO_WAITLIST_LIST_ID;
    if (BREVO_WAITLIST_LIST_ID) {
      // Ensure the list ID is a number
      const listId = parseInt(BREVO_WAITLIST_LIST_ID, 10);

      // Create a contact in Brevo
      const contactCreated = await createBrevoContact({
        email: email,
        // firstName: first_name,
        // lastName: last_name,
        listIds: [listId],
        updateEnabled: true,
      });

      if (contactCreated) {
        console.info('Contact added to Brevo successfully');
        brevoSuccess = true;
      } else {
        console.error('Failed to add contact to Brevo');
      }
    }
  } catch (error) {
    // An error occurred while doing the API operation
    console.error('An unexpected error occurred while adding contact:', error);

    // Return a 400 status to the frontend
    return new Response(null, { status: 400 });
  }

  /* -------------------------------- Send NTFY ------------------------------- */
  const ntfySent = await sendNotification({
    topic: 'postifyai-waitlist',
    body: `Email: ${email}\nContact created in Brevo: ${brevoSuccess}`,
    title: 'New waitlisted user!',
    tags: 'email',
    actions: `view, View in Brevo, https://app.brevo.com/contact/list`,
  });

  if (ntfySent) {
    console.info('NTFY notification sent successfully');
    ntfySuccess = true;
  } else {
    console.error('Failed to send NTFY notification');
  }

  /* -------------------------------- Response -------------------------------- */
  console.debug('NTFY success:', ntfySuccess);
  console.debug('Brevo success:', brevoSuccess);

  // We only really care about the success of the Brevo operation
  if (brevoSuccess) {
    return new Response(null, { status: 200 });
  } else {
    return new Response(null, { status: 400 });
  }
};
