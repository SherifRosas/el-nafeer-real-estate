/**
 * LEVER PIONEER PORTFOLIO REGISTRY (v208.0)
 * ----------------------------------------
 * This is your Master List for the "معرض الأعمال".
 * To Add: Paste a new { title, cat, vid } object.
 * To Delete: Remove an object.
 * To Move: Change the 'cat' string (e.g. from 'أوتوماتيك' to 'بانوراما خارجية')
 */

export interface PortfolioItem {
    title: string;
    cat: string;
    vid: string;
}

export const LEVER_PORTFOLIO: PortfolioItem[] = [
    { 
        title: "تنفيذ بانورامي خارجي صاعد (ذهبي)", 
        cat: "بانوراما خارجية", 
        vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.38.50.mp4" 
    },
    { 
        title: "تشغيل الأبواب الأوتوماتيكية - لوكس", 
        cat: "أوتوماتيك", 
        vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.38.51.mp4" 
    },
    { 
        title: "مصعد أوتوماتيك حديث (فيديو)", 
        cat: "أوتوماتيك", 
        vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.240.mp4" 
    },
    { 
        title: "تجربة فتح نصف أوتوماتيك", 
        cat: "نصف أوتوماتيك", 
        vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2522.mp4" 
    },
    { 
        title: "برج بانورامي واجهة عرض", 
        cat: "بانوراما خارجية", 
        vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2566.mp4" 
    },
    { 
        title: "كابينة بانورامية منحنية", 
        cat: "بانوراما خارجية", 
        vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2400.mp4" 
    }
];
