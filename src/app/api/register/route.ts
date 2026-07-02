import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { registerAction } from '../../../lib/actions/auth';
import { ApiResponse } from '../../../types';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();
        const response = await registerAction(name, email, password);
        if (response.success && response.data) {
            const cookieValue = encodeURIComponent(JSON.stringify(response.data));
            const res = NextResponse.json(response as ApiResponse<typeof response.data>);
            // HttpOnly cookie set et (middleware okuyabilir)
            res.headers.set('Set-Cookie', `session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`);
            return res;
        }
        return NextResponse.json(response, { status: 400 });
    } catch (err) {
        return NextResponse.json({ data: null, error: 'Kayıt sırasında hata oluştu.', success: false }, { status: 500 });
    }
}
