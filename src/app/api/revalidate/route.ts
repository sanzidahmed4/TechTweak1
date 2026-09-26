import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');
    
    const validSecret = process.env.REVALIDATE_SECRET;
    if (validSecret && secret !== validSecret) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    if (path) {
      // Revalidate specific path
      revalidatePath(path);
      return NextResponse.json({ success: true, message: `Revalidated path: ${path}` });
    } else if (secret && validSecret && secret === validSecret) {
      // Explicitly authorized full site revalidation only
      revalidatePath('/', 'layout');
      return NextResponse.json({ success: true, message: 'Revalidated entire site cache' });
    }

    return NextResponse.json({ success: false, error: 'Path parameter required' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
