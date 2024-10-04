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

export const prerender = false

import type { APIRoute } from 'astro'
import { sendNotification } from '~/utils/ntfy'

// import {
//   createBrevoContact,
//   sendTransactionalTemplateEmail
// } from '~/utils/brevo'

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type') === 'application/json') {
    const body = await request.json()
    const name = body.name
    const email = body.email
    const message = body.message

    // Debug the body
    console.debug('Data received:', body)

    // Initialize the success flag
    let success = false

    try {
      /* -------------------------------- Send NTFY ------------------------------- */
      const ntfySent = await sendNotification({
        topic: 'autovisita-contact',
        body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        title: 'New contact form submission',
        tags: 'email',
        actions: `view, Reply via Email, mailto:${email}`,
        email: 'hola@autovisita.es'
      })

      if (ntfySent) {
        console.info('NTFY notification sent successfully')
        success = true
      } else {
        console.error('Failed to send NTFY notification')
      }

      /* ------------------------ Create a contact in Brevo ----------------------- */
      // TODO: Enable Brevo integration
      //     // Split the name into first and last name if it contains a space
      //     const nameParts = name.split(' ')
      //     const firstName = nameParts[0]
      //     const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

      //     console.info('Creating a contact in Brevo')
      //     let BREVO_CONTACT_LIST_ID =
      //       import.meta.env.BREVO_CONTACT_LIST_ID ??
      //       process.env.BREVO_CONTACT_LIST_ID

      //     if (!BREVO_CONTACT_LIST_ID) {
      //       console.warn(
      //         'env variable BREVO_CONTACT_LIST_ID not defined, the contact will not be added to a list'
      //       )
      //     } else {
      //       // Assert a number
      //       BREVO_CONTACT_LIST_ID = parseInt(BREVO_CONTACT_LIST_ID)
      //     }

      //     await createBrevoContact({
      //       email: email,
      //       firstName: firstName,
      //       lastName: lastName,
      //       listIds: [BREVO_CONTACT_LIST_ID],
      //       updateEnabled: true
      //     })

      //     /* ---------------------- Send an email to the inquirer --------------------- */
      //     let BREVO_CONTACT_TEMPLATE_ID =
      //       import.meta.env.BREVO_CONTACT_TEMPLATE_ID ??
      //       process.env.BREVO_CONTACT_TEMPLATE_ID

      //     if (!BREVO_CONTACT_TEMPLATE_ID) {
      //       console.error('env variable BREVO_CONTACT_TEMPLATE_ID not defined')
      //       return new Response(null, { status: 400 })
      //     } else {
      //       // Assert a number
      //       BREVO_CONTACT_TEMPLATE_ID = parseInt(BREVO_CONTACT_TEMPLATE_ID)
      //       console.debug('Template ID:', BREVO_CONTACT_TEMPLATE_ID)
      //     }

      //     const BREVO_CONTACT_RECEPTION_EMAIL =
      //       import.meta.env.BREVO_CONTACT_RECEPTION_EMAIL ??
      //       process.env.BREVO_CONTACT_RECEPTION_EMAIL

      //     if (!BREVO_CONTACT_RECEPTION_EMAIL) {
      //       console.warn('env variable BREVO_CONTACT_RECEPTION_EMAIL not defined')
      //       console.warn('The email will not be sent to you')
      //     }

      //     const messageSent = await sendTransactionalTemplateEmail({
      //       toName: name,
      //       toEmail: email,
      //       bccEmail: BREVO_CONTACT_RECEPTION_EMAIL,
      //       templateId: BREVO_CONTACT_TEMPLATE_ID,
      //       params: {
      //         NAME: name,
      //         CONTACT_BODY: message
      //       }
      //     })

      //     // Failure point: if the email was not sent
      //     if (!messageSent) {
      //       console.error('Could not send the email')
      //       return new Response(null, { status: 400 })
      //     }

      /* ------------------ Everything was processed successfully ----------------- */
      if (success) {
        console.info('Contact form processed successfully')

        // Return a 200 status and the response to our frontend
        return new Response(
          JSON.stringify({
            message: 'Contact form processed successfully'
          }),
          {
            status: 200
          }
        )
      } else {
        console.error(
          'None of the operations were successful, returning a 400 status'
        )
        return new Response(null, { status: 400 })
      }
    } catch (error) {
      // An error occurred while doing the API operation
      console.error('An unexpected error occurred while adding contact:', error)
      return new Response(null, { status: 400 })
    }
  }

  // If the POST request is not a JSON request, return a 400 status to the frontend
  return new Response(null, { status: 400 })
}
