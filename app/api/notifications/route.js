import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://test-api.krascatalog.ru';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '5';
    const offset = searchParams.get('offset') || '0';
    
    const response = await fetch(
      `${API_BASE_URL}/notifications?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results) {
      data.results.forEach(notification => {
        if (notification.user && notification.user.avatar) {
          if (notification.user.avatar.includes('picsum.photos')) {
            notification.user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.user.username)}&size=48&background=5B19E7&color=fff&bold=true`;
          }
        }
        if (notification.users) {
          notification.users.forEach(user => {
            if (user.avatar && user.avatar.includes('picsum.photos')) {
              user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&size=48&background=5B19E7&color=fff&bold=true`;
            }
          });
        }
      });
    }
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch notifications',
        message: error.message 
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
