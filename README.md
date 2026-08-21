# Uzbleaderrr — Premium Portfolio

Qora premium-futuristik, mobil-first portfolio. Frontend statik bo‘lib, GitHub Pages’da ishlaydi.

## GitHub loyihalari

`app.js` GitHub REST API orqali `Uzbleaderrr` profilidagi public repolarni har safar yuklaydi. Fork va archived repolar chiqarib tashlanadi; loyihalar mashhurlik, forklar va yangilangan vaqt asosida saralanib, eng yaxshi 6 tasi ko‘rsatiladi. GitHub’ga yangi public repository qo‘shsangiz, portfolio keyingi kirishda avtomatik yangilanadi.

API manzili:

```text
https://api.github.com/users/Uzbleaderrr/repos?type=public&sort=updated&per_page=100
```

## Lokal ishga tushirish

Frontend oddiy statik fayl bo‘lgani uchun `index.html`ni brauzerda ochish yoki lokal server ishlatish mumkin:

```bash
python3 -m http.server 8080
```

So‘ng `http://localhost:8080` manzilini oching.

## GitHub Pages

1. Fayllarni GitHub repozitoriyga yuboring.
2. **Settings → Pages** bo‘limiga kiring.
3. **Deploy from a branch**, `main` va `/ (root)`ni tanlang.
4. Saqlang — GitHub Pages sizga jonli havola beradi.

Frontend tashqi CDN yoki shriftga bog‘liq emas.

## Backend haqida

`api/server.js` alohida backend namunasi. U telefonda yoki GitHub Pages’da ishlamaydi. Kerak bo‘lsa Render, Railway, Fly.io yoki VPS kabi tashqi hostingga Node.js server sifatida joylashtiring. Ushbu portfolio uchun backend shart emas, chunki GitHub ma’lumotlari brauzerdan to‘g‘ridan-to‘g‘ri public REST API orqali olinadi.
