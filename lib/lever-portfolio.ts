/**
 * LEVER PIONEER PORTFOLIO REGISTRY (v216.0)
 * ----------------------------------------
 * This is your Master List for the "معرض الأعمال".
 * This registry now supports both IMAGES and VIDEOS.
 */

export interface PortfolioItem {
    title: string;
    cat: string;
    vid: string;
}

const BASE_PATH = "/campaigns/lever-pioneer/portfolio/videos";

export const LEVER_PORTFOLIO: PortfolioItem[] = [
    // --- مصاعد بانوراما خارجيه ---
    { title: "بانوراما خارجيه 01", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/مصاعد بانوراما خارجيه/WhatsApp Image 2026-03-29 at 20.50.06 (1).jpeg` },
    { title: "بانوراما خارجيه 02", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/مصاعد بانوراما خارجيه/WhatsApp Image 2026-03-29 at 20.50.06 (2).jpeg` },
    { title: "بانوراما خارجيه 03", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/مصاعد بانوراما خارجيه/WhatsApp Image 2026-03-29 at 20.50.06 (3).jpeg` },
    { title: "بانوراما خارجيه 04", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/مصاعد بانوراما خارجيه/WhatsApp Image 2026-03-29 at 20.50.06.jpeg` },
    { title: "بانوراما خارجيه 05", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/مصاعد بانوراما خارجيه/WhatsApp Image 2026-03-29 at 20.50.07 (1).jpeg` },
    { title: "بانوراما خارجيه 06", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/مصاعد بانوراما خارجيه/WhatsApp Image 2026-03-29 at 20.50.07.jpeg` },

    // --- مصاعد بانوراما داخليه ---
    { title: "بانوراما داخليه 01", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.16 (5).jpeg` },
    { title: "بانوراما داخليه 02", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.16 (6).jpeg` },
    { title: "بانوراما داخليه 03", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.17 (1).jpeg` },
    { title: "بانوراما داخليه 04", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.17 (2).jpeg` },
    { title: "بانوراما داخليه 05", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.17 (3).jpeg` },
    { title: "بانوراما داخليه 06", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.17 (4).jpeg` },
    { title: "بانوراما داخليه 07", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.17 (5).jpeg` },
    { title: "بانوراما داخليه 08", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/مصاعد بانوراما داخليه/WhatsApp Image 2026-03-29 at 20.51.17.jpeg` },

    // --- مصاعد اتوماتك ---
    { title: "اتوماتك موديل 0", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video0.mp4` },
    { title: "اتوماتك موديل 001", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video001.mp4` },
    { title: "اتوماتك موديل 002", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video002.mp4` },
    { title: "اتوماتك موديل 003", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video003.mp4` },
    { title: "اتوماتك موديل 02", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video02.mp4` },
    { title: "اتوماتك موديل 03", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video03.mp4` },
    { title: "اتوماتك موديل 04", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video04.mp4` },
    { title: "اتوماتك موديل 1", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video1.mp4` },
    { title: "اتوماتك موديل 2", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video2.mp4` },
    { title: "اتوماتك موديل 3", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/مصاعد اتوماتك/WhatsApp Video3.mp4` },

    // --- مصاعد نصف اتوماتك ---
    { title: "نصف اتوماتك فيديو 01", cat: "مصاعد نصف اتوماتك", vid: `${BASE_PATH}/مصاعد نصف اتوماتك/WhatsApp Video01.mp4` },
    { title: "نصف اتوماتك فيديو 02", cat: "مصاعد نصف اتوماتك", vid: `${BASE_PATH}/مصاعد نصف اتوماتك/WhatsApp Video02.mp4` },
    { title: "نصف اتوماتك فيديو 03", cat: "مصاعد نصف اتوماتك", vid: `${BASE_PATH}/مصاعد نصف اتوماتك/WhatsApp Video03.mp4` },
    { title: "نصف اتوماتك صورة 04", cat: "مصاعد نصف اتوماتك", vid: `${BASE_PATH}/مصاعد نصف اتوماتك/WhatsApp Image04.jpeg` },

    // --- مصاعد هوم لفت ---
    { title: "هوم لفت 01", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/مصاعد هوم لفت/WhatsApp Image 2026-03-29 at 20.47.30.jpeg` },
    { title: "هوم لفت 02", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/مصاعد هوم لفت/WhatsApp Image.jpeg` },
    { title: "هوم لفت 03", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/مصاعد هوم لفت/WhatsApp Image1.jpeg` },
    { title: "هوم لفت 04", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/مصاعد هوم لفت/WhatsApp Image2.jpeg` },
    { title: "هوم لفت 05", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/مصاعد هوم لفت/WhatsApp Image3.jpeg` },

    // --- صور ---
    { title: "صورة المعرض 01", cat: "صور", vid: `${BASE_PATH}/صور/WhatsApp Image01` },
    { title: "صورة المعرض 02", cat: "صور", vid: `${BASE_PATH}/صور/WhatsApp Image02.jpeg` },
    { title: "صورة المعرض 03", cat: "صور", vid: `${BASE_PATH}/صور/WhatsApp Image03.jpeg` },
    { title: "صورة المعرض 04", cat: "صور", vid: `${BASE_PATH}/صور/WhatsApp Image04.jpeg` },
    { title: "صورة المعرض 05", cat: "صور", vid: `${BASE_PATH}/صور/WhatsApp Image05.jpeg` },
    { title: "صورة المعرض 06", cat: "صور", vid: `${BASE_PATH}/صور/WhatsApp Image06.jpeg` }
];
