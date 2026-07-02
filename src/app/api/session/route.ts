import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionAction } from '../../../lib/actions/auth';
import { ApiResponse } from '../../../types';

export async function GET(request: NextRequest) {
    try {
        const session = await getSessionAction();
        const body: ApiResponse<typeof session> = { data: session, error: null, success: !!session };
        return NextResponse.json(body);
    } catch (err) {
        return NextResponse.json({ data: null, error: 'Oturum alınırken hata oluştu.', success: false }, { status: 500 });
    }
}
