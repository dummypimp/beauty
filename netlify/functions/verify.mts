export default async (req: Request) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const { phone } = body;

    // Simulate network latency for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulated Truecaller verification logic
    // In a real scenario, this would call Truecaller's Verification API
    // Here we simulate success for any valid-looking phone number
    const isValidPhone = phone && typeof phone === 'string' && phone.replace(/\D/g, '').length >= 10;

    if (isValidPhone) {
      return new Response(JSON.stringify({
        success: true,
        isVerified: true,
        provider: "truecaller",
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        isVerified: false,
        error: "Invalid phone number format"
      }), {
        status: 200, // Return 200 but success: false as it's a valid business flow
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to process verification request"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};
