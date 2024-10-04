interface sendNotificationParams {
  topic: string
  body: string
  title?: string
  tags?: string
  actions?: string
  email?: string
}

export const sendNotification = async ({
  topic,
  body,
  title,
  tags,
  actions,
  email
}: sendNotificationParams) => {
  console.log('Sending an NTFY notification')

  // Initialize the success flag
  let success = false

  // Env variables
  const NTFY_URL = import.meta.env.NTFY_URL ?? process.env.NTFY_URL
  const NTFY_TOKEN = import.meta.env.NTFY_TOKEN ?? process.env.NTFY_TOKEN

  // Check if all env variables are available
  if (!NTFY_URL || !NTFY_TOKEN) {
    console.warn('No NTFY_URL or NTFY_TOKEN defined, notification not sent')
    return success
  }

  // Try-catch block to catch any errors
  try {
    // Construct the headers object
    const headers = {
      Authorization: `Bearer ${NTFY_TOKEN}`
    }

    if (title) headers['Title'] = title
    if (tags) headers['Tags'] = tags
    if (actions) headers['Actions'] = actions
    if (email) headers['Email'] = email

    console.log('Headers:', headers)

    // Construct the payload
    const payload = {
      method: 'POST',
      body: body,
      headers: headers
    }

    // Make a POST request to NTFY
    const response = await fetch(`${NTFY_URL}/${topic}`, payload)

    // Check if the request was unsuccessful
    if (!response.ok) {
      console.error('Failed to send NTFY')
      console.error('Response:', response)
      return success
    }

    // Request succeeded
    success = true
    console.log('NTFY sent successfully')
  } catch (error) {
    console.error('Failed to send NTFY:', error)
  }

  // Return the success flag
  return success
}
