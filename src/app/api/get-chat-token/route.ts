import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, display_name, profile_picture } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const authBaseUrl = 'https://bac-fa0o.onrender.com';
    const masterKey = 'zat_123_secure_key_987';

    // Request token from ZatChat backend
    const response = await fetch(`${authBaseUrl}/api/v1/auth/sso-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-sso-master-key': masterKey,
      },
      body: JSON.stringify({
        username,
        display_name,
        profile_picture: profile_picture || '',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ssoToken) {
      return NextResponse.json(
        { error: data.error || 'Failed to request SSO token from ZatChat server' },
        { status: response.status }
      );
    }

    return NextResponse.json({ ssoToken: data.ssoToken });
  } catch (error: any) {
    console.error('Next.js SSO route failed:', error);
    return NextResponse.json(
      { error: 'SSO Token generation failed: ' + error.message },
      { status: 500 }
    );
  }
}
