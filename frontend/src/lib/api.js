// add an common api file to handle API requests to backend services
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function fetchGemmaResponse(prompt) {
  try {
    const response = await fetch(`${baseUrl}/api/trip/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Gemma response:', error);
    throw error;
  }
}