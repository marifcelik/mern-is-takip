# İş takip projesi

Proje basitçe iki kısımdan oluşmaktadır. Back-end kısmı bir bir api sunar ve gelen istekler üzerine belirli işlemleri yapıp cevap verir. Front-end kısmı da kullanıcının hareketleri doğrultusunda istekleri gerçekleştirir. Proje bu bakımdan bir MERN Stack Projesidir.
<br />  

## Back-end

Bu projede Back-end için Node.js ve Express kullandım. Database kısmında MongoDB ile Mongoose paketinden yararlandım. Mongoose ile model oluşturdum ve kullanıcı isteklerine göre MongoDB' de işlem yaptırdım.

### API

---
**[/employees](./server/models/employeesRouter.js)**
> Çalışanları aslında iki kısım olarak tanımlamıştım. ADMIN ve USER. USER normal çalışanları temsil edecekti ve sadece kendisiyle ilişkilendirilen işler için yetkisi olacaktı, ADMIN ise genel yöneticiyi temsil edecekti. Ancak bunu yetiştiremedim ve şu an tek bir admin tüm işleri yönetiyor durumda

| link    | istek türü | açıklama         |
| ------- | ---------- | ---------------- |
| `/`     | GET        | TODO             |
| `/add`  | POST       | kullanıcı ekleme |
| `/edit` | PATCH      | TODO             |
| `/rm`   | DELETE     | TODO             |

**[/jobs](./server/models/jobsRouter.js)**  
> İşler kendi içerisinde notların id' sini barındırır. 

| link            | istek türü | açıklama                                                    |
| --------------- | ---------- | ----------------------------------------------------------- |
| `/sorgu/:email` | GET        | e mail bilgisi verilen müşterinin mevcut işlerini görüntüle |
| `/`             | GET        | tüm işleri listele                                          |
| `/add`          | POST       | iş ekleme                                                   |
| `/edit`         | PATCH      | TODO                                                        |
| `/rm`           | DELETE     | verilen id' ye göre işi siler                               |
  
**[/customers](./server/models/customersRouter.js)**  
| link    | istek türü | açıklama                                     |
| ------- | ---------- | -------------------------------------------- |
| `/`     | GET        | tüm müşterileri listele                      |
| `/add`  | POST       | müşteri ekleme                               |
| `/edit` | PATCH      | obje içindeki emaile göre müşteri güncelleme |
| `/rm`   | DELETE     | verilen e mail' e göre müşteriyi siler       |
  
**[/notes](./server/models/notesRouter.js)**  
> Notlar database içerisinde ait olduğu iş id'sine göre çağrılır ve en son düzenleyen çalışanın id' sini barındırır.

| link    | istek türü | açıklama                                |
| ------- | ---------- | --------------------------------------- |
| `/:id`  | GET        | verilen id' ye göre tüm notları listele |
| `/add`  | POST       | not ekleme                              |
| `/edit` | PATCH      | verilen id' ye göre not güncelleme      |
| `/rm`   | DELETE     | verilen id' ye göre notu siler          |

## Front-End

Front-End tarafında React ve React-Bootstrap kullandım. Sayfalar arası gezinme için react-router-dom paketini kullandım.  

> Front-End tarafı API' yı karşılayamıyor. Yetiştiremedim. 
