/**
 * Cloudflare Email Routing API integration
 * Manages email routing rules for temporary email addresses
 */

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;

interface EmailRoutingRule {
  id?: string;
  name: string;
  enabled: boolean;
  matchers: Array<{
    type: string;
    field: string;
    value: string;
  }>;
  actions: Array<{
    type: string;
    value: string[];
  }>;
}

/**
 * Create an email routing rule in Cloudflare
 */
export async function createEmailRoutingRule(
  emailAddress: string,
  forwardTo: string
): Promise<any> {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    throw new Error('Cloudflare credentials not configured');
  }

  const rule: EmailRoutingRule = {
    name: `Route for ${emailAddress}`,
    enabled: true,
    matchers: [
      {
        type: 'literal',
        field: 'to',
        value: emailAddress,
      },
    ],
    actions: [
      {
        type: 'forward',
        value: [forwardTo],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/email/routing/rules`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${JSON.stringify(data)}`);
    }

    return data.result;
  } catch (error) {
    console.error('Error creating email routing rule:', error);
    throw error;
  }
}

/**
 * List all email routing rules
 */
export async function listEmailRoutingRules(): Promise<any[]> {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    throw new Error('Cloudflare credentials not configured');
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/email/routing/rules`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${JSON.stringify(data)}`);
    }

    return data.result || [];
  } catch (error) {
    console.error('Error listing email routing rules:', error);
    throw error;
  }
}

/**
 * Delete an email routing rule
 */
export async function deleteEmailRoutingRule(ruleId: string): Promise<void> {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    throw new Error('Cloudflare credentials not configured');
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/email/routing/rules/${ruleId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('Error deleting email routing rule:', error);
    throw error;
  }
}

/**
 * Get email routing settings
 */
export async function getEmailRoutingSettings(): Promise<any> {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    throw new Error('Cloudflare credentials not configured');
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/email/routing`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${JSON.stringify(data)}`);
    }

    return data.result;
  } catch (error) {
    console.error('Error getting email routing settings:', error);
    throw error;
  }
}
