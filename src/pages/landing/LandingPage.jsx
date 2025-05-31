export default function LandingPage() {
  const boxData = [
    {
      title: "Koleksiyonlarını Yönet",
      color: "text-blue-600",
      desc: "Koleksiyon oluştur, sil, güncelle. Bilgilerini düzenli ve erişilebilir tut.",
    },
    {
      title: "Dinamik Kart Oluşturma",
      color: "text-green-600",
      desc: "Paragraf, açıklama, liste gibi farklı türlerde kartlar oluştur. Dinamik form yapısıyla her ihtiyaca uygun!",
    },
    {
      title: "Hazır Kart Şablonları",
      color: "text-orange-600",
      desc: "Pratik kart oluşturma için hazır şablonlar oluştur ve kullan. Zaman kazandıran yapı seni bekliyor.",
    },
    {
      title: "Akıllı Tekrar Algoritması",
      color: "text-purple-600",
      desc: "Zorluk seviyesi (kolay/orta/zor) ve son tekrar tarihine göre otomatik çalışma planı.",
    },
    {
      title: "Topluluk Koleksiyonları",
      color: "text-pink-600",
      desc: "Diğer kullanıcıların koleksiyonlarını keşfet, filtrele ve beğendiklerini kendi koleksiyonlarına ekle.",
    },
    {
      title: "Modern ve Uyumlu Tasarım",
      color: "text-yellow-600",
      desc: "Karmaşadan uzak sade bir arayüz. Her cihazda rahat kullanım!",
    },
  ];

  return (
    <div className="w-full h-screen   overflow-y-auto bg-gradient-to-br from-blue-100 via-green-100 to-pink-100 px-4 py-6 flex flex-col justify-between items-center">
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-snug">
          Kartlarla Öğrenmenin En Kolay Yolu <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-extrabold tracking-wide text-4xl md:text-5xl font-cursive">
            CardNest
          </span>
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
          Kendi öğrenme stiline uygun kartlar oluştur, zorluk seviyesine göre
          tekrar et ve zamanını verimli kullan!
        </p>
      </header>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {/* Özellik kutuları */}
        {boxData.map((feature, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 text-center"
          >
            <h3 className={`text-lg font-semibold ${feature.color}`}>
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-700 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

      <div className="mt-6 flex gap-4">
        <a
          href="/auth"
          className="px-5 py-2 bg-blue-500 text-white rounded-full text-base hover:bg-blue-600 transition"
        >
          Hemen Başla
        </a>
      </div>

      <footer className="mt-6 text-xs text-gray-600 text-center">
        © {new Date().getFullYear()} KartUygulaması. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
