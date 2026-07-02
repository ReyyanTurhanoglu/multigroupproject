# 🛒 RETUR Market - E-Ticaret Mezuniyet Projesi

MultiAcademy React Foundations Bootcamp programı kapsamında Next.js 14 App Router mimarisi, TypeScript ve Tailwind CSS kullanılarak geliştirilmiş; rol tabanlı yetkilendirme, gelişmiş sepet/sipariş yönetimi ve dinamik grafiklere sahip bir admin paneli içeren E-Ticaret platformudur.

## 🔗 Proje Bağlantıları
* **🌍 Canlı Demo (Deployment):** https://multigroupproject.vercel.app
* **🎥 Proje Tanıtım Videosu:** https://drive.google.com/file/d/1Sts019Y5WALHuF_9E1im_HveI489wSIO/view?usp=drive_link

---

## 🚀 Öne Çıkan Özellikler & Checklist Uyumları

* **Global State Yönetimi (Context API):** Kullanıcı oturumu (`AuthContext`) ve sepet işlemleri (`CartContext`) merkezi state mimarisi ile yönetilir. Sepet verileri `localStorage` ile senkronize edilerek kalıcılık sağlanmıştır.
* **Rota Koruması & Güvenlik (Middleware):** `/cart`, `/checkout` ve `/orders` sayfaları giriş yapma şartına bağlıdır. Ayrıca `/admin` paneli rol tabanlı yetkilendirme (`role: 'admin'`) katmanı ile korunmaktadır.
* **Performans Optimizasyonu (useMemo):** Ürün arama, kategori bazlı filtreleme ve fiyata göre sıralama işlemleri `useMemo` kancası ile optimize edilerek tarayıcı seviyesinde milisaniyeler içinde işlenir.
* **Gelişmiş Sepet & Sipariş Dinamikleri:** Sepette anlık ürün miktarı artırma/azaltma (CRUD), 500 TL üzeri harcamalarda dinamik kargo bedava mantığı ve sipariş sonrası sepetin otomatik temizlenmesi süreçleri entegre edilmiştir.
* **Yönetim (Admin) Paneli:** Gerçek zamanlı ciro, envanter ve sipariş metrik takibi ile sisteme anlık yeni ürün ekleme (CRUD - Create) işlevselliği sunar.

---

## 🛠️ Kullanılan Teknolojiler
* **Framework:** Next.js 14 (App Router)
* **Dil:** TypeScript (Strict Mode)
* **Stil Tasarımı:** Tailwind CSS
* **Durum Yönetimi:** React Context API & Hooks

---

## 🔑 Demo Hesap Bilgileri

Projeyi canlı ortamda test edebilmeniz için tanımlanmış hazır test hesapları aşağıdadır:

### 1. Standart Müşteri Hesabı (Normal Üye)
* **E-posta:** `ahmet@test.com`
* **Şifre:** `ahmet123`

### 2. Yönetici Hesabı (Yüksek Yetkili Admin)
* **E-posta:** `admin@reyyan.com`
* **Şifre:** `admin123`

---

## 💻 Yerel Kurulum Adımları
1. **Projeyi Klonlayın:** `git clone https://github.com/ReyyanTurhanoglu/multigroupproject.git`
2. **Bağımlılıkları Yükleyin:** `npm install`
3. **Projeyi Başlatın:** `npm run dev`
