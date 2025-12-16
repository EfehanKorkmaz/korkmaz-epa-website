---
description: CSS class'ları çalışmadığında inline style kullanarak düzeltme
---

# Tailwind CSS Çalışmadığında Çözüm

## Problem
Tailwind CSS class'ları bazen uygulanmıyor olabilir. Nedenler:
- PurgeCSS class'ı temizlemiş olabilir
- Build cache sorunu olabilir
- Tailwind config eksik olabilir

## Çözüm: Inline Style Kullan

Tailwind class'ları yerine doğrudan `style` attribute kullan:

```jsx
// ÇALIŞMAYAN (class-based):
<button className="btn-primary px-6 py-3 bg-teal-600 text-white">
    Buton
</button>

// ÇALIŞAN (inline style):
<button
    style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
        padding: '12px 28px',
        fontSize: '1rem',
        fontWeight: '600',
        color: 'white',
        borderRadius: '50px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(13, 148, 136, 0.35)'
    }}
>
    Buton
</button>
```

## Renk Referansları

Teal renk paleti:
- `#0d9488` - teal-600 (koyu)
- `#14b8a6` - teal-500 (orta)
- `#2dd4bf` - teal-400 (açık)

## Ne Zaman Kullanmalı

1. Butonlar görsel olarak değişmiyorsa
2. Hover efektleri çalışmıyorsa
3. Tailwind rebuild'den sonra bile sorun devam ediyorsa
