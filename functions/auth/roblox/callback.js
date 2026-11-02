// Zenian's Roblox OAuth app sends people back here (its registered redirect URI).
// Zenian itself is retired, so the sign-in is passed on to sir.gg's Roblox verification,
// which uses the same app: https://sir.gg/api/roblox/callback with the same code + state.
export function onRequestGet({ request }) {
    const url = new URL(request.url);
    const dest = new URL('https://sir.gg/api/roblox/callback');
    dest.search = url.search;
    return new Response(null, {
        status: 302,
        headers: { location: dest.toString(), 'cache-control': 'no-store', 'referrer-policy': 'no-referrer' },
    });
}
