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
    { title: "بانوراما خارجيه 01", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/panorama_ext/panorama_ext_1.jpeg` },
    { title: "بانوراما خارجيه 02", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/panorama_ext/panorama_ext_2.jpeg` },
    { title: "بانوراما خارجيه 03", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/panorama_ext/panorama_ext_3.jpeg` },
    { title: "بانوراما خارجيه 04", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/panorama_ext/panorama_ext_4.jpeg` },
    { title: "بانوراما خارجيه 05", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/panorama_ext/panorama_ext_5.jpeg` },
    { title: "بانوراما خارجيه 06", cat: "مصاعد بانوراما خارجيه", vid: `${BASE_PATH}/panorama_ext/panorama_ext_6.jpeg` },

    // --- مصاعد بانوراما داخليه ---
    { title: "بانوراما داخليه 01", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_1.jpeg` },
    { title: "بانوراما داخليه 02", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_2.jpeg` },
    { title: "بانوراما داخليه 03", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_3.jpeg` },
    { title: "بانوراما داخليه 04", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_4.jpeg` },
    { title: "بانوراما داخليه 05", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_5.jpeg` },
    { title: "بانوراما داخليه 06", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_6.jpeg` },
    { title: "بانوراما داخليه 07", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_7.jpeg` },
    { title: "بانوراما داخليه 08", cat: "مصاعد بانوراما داخليه", vid: `${BASE_PATH}/panorama_int/panorama_int_8.jpeg` },

    // --- مصاعد اتوماتك ---
    { title: "اتوماتك موديل 001", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/auto/auto_1.mp4` },
    { title: "اتوماتك موديل 1", cat: "مصاعد اتوماتك", vid: `${BASE_PATH}/auto/auto_2.mp4` },

    // --- مصاعد نصف اتوماتك ---
    { title: "نصف اتوماتك فيديو 02", cat: "مصاعد نصف اتوماتك", vid: `${BASE_PATH}/semi_auto/semi_auto_1.mp4` },
    { title: "نصف اتوماتك صورة 04", cat: "مصاعد نصف اتوماتك", vid: `${BASE_PATH}/semi_auto/semi_auto_2.jpeg` },

    // --- مصاعد هوم لفت ---
    { title: "هوم لفت 01", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/home_lift/home_lift_1.jpeg` },
    { title: "هوم لفت 02", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/home_lift/home_lift_2.jpeg` },
    { title: "هوم لفت 03", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/home_lift/home_lift_3.jpeg` },
    { title: "هوم لفت 04", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/home_lift/home_lift_4.jpeg` },
    { title: "هوم لفت 05", cat: "مصاعد هوم لفت", vid: `${BASE_PATH}/home_lift/home_lift_5.jpeg` },

    // --- صور ---
    { title: "صورة المعرض 01", cat: "صور", vid: `${BASE_PATH}/photos/photos_1.jpeg` },
    { title: "صورة المعرض 02", cat: "صور", vid: `${BASE_PATH}/photos/photos_2.jpeg` },
    { title: "صورة المعرض 03", cat: "صور", vid: `${BASE_PATH}/photos/photos_3.jpeg` },
    { title: "صورة المعرض 04", cat: "صور", vid: `${BASE_PATH}/photos/photos_4.jpeg` },
    { title: "صورة المعرض 05", cat: "صور", vid: `${BASE_PATH}/photos/photos_5.jpeg` },
    { title: "صورة المعرض 06", cat: "صور", vid: `${BASE_PATH}/photos/photos_6.jpeg` }
];
