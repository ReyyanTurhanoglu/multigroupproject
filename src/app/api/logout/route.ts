import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logoutAction } from '../../../lib/actions/auth';
import { ApiResponse } from '../../../types';

export async function POST(request: NextRequest) {
    try {
        await logoutAction();
        const res = NextResponse.json({ data: null, error: null, success: true } as ApiResponse<null>);
        // Clear cookie
        res.headers.set('Set-Cookie', `session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
        return res;
    } catch (err) {
        return NextResponse.json({ data: null, error: 'Çıkış sırasında hata oluştu.', success: false }, { status: 500 });
    }
}
