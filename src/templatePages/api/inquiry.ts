// This API endpoint:
// 1. Sends a notification to NTFY
// 2. Creates a contact in Brevo

// Args:
// - name: string
// - email: string
// - service: string
// - inquiry_body: string

// Returns:
// - 200 status if the contact was added successfully
// - 400 status if an error occurred

export const prerender = false

import type { APIRoute } from 'astro'

import { sendGenericNotification } from '~/utils/ntfy'
import {
  createBrevoContact,
  sendTransactionalTemplateEmail
} from '~/utils/brevo'

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type') === 'application/json') {
    const body = await request.json()
    const name = body.name
    const email = body.email
    const service = body.service
    const inquiry_body = body.inquiry_body

    // Debug the body
    console.log('Data received:', body)

    // Whatever process you want to do in your API endpoint should be inside a try/catch block

    try {
      /* ------------------------ Create a contact in Brevo ----------------------- */
      // Split the name into first and last name if it contains a space
      const nameParts = name.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

      console.log('Creating a contact in Brevo')
      let BREVO_INQUIRY_LIST_ID =
        import.meta.env.BREVO_INQUIRY_LIST_ID ??
        process.env.BREVO_INQUIRY_LIST_ID

      if (!BREVO_INQUIRY_LIST_ID) {
        console.warn(
          'env variable BREVO_INQUIRY_LIST_ID not defined, the contact will not be added to a list'
        )
      } else {
        // Assert a number
        BREVO_INQUIRY_LIST_ID = parseInt(BREVO_INQUIRY_LIST_ID)
      }

      await createBrevoContact({
        email: email,
        firstName: firstName,
        lastName: lastName,
        listIds: [BREVO_INQUIRY_LIST_ID],
        updateEnabled: true
      })

      /* ---------------------- Send an email to the inquirer --------------------- */
      let BREVO_INQUIRY_TEMPLATE_ID =
        import.meta.env.BREVO_INQUIRY_TEMPLATE_ID ??
        process.env.BREVO_INQUIRY_TEMPLATE_ID

      if (!BREVO_INQUIRY_TEMPLATE_ID) {
        console.error('env variable BREVO_INQUIRY_TEMPLATE_ID not defined')
        return new Response(null, { status: 400 })
      } else {
        // Assert a number
        BREVO_INQUIRY_TEMPLATE_ID = parseInt(BREVO_INQUIRY_TEMPLATE_ID)
      }

      const BREVO_INQUIRY_RECEPTION_EMAIL =
        import.meta.env.BREVO_INQUIRY_RECEPTION_EMAIL ??
        process.env.BREVO_INQUIRY_RECEPTION_EMAIL

      if (!BREVO_INQUIRY_RECEPTION_EMAIL) {
        console.warn('env variable BREVO_INQUIRY_RECEPTION_EMAIL not defined')
        console.warn('The email will not be sent to the inquirer')
      }

      const messageSent = await sendTransactionalTemplateEmail({
        toName: name,
        toEmail: email,
        bccEmail: BREVO_INQUIRY_RECEPTION_EMAIL,
        templateId: BREVO_INQUIRY_TEMPLATE_ID,
        params: {
          NAME: name,
          SERVICE: service,
          INQUIRY_BODY: inquiry_body
        }
      })

      // Failure point: if the email was not sent
      if (!messageSent) {
        console.error('Could not send the email')
        return new Response(null, { status: 400 })
      }

      /* ----------------------- Send a notification to NTFY ---------------------- */
      const ntfyTitle = 'New Inquiry'
      const ntfyMessage = `
Name: ${name}
Email: ${email}
Service: ${service}
Inquiry: ${inquiry_body}
`
      await sendGenericNotification(
        'gearshift-inquiries',
        ntfyTitle,
        ntfyMessage,
        'tada'
      )

      // Return a 200 status and the response to our frontend
      return new Response(
        JSON.stringify({
          message: 'Contact added successfully'
        }),
        {
          status: 200
        }
      )
    } catch (error) {
      // An error occurred while doing our API operation
      console.error('An unexpected error occurred while adding contact:', error)
      return new Response(null, { status: 400 })
    }
  }

  // If the POST request is not a JSON request, return a 400 status to our frontend
  return new Response(null, { status: 400 })
}
