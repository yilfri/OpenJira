import { NextFetchEvent, NextRequest, NextResponse, URLPattern } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.nextUrl.pathname.startsWith('/api/entries/')) {
		console.log(req.nextUrl);
	}

	return NextResponse.next();
}
