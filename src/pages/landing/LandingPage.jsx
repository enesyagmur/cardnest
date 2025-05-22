export default function LandingPage() {
  const boxData = [
    {
      title: "Özgürce Koleksiyon Oluştur",
      color: "text-blue-600",
      desc: "Dilersen konuya göre koleksiyonlar oluştur. Tüm bilgilerin düzenli ve erişilebilir olsun.",
    },
    {
      title: "Dinamik Kart Türleri",
      color: "text-green-600",
      desc: "Paragraf, açıklama, liste gibi farklı türlerde kartlar oluştur. Her öğrenme biçimine uygun!",
    },
    {
      title: "Zorluk Seviyeli Tekrar",
      color: "text-purple-600",
      desc: "Kolay, orta, zor gibi seviyelerle öğrenmeni kişiselleştir. Zor kartlar daha sık tekrar edilir.",
    },
    {
      title: "Akıllı Zaman Yönetimi",
      color: "text-pink-600",
      desc: "Bildiklerin daha az tekrar edilir. Zaman kazanır, odaklanırsın.",
    },
    {
      title: "Sade ve Kullanıcı Dostu",
      color: "text-yellow-600",
      desc: "Modern tasarım, kolay kullanım. Karmaşadan uzak bir deneyim seni bekliyor.",
    },
    {
      title: "Her Cihazda Uyumlu",
      color: "text-red-600",
      desc: "Bilgisayar, tablet ya da telefon fark etmez. Her yerde öğren!",
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
