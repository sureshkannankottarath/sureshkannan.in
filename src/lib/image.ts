export function getProxiedImage(url: string) {
    if (!url) return '';

    if (url.includes('.idrivee2.com/')) {
        const parts = url.split('.idrivee2.com/');
        if (parts.length > 1) {
            return `/api/asset/${parts[1]}`;
        }
    }

    return url;
}
