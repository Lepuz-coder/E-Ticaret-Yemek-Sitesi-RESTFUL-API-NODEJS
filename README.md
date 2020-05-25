# E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS
Tam fonksiyonlu; giriş, üye olma, ürün ekleme, satın alma gibi işlemleri içeren sitedir.

## API İçin Kullanılan Teknolojiler ve Kütüphaneler

- Nodejs
- express
- bcrypt
- jsonwebtoken
- mongoose
- MongoDB
- multer
- nodemailer
- dotenv
- iyzipay

Bunlar sadece kullanılan temel kütüphaneler ve teknolojilerdir.

### API Linklerinin İşlevlerine Bakmak İçin Postman Dokümentasyonu : 
[Postman API Dokümentasyonu](https://documenter.getpostman.com/view/11268324/SztA6oST?version=latest)

### Client ve Render Tarafında Kullanılan Teknolojiler ve Kütüphaneler

- Javascript ES5/ES6+
- Jquery
- Axios
- Sweetalert2
- Pug view engine (Renderlamak için server tarafında kullanıldı)

### Sitenin Sayfaları Ve İşlevleri
- Sepete Ekleme
- Favorilere Ekleme
- Üye Olma
- Giriş Yapma
- Satmak için ürün eklemek
- Ürün Satın Almak

#### 1-) Anasayfa
![Anasayfa](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Anasayfa.PNG?raw=true "Anasayfa")

Anasayfada ürünlerin üzerine tıklayarak istenilen ürün sepete eklenebiliyor ya da favoriler kısmına eklenebiliyor. Eğer ki zaten sepet eklenmiş ise sepetten kaldırılır. Aynı şey favorilere eklenme için de geçerlidir. Bu durumu ise sweet alert güzel bir bildirimle belirtir.

Favorilere eklendi örnek :

![Favorilere Eklendi](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Favorilere%20Eklendi.png?raw=true "Favorilere Eklendi")

Sepete Eklendi örnek :

![Sepete Eklendi](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Sepete%20Eklendi.png?raw=true "Sepete Eklendi")

#### 2-) Tek Ürün
Anasayfada ürünler arasında bir ürün üzerine tıklandığında o ürün ile ilgili ayrıntılı açıklama barındıran sayfaya yönlendirilir.
![Tek Ürün Sayfası](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Tek%20%C3%9Cr%C3%BCn.png?raw=true "Tek Ürün Sayfası")
Buradan ürün miktarını belirleyerek sepete eklenebiliyor. Aklınızda, anasayfada eklendiğinde miktarı belirleyemediğimiz hakkında bir soru belirmiş olabilir. Zaten kullanıcı sepetine girip satın almadan miktarı ayarlayabiliyor.

### 3-) Favoriler

Kullanıcı menü kısmından favorileri seçerek daha sepete eklenmemiş fakat favorilerinde bulunan ürünlerine bakabilir. Eklenmiş olan favorilerini de buradan kaldırabilir.

![Favoriler Sayfası](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Favoriler.png?raw=true "Favoriler Sayfası")

### 4-)Ürün Ekleme

Severek yaptığım ve hem back-end hem de front-end için basit ama güzel algoritamalar içeren ürün ekleme sayfası, burada kullanıcı satmak için kendi ürününü ekleyebiliyor. Bu sayfadaki çok kolay bir şekilde çözülebilecek bir eksik: Kullanıcı ürüne istediği kadar tip ekleyebiliyor. Bu da veritabanında gereğinden fazla yer kaplaması için kötü saldırılar için fırsat anlamına geliyor. Fakat onun dışında tam fonksiyonel çalışan bir sayfa. Aşşağıdaki resimde orta ve büyük şeklinde iki tip eklenmiş bir ekmek görüyoruz :)

![Ürün Ekle Örnek](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/%C3%9Cr%C3%BCn%20Ekle.png?raw=true "Ürün Ekle Örnek")

Şunu da burda eklemek istiyorum ki sitede bulunan tüm formlarımda api kullanmış olduğum için sayfa yinelenmesine gerek görmeden axios kütüphanesiyle beraber istek gönderirerek çalışmaktadır. 

### 5-)Sepet

Sepet kısmının içerisinde ödeme yönteminden de bahsedeceğim. Öncelikle sepet içerisinden ürünlerin miktarının değiştirilebildiğinden bahsetmiştik. Bir ürünün miktarı değiştirildiğinde otomatik olarak client tarafında sepet toplamı ve ürün fiyatı hesaplanarak fiyatlar güncellenir.
![Sepet Sayfası](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Sepet1.png?raw=true "Sepet Sayfası")

Satın alma kısmında gelicek olursak. Adresi girdikten sonra satın al butonuna tıklıyoruz. Ve butona tıklandıktan sonra server ile iletişime geçilir. Server ise sepete göre bir form gönderir. Bu formu ise sağ tarafa client tarafında yerleştiriz. Bu form tamamıyla ürün id'lerine göre oluşturulur. Ve fiyat client tarafından alınmaz. Yani kullanıcı client tarafında fiyatı 0 lira yapsa bile sepette ürünün fiyatı ve kaç tane olunduğu bildiği için işlemi ona göre yapar. Yani client'tan aldığı tek şey adres bilgileri. Kullanıcının sepet bilgisi zaten veri tabanında saklanmakta.

![Ödeme Formu](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Odeme.png?raw=true "Ödeme Formu")

Ödeme Yöntemi ise [iyzico](https://www.iyzico.com/isim-icin/kurumsal-hesap-olustur?gclid=CjwKCAjw2a32BRBXEiwAUcugiCh0uQxgE1YtamruIDWylUjnLN87PpGr2c-Z_ahiTJ69JRHWHZXdBBoCiBcQAvD_BwE "iyzico") ile sağlanmaktadır. Ve test kısmı kullanıldığı için sadece iyzico dokümentasyonunda bulunan test kartları ile sağlanmaktadır. 'Kullanmak için config ayarları' kısmında da iyzico ayarlarından bahsettim(Sadece üye olup iki key kopyalamak :D). İyzico hakkında daha fazla bilgi almak için : [Dokümentasyon](https://dev.iyzipay.com/tr "Dokümentasyon")

Ödeme yapıldığında ise iyzico hesabınızda(Sizin açmış olduğunuz hesapta) tam fatura bilgileri çıkacaktır. Alınan ürünlerin fiyatları ve isimleri ile alan kullanıcı bilgileri bu fatura içinde olacaktır. Unutmayın Sandbox isimli iyzico ile test sürümünü kullanıyoruz. Yani buradaki fatura ve kartlar sadece test içindir. Eğer ki gerçek iyzico hesabı alınırsa gerçek kredi kartları da kabul edilmeye başlanır ve hesabınıza gerçekten para yatar. Gerçek bir hosting kullanılmadığı için Webhook ayarları yapılamıyor. Bu yüzden de ödeme yapıldıktan sonra yönlendirilen sayfada hata veriyor. Fakat tekrar anasayfaya gidildiğinde sorunsuz bir şekilde kullanabilirsiniz.

## Kullanmak İçin Config Ayarları
Yapılması gereken ayarlar gerçekten çok basit. Dosyaları indirdikten sonra 'config.env' dosyasını açınız. Dosya tam olarak böye gözükecektir : 

![Config](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/Config.png?raw=true "Config")

- MongoDB :
MONGODB yazan yerin karşısına kendi mongoDB hesabınızdan linki kopyalayıp yapıştıracaksınız. 

![MONGODB](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/mongo.png?raw=true "MONGODB")

Buradaki linkte tek değiştirmeniz gereken şey 'password' yerine 'PASSWORD' yazıcaksınız ve şifrenizi DB_PASSWORD 'un karşısına da mongoDB şifrenizi yazıcaksınız.

- JWT

JWT_SECRET_KEY yazan yere kendi istediğiniz şifre biçiminizi yazıcaksınız. Tamamıyla bireysel olan bir şifredir. Hatta orada yazan şeyi değiştirmeseniz bile program düzgün bir şekilde çalışacaktır.

- Email ayarları 

Email olarak ben Mailtrap kullandım. Mailtrap gerçekten çok basit bir kullanımı olan developerlar için geliştirilmiş ve gerçekten mail göndermeyen sahte mail gönderme işlemi yapan bir sistemdir. Önce [Mailtrap](https://mailtrap.io "Mailtrap")'e gidip yeni bir hesap açmanız gerekiyor. Ve açıldıktan sonra 'Create Inbox' a tıklayıp yeni bir mesaj bölümü oluşturmalısınız. Sonra karşınıza username ve password çıkacaktır. Oradaki username ve password'u MAILTRAP_USERNAME ve MAILTRAP_PASSWORD karşısına koyacaksınız. EMAIL_FROM ise <do_not@reply.com> VegeFoods olarak kayıtlı(Vegefoods ilk düşündüğüm isimdi :D) orayı da istediğiniz gibi düzenleyebilirsiniz. Değiştirmek zorunlu değildir.
	Emaili hostingi kendine göre ayarlamak istiyorsan ise utils/email dosyasından kodları kendine göre düzenleyebilirsin.

- Ödeme ayarları

Öncelike şunu belirtmek istiyorum : Bu ayarları yapmazsanız program düzgün çalışır fakat satın al butonuna tıkladığınızda hata alıcaksınızdır. Ayarları yapmak için ise önce [iyzico](https://sandbox-merchant.iyzipay.com/auth/login "iyzico")'ya gidip oradan kendinize yeni bir hesap açmalısınız. Hesabı açtıksan sonra Ayarlar'dan Firma Ayarları'na gitmelisiniz. Karşınıza ise böyle bir şey çıkacaktır:
![Keyler](https://github.com/Lepuz-coder/E-Ticaret-Yemek-Sitesi-RESTFUL-API-NODEJS/blob/master/%C4%B0yzico.png?raw=true "Keyler")

IYZIPAY_API_KEY karşısına buradaki API Anahtarı'nda yazanı koyacaksın.
IYZIPAY_SECRET_KEY karşısına ise Güvenlik Anahtarındaki yazanı koyacaksın.

İşte bu kadar ! Bu ayarların hepsini yaptıktan sonra uygulamayı istediğin gibi kullanabileceksin. Sadece API'i kullanmak istiyorsan public klasörünün ve views klasörünün içindekiler seni ilgilendirmiyor demektir. İyi kullanmalar :D

### Önemli Bir Uyarı !
- Eğer ki tüm bu yaptıklarınızdan sonra sistem doğru çalışmadıysa node_modules dosyası indi mi diye kontrol ediniz. İnmediyse indirdiğiniz proje dizininde 'npm install' yazarak node_modules klasörünü ve içeirisindeki dosyaları indirebilirsiniz.
