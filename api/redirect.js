module.exports = (req, res) => {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Special handling for OPTIONS method, which is used in preflight
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Main handler logic
    const encodedUrls = req.query.urls;
    if (encodedUrls) {
        try {
            const urls = encodedUrls.split(',').map(url => decodeURIComponent(url.trim()));
            urls.forEach(url => new URL(url));  // Validate URLs
            res.status(200).json({ urls });
        } catch (error) {
            res.status(400).send('Bad Request: Invalid URL encoding or format.');
        }
    } else {
        res.status(200).json({ urls: ['https://bukeblue.com', 'https://arboronescrows.com', 'https://view.richtonparks.com/KDJEDK'] });
    }
};
