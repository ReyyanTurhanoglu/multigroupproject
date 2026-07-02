import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Dosya bulunamadı' },
                { status: 400 }
            );
        }

        // Dosya türü kontrolü (sadece resim dosyaları)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WEBP)' },
                { status: 400 }
            );
        }

        // Dosya boyutu kontrolü (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'Dosya boyutu 5MB\'dan büyük olamaz' },
                { status: 400 }
            );
        }

        // Dosya adını güvenli hale getir
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
        
        // Klasör yolunu ayarla
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            console.error('Klasör oluşturma hatası:', err);
        }

        // Dosyayı kaydet
        const filepath = path.join(uploadDir, filename);
        const buffer = await file.arrayBuffer();
        await writeFile(filepath, Buffer.from(buffer));

        // Döndürülecek URL
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json(
            { 
                success: true, 
                message: 'Görsel başarıyla yüklendi',
                imageUrl 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Upload hatası:', error);
        return NextResponse.json(
            { error: 'Dosya yükleme sırasında bir hata oluştu' },
            { status: 500 }
        );
    }
}
