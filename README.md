# Kort Defteri

Tenis antrenman ve maç kayıtlarını tutmak için basit bir günlük uygulaması. Her kayıt tarih, tür (antrenman/maç), kort, süre, rakip/partner, skor ve sonuç bilgisiyle saklanır; üstteki şerit toplam kayıt sayısını, toplam kort süresini ve maç galibiyet oranını gösterir.

Veriler tarayıcının localStorage'ında tutulur, sunucu ya da veritabanı yok.

## Özellikler

- Ekle: yeni antrenman veya maç kaydı oluşturma
- Listeleme: kayıtları tarihe göre sıralı tablo halinde görme
- Güncelleme: mevcut bir kaydı düzenleme
- Silme: kaydı kaldırma, 6 saniye içinde "Geri al" ile geri getirme

## Teknik yapı

- React 19 + TypeScript, Vite ile
- Tailwind CSS v4 (Vite eklentisi üzerinden)
- Klasörler: `src/components`, `src/pages`, `src/interfaces`, `src/hooks`, `src/lib`

## Çalıştırma

```bash
npm install
npm run dev
```

Build almak için:

```bash
npm run build
```
