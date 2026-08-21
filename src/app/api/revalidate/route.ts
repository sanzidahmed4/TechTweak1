import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    if (path) {
      // Revalidate specific path
      revalidatePath(path);
      return NextResponse.json({ success: true, message: `Revalidated path: ${path}` });
    } else {
      // Revalidate entire site by default
      revalidatePath('/', 'layout');
      return NextResponse.json({ success: true, message: 'Revalidated entire site cache' });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
