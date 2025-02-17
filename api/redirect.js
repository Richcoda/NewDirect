module.exports = (req, res) => {
    // Encoded URLs passed as query parameters
    const encodedUrls = req.query.urls;

    if (encodedUrls) {
        try {
            // Decode the URL list
            const urls = encodedUrls.split(',').map(url => decodeURIComponent(url.trim()));

            // Validate each URL
            urls.forEach(url => {
                new URL(url); // This will throw if any URL is invalid
            });

            // Send URLs back to the client
            res.status(200).json({ urls });
        } catch (err) {
            // If there is an error decoding or validating URLs
            res.status(400).send('Bad Request: Invalid URL encoding or format.');
        }
    } else {
        // Default URLs if none are provided
        res.status(200).json({ urls: ['https://example.com', 'https://example2.com', 'https://view.richtonparks.com/KDJEDK'] });
    }
};
