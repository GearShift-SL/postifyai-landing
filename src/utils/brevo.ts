interface BrevoContact {
  email: string
  firstName?: string
  lastName?: string
  otherAttributes?: Record<string, string>
  listIds?: number[]
  updateEnabled?: boolean
}

export const createBrevoContact = async ({
  email,
  firstName,
  lastName,
  otherAttributes,
  listIds,
  updateEnabled
}: BrevoContact) => {
  // Initialize the success flag
  let brevoContactCreated = false

  const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'

  // Check to make sure the API key is defined in an environment variable
  const BREVO_API_KEY =
    import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY
  if (!BREVO_API_KEY) {
    console.error('env variable BREVO_API_KEY is not defined')
    return brevoContactCreated
  }

  try {
    // The payload that will be sent to Brevo
    // This payload will create or update the contact and add it to the list with ID BREVO_INQUIRY_LIST_ID
    const payload = {
      email: email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        ...otherAttributes
      },
      listIds: listIds,
      updateEnabled: updateEnabled
    }

    console.debug('Brevo Payload:', payload)

    // Make a POST request to Brevo
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Check if the request was successful
    if (response.ok) {
      // Request succeeded
      brevoContactCreated = true
      console.log('Contact added successfully')
      console.debug(response.body)
    } else {
      // Request failed
      console.error('Failed to add contact to Brevo', response)
    }
  } catch (error) {
    console.error('Failed to add contact to Brevo:', error)
  }

  return brevoContactCreated
}

export const getTemplateId = async (templateId: number) => {
  let template = null

  const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/templates'
  const BREVO_API_KEY =
    import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.warn('env variable BREVO_API_KEY not defined')
    return template
  }

  try {
    // Make a GET request to Brevo
    const response = await fetch(`${BREVO_API_URL}/${templateId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY
      }
    })

    // Check if the request was successful with a 2XX status code
    if (response.ok) {
      // Request succeeded
      template = await response.json()
      console.debug('Template:', template)
    } else {
      // Request failed
      console.error(
        'Failed to get template ID Response status:',
        response.status
      )
    }
  } catch (error) {
    console.error('Failed to get template ID:', error)
  }

  return template
}

interface BrevoMessage {
  toName?: string
  toEmail: string
  ccName?: string
  ccEmail?: string
  bccName?: string
  bccEmail?: string
  templateId: number
  replyToName?: string
  replyToEmail?: string
  params: Record<string, string>
}

export const sendTransactionalTemplateEmail = async ({
  toName,
  toEmail,
  ccName,
  ccEmail,
  bccName,
  bccEmail,
  templateId,
  replyToName,
  replyToEmail,
  params
}: BrevoMessage) => {
  console.info('Sending transactional email')
  let brevoMessageSent = false

  const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'
  const BREVO_API_KEY =
    import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.warn('env variable BREVO_API_KEY not defined')
    return brevoMessageSent
  }

  // Check if the template exists first
  console.debug(`Checking if the template with id ${templateId} exists`)
  const template = await getTemplateId(templateId)

  if (!template) {
    console.error('Template not found, could not send email')
    return brevoMessageSent
  }

  // Check to make sure the API key is defined in an environment variable
  // The payload that will be sent to Brevo
  const to = [
    {
      email: toEmail,
      name: toName
    }
  ]

  const payload = {
    to: to,
    params: params,
    templateId: templateId
  }

  const replyTo = replyToEmail
    ? { email: replyToEmail, name: replyToName }
    : null

  if (replyTo) {
    payload['replyTo'] = replyTo
  }

  const cc = ccEmail
    ? [
        {
          email: ccEmail,
          name: ccName
        }
      ]
    : null

  if (cc) {
    payload['cc'] = cc
  }

  const bcc = bccEmail
    ? [
        {
          email: bccEmail,
          name: bccName
        }
      ]
    : null

  if (bcc) {
    payload['bcc'] = bcc
  }

  console.log('Payload:', payload)

  try {
    // Make a POST request to Brevo
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Check if the request was successful with a 2XX status code
    if (response.ok) {
      // Request succeeded
      brevoMessageSent = true
      console.log('Email sent successfully')
    } else {
      // Request failed
      console.error('Failed to send email')
      console.error(response.statusText)
    }
  } catch (error) {
    console.error('Failed to send email:', error)
  }

  return brevoMessageSent
}

/* -------------------------------------------------------------------------- */
/*                               GET Brevo List                               */
/* -------------------------------------------------------------------------- */

interface BrevoListDetails {
  id: number
  name: string
  startDate: string
  endDate: string
  totalBlacklisted: number
  totalSubscribers: number
  uniqueSubscribers: number
  folderId: number
  createdAt: string
  campaignStats: unknown[]
  dynamicList: boolean
}

export const getBrevoListDetails = async (
  listId: number
): Promise<BrevoListDetails | null> => {
  const BREVO_API_URL = `https://api.brevo.com/v3/contacts/lists/${listId}`

  // Check to make sure the API key is defined in an environment variable
  const BREVO_API_KEY =
    import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY
  if (!BREVO_API_KEY) {
    console.error('env variable BREVO_API_KEY is not defined')
    return null
  }

  try {
    // Make a GET request to Brevo
    const response = await fetch(BREVO_API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY
      }
    })

    // Check if the request was successful
    if (response.ok) {
      // Request succeeded
      const listDetails: BrevoListDetails = await response.json()
      console.log('List details fetched successfully')
      console.debug(listDetails)
      return listDetails
    } else {
      // Request failed
      console.error('Failed to fetch list details from Brevo', response)
      return null
    }
  } catch (error) {
    console.error('Failed to fetch list details from Brevo:', error)
    return null
  }
}
