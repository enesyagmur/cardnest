export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-pink-100 px-4 py-8 flex flex-col items-center">
      <header className="text-center mt-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Kartlarla Öğrenmenin En Kolay Yolu
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl text-center mx-auto">
          Kendi öğrenme stiline uygun kartlar oluştur, zorluk seviyesine göre
          tekrar et ve zamanını verimli kullan!
        </p>
      </header>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Özellik kutusu 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-blue-600">
            Özgürce Koleksiyon Oluştur
          </h3>
          <p className="mt-2 text-gray-700">
            Dilersen konuya göre koleksiyonlar oluştur. Tüm bilgilerin düzenli
            ve erişilebilir olsun.
          </p>
        </div>

        {/* Özellik kutusu 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-green-600">
            Dinamik Kart Türleri
          </h3>
          <p className="mt-2 text-gray-700">
            Paragraf, açıklama, liste gibi farklı türlerde kartlar oluştur. Her
            öğrenme biçimine uygun!
          </p>
        </div>

        {/* Özellik kutusu 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-purple-600">
            Zorluk Seviyeli Tekrar
          </h3>
          <p className="mt-2 text-gray-700">
            Kolay, orta, zor gibi seviyelerle öğrenmeni kişiselleştir. Zor
            kartlar daha sık tekrar edilir.
          </p>
        </div>

        {/* Özellik kutusu 4 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-pink-600">
            Akıllı Zaman Yönetimi
          </h3>
          <p className="mt-2 text-gray-700">
            Bildiğin kartlar daha az tekrar edilir. Böylece zaman kazanır, odak
            noktanı artırırsın.
          </p>
        </div>

        {/* Özellik kutusu 5 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-yellow-600">
            Sade ve Kullanıcı Dostu
          </h3>
          <p className="mt-2 text-gray-700">
            Modern tasarımı ile karmaşadan uzak, kolay anlaşılır bir deneyim
            seni bekliyor.
          </p>
        </div>

        {/* Özellik kutusu 6 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-red-600">
            Her Cihazda Uyumlu
          </h3>
          <p className="mt-2 text-gray-700">
            Bilgisayar, tablet ya da telefon fark etmez. Her yerde öğrenmeye
            devam et.
          </p>
        </div>
      </section>

      <div className="mt-12 flex gap-4">
        <a
          href="/auth"
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg hover:bg-blue-600 transition"
        >
          Hemen Başla
        </a>
      </div>

      <footer className="mt-16 text-sm text-gray-600">
        © {new Date().getFullYear()} KartUygulama. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
