import os
import shutil

base_path = r"c:\Users\Sherif-Rosas\EL_NAFEER\public\campaigns\lever-pioneer\portfolio\videos"

mapping = {
    "صور": "photos",
    "مصاعد اتوماتك": "auto",
    "مصاعد بانوراما خارجيه": "panorama_ext",
    "مصاعد بانوراما داخليه": "panorama_int",
    "مصاعد نصف اتوماتك": "semi_auto",
    "مصاعد هوم لفت": "home_lift"
}

new_portfolio = []

# Rename directories
for arabic_name, english_name in mapping.items():
    old_dir = os.path.join(base_path, arabic_name)
    new_dir = os.path.join(base_path, english_name)
    if os.path.exists(old_dir):
        os.rename(old_dir, new_dir)

# Rename files in english_name directories
for arabic_name, english_name in mapping.items():
    dir_path = os.path.join(base_path, english_name)
    if os.path.exists(dir_path):
        for idx, f in enumerate(os.listdir(dir_path)):
            old_file = os.path.join(dir_path, f)
            if os.path.isfile(old_file):
                ext = os.path.splitext(f)[1]
                if not ext:
                    ext = ".jpeg"
                new_f_name = f"{english_name}_{idx+1}{ext}"
                new_file = os.path.join(dir_path, new_f_name)
                os.rename(old_file, new_file)
                
                # Generate typescript entry
                title = f"{arabic_name} {idx+1}"
                cat = arabic_name
                vid = f"/campaigns/lever-pioneer/portfolio/videos/{english_name}/{new_f_name}"
                new_portfolio.append(f'    {{ title: "{title}", cat: "{cat}", vid: "{vid}" }},')

print("export const LEVER_PORTFOLIO: PortfolioItem[] = [")
for p in new_portfolio:
    print(p)
print("];")
