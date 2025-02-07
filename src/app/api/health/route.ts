// app/api/health/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToCassandra } from '../../../lib/cassandra';

export async function GET(request: NextRequest) {
  try {
    // Test Cassandra connection
    await connectToCassandra();
    return NextResponse.json({ status: 'healthy' });
  } catch (error) {
    return NextResponse.json({ status: 'unhealthy', details: error.message }, { status: 500 });
  }
}
