export default async function handler(req, res) {
  try {
    const response = await fetch('https://opensky-network.org/api/states/all');
    const data = await response.json();

    // These headers allow your LOCAL file to talk to this Vercel URL
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle the browser "pre-flight" check
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch flight data' });
  }
}