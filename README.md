# CardNest - Akıllı Öğrenme Kartları Uygulaması

![cardnest-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/286ded76-18f7-4d9c-8ce0-f0946779f962)


## 🌐 Canlı Demo
Uygulamayı hemen deneyin: [https://cardnest-psi.vercel.app/](https://cardnest-psi.vercel.app/)

## 📌 Proje Hakkında

CardNest, kullanıcıların öğrenme süreçlerini kolaylaştıran bir bilgi kartı (flashcard) yönetim sistemidir. Spaced Repetition algoritmasıyla kartlarınızı organize edebilir, tekrar sıklıklarını yönetebilir ve öğrenme veriminizi artırabilirsiniz.

**Temel Özellikler:**
- 🗂️ Koleksiyonlar halinde kart yönetimi
- 📊 3 seviyeli kart sistemi 
- ⏳ Akıllı tekrar algoritması
- 🔍 Hızlı arama ve filtreleme
- 📱 Tam duyarlı (responsive) tasarım

## 🛠️ Teknoloji Yığını

### Frontend
- ⚛️ React 19 + Vite
- 🔥 Firebase (Authentication, Firestore, Storage)
- 🎨 TailwindCSS + React Icons
- 🧭 React Router DOM v7
- 🏗️ Redux Toolkit + Redux Thunk

### Yardımcı Kütüphaneler
- 📝 React Hook Form + Yup Validasyon
- 🔔 React Hot Toast (Bildirimler)
- 🆔 UUID (Benzersiz ID'ler)
- 📅 Date-fns (Tarih işlemleri)

## 🚀 Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/cardnest.git
   cd cardnest
   ```

2. Firebase yapılandırması:
   - `src/firebase/config.js` dosyasını kendi Firebase ayarlarınızla güncelleyin

3. Bağımlılıkları yükleyin ve çalıştırın:
   ```bash
   npm install
   npm run dev
   ```


## 🖼️ Ekran Görüntüleri


### Login
![Login](https://raw.githubusercontent.com/enesyagmur/cardnest/6cf23e91e8ec5ba43dfe2c600102065c4ce84f14/src/assets/loginScreenShot.png)

### Collections Page
![Collections](https://raw.githubusercontent.com/enesyagmur/cardnest/6cf23e91e8ec5ba43dfe2c600102065c4ce84f14/src/assets/collectionsScreenShot.png)

### Cards Page
![Cards](https://raw.githubusercontent.com/enesyagmur/cardnest/6cf23e91e8ec5ba43dfe2c600102065c4ce84f14/src/assets/cardsScreenShot.png)

### Practice Page
![Practice](https://raw.githubusercontent.com/enesyagmur/cardnest/6cf23e91e8ec5ba43dfe2c600102065c4ce84f14/src/assets/practiceScreenShot.png)

### Explore Page
![Explore](https://raw.githubusercontent.com/enesyagmur/cardnest/6cf23e91e8ec5ba43dfe2c600102065c4ce84f14/src/assets/exploreScreenShot.png)




## 📜 Lisans

MIT Lisansı - Detaylar için [LICENSE](LICENSE) dosyasına bakınız.
