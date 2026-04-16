/**
 * 🛰️ EL-NAFEER ORGANIC ATTRIBUTION TRACKER (v1.0)
 * Purpose: Track the source of organic traffic (Manual Shares) to optimize conversion.
 */

export const ORGANIC_SOURCES = {
    FB_GROUP_GIZA: 'Giza Elite Groups',
    FB_GROUP_TOUKH: 'Toukh Community',
    WHATSAPP_SHARE: 'Direct WhatsApp Share',
    LINKEDIN_POST: 'LinkedIn Professional',
    TIKTOK_ORGANIC: 'TikTok Viral Reach',
    DIRECT: 'Direct / Manual Entry'
};

export class OrganicTracker {
    /**
     * Extracts the referral source from URL parameters or metadata.
     */
    static getSource(searchParams: URLSearchParams): string {
        const ref = searchParams.get('ref') || 'direct';
        const sourceMap: { [key: string]: string } = {
            'giza': ORGANIC_SOURCES.FB_GROUP_GIZA,
            'toukh': ORGANIC_SOURCES.FB_GROUP_TOUKH,
            'wa': ORGANIC_SOURCES.WHATSAPP_SHARE,
            'li': ORGANIC_SOURCES.LINKEDIN_POST,
            'tt': ORGANIC_SOURCES.TIKTOK_ORGANIC,
            'direct': ORGANIC_SOURCES.DIRECT
        };
        
        return sourceMap[ref.toLowerCase()] || `Manual_Ref_${ref}`;
    }

    /**
     * Tracks a view signal silently.
     */
    static async trackView(source: string, vertical: string) {
        try {
            await fetch('/api/analytics/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: 'ORGANIC_ENGAGEMENT',
                    action: 'VIEW',
                    label: source,
                    vertical: vertical,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (e) {
            // Silent fail for analytics
        }
    }

    /**
     * Returns attribution metadata for lead injection.
     */
    static getAttributionNotes(source: string): string {
        return `[SOURCE: ${source}] | [TYPE: ORGANIC_MANUAL_SHARE]`;
    }
}
