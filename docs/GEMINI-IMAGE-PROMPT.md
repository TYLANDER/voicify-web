# Voicify Website — Image Generation Prompt for Gemini Pro 3

## Context for Gemini

You are generating images for a modern Voice AI company called **Voicify**. Their website uses a **"Dark Premium Tech"** design aesthetic — think Linear, Vercel, or Raycast. The color palette is:

- **Background:** Deep navy (#0a0f1e)
- **Primary accent:** Electric blue (#3b82f6)
- **Secondary accent:** Teal (#14b8a6)
- **Tertiary accent:** Violet (#8b5cf6)
- **Gradients:** Blue → Teal, Blue → Violet

All images should feel premium, clean, and modern. Use dark backgrounds with subtle lighting, gradient accents, and a cinematic quality. Avoid stock photo clichés. Think abstract, editorial, and atmospheric — not literal.

---

## Images Needed (13 total)

### 1. Homepage Hero Background

**File:** `homepage-hero.jpg`
**Size:** 1920x1080
**Prompt:** Abstract visualization of sound waves transforming into digital signals on a deep navy background. Subtle electric blue and teal gradient light trails flowing across the composition. Ethereal, minimal, with a sense of technology meeting human voice. No text. Cinematic lighting with soft depth of field.

### 2-6. Industry Card Images (5 images)

Each should be 800x600, dark atmospheric style with the industry subtly suggested through abstract elements and lighting, not literal photos.

**2. `industry-restaurants.jpg`**
**Prompt:** Abstract atmospheric image suggesting a premium restaurant environment. Warm amber accent lights against a dark navy background, with subtle blue-tinted glass reflections. A hint of elegant table settings or culinary elements as silhouettes. Modern, moody, editorial quality. No text, no people.

**3. `industry-dental.jpg`**
**Prompt:** Abstract medical/dental themed image with clean, clinical precision. Soft blue and white light gradients against dark navy. Subtle geometric shapes suggesting dental tools or a healthy smile — abstract, not literal. Clean, premium, and reassuring. No text, no people.

**4. `industry-hotels.jpg`**
**Prompt:** Luxurious hotel atmosphere rendered abstractly. Warm golden and teal accent lights against deep navy. Subtle suggestions of elegant architecture, flowing curtains, or a premium lobby through light and shadow. Atmospheric, cinematic quality. No text, no people.

**5. `industry-medical.jpg`**
**Prompt:** Abstract healthcare visualization. Clean blue and violet gradient light against dark navy background. Subtle pulse or heartbeat waveform integrated with geometric medical cross shapes. Feels secure, trustworthy, and technologically advanced. No text, no people.

**6. `industry-automotive.jpg`**
**Prompt:** Abstract automotive service environment. Sleek blue and teal light reflections suggesting a modern vehicle service bay or showroom floor. Dark navy background with subtle metallic highlights and clean geometric lines. Premium, modern, technological. No text, no people.

### 7-9. Product Page Hero Backgrounds (3 images)

Each 1600x900, abstract gradient backgrounds with thematic elements.

**7. `product-answering.jpg`**
**Prompt:** Abstract visualization of a friendly AI voice assistant. Sound wave forms morphing into digital particles on deep navy background. Warm teal and blue accents suggesting a welcoming, conversational tone. Floating geometric elements representing phone connections. Ethereal and inviting. No text.

**8. `product-ordering.jpg`**
**Prompt:** Abstract visualization of a digital ordering flow. Flowing data streams and interface elements in blue and teal gradients on deep navy. Suggests efficiency, accuracy, and seamless digital transactions. Geometric shapes representing order items flowing through a pipeline. Modern and precise. No text.

**9. `product-reservations.jpg`**
**Prompt:** Abstract visualization of time and scheduling. Circular calendar-like geometric patterns with blue and violet gradients on deep navy background. Suggests 24/7 availability and seamless time management. Clock-like elements integrated with digital particles. Calm and organized. No text.

### 10. Integrations Page Hero

**File:** `integrations-hero.jpg`
**Size:** 1600x900
**Prompt:** Abstract network visualization showing interconnected nodes and pathways. Electric blue and teal gradient connections flowing between geometric shapes on deep navy background. Represents seamless integration and partnership. Clean, modern, technological. No text.

### 11. About Page Hero

**File:** `about-hero.jpg`
**Size:** 1600x900
**Prompt:** Abstract image of innovation and human-technology convergence. Soft blue and violet light emanating from a central point on deep navy background, with subtle waveforms suggesting voice. Represents the company's mission to reimagine the phone call. Inspirational and forward-looking. No text.

### 12. OG Image (Social Sharing)

**File:** `og-default.jpg`
**Size:** 1200x630
**Prompt:** Dark navy background with a centered gradient mesh of electric blue and teal. Subtle grain texture overlay. Clean and minimal — this will have the Voicify logo and text overlaid on it programmatically. Leave generous negative space in the center. No text.

### 13. Compliance/Trust Section Background

**File:** `trust-bg.jpg`
**Size:** 1920x600
**Prompt:** Subtle dark abstract pattern suggesting security and trust. Fine geometric grid lines in very faint blue on deep navy (#111827) background. Barely visible shield-like shapes in the composition. Extremely subtle — this sits behind compliance badges. No text.

---

## After Generating Images

### Upload to Sanity CMS

1. Open the Sanity Studio at `http://localhost:3333` (run `npm run dev` from the project root)
2. For each document that needs an image:
   - Navigate to the document (e.g., Products → Voice AI Answering)
   - Find the **Hero Section** → **Background Image** field
   - Upload the corresponding image
   - Set the hotspot (focal point) by clicking on the image

### Where Each Image Goes in Sanity

| Image File                 | Sanity Document                                                    | Field Path             |
| -------------------------- | ------------------------------------------------------------------ | ---------------------- |
| `homepage-hero.jpg`        | _Not in CMS — place at `apps/web/public/images/homepage-hero.jpg`_ | —                      |
| `industry-restaurants.jpg` | Industries → Restaurants                                           | `hero.backgroundImage` |
| `industry-dental.jpg`      | Industries → Dental                                                | `hero.backgroundImage` |
| `industry-hotels.jpg`      | Industries → Hotels                                                | `hero.backgroundImage` |
| `industry-medical.jpg`     | Industries → Medical                                               | `hero.backgroundImage` |
| `industry-automotive.jpg`  | Industries → Automotive                                            | `hero.backgroundImage` |
| `product-answering.jpg`    | Products → Voice AI Answering                                      | `hero.backgroundImage` |
| `product-ordering.jpg`     | Products → Voice AI Ordering                                       | `hero.backgroundImage` |
| `product-reservations.jpg` | Products → Voice AI Reservations                                   | `hero.backgroundImage` |
| `integrations-hero.jpg`    | _Place at `apps/web/public/images/integrations-hero.jpg`_          | —                      |
| `about-hero.jpg`           | _Place at `apps/web/public/images/about-hero.jpg`_                 | —                      |
| `og-default.jpg`           | _Place at `apps/web/public/images/og-default.jpg`_                 | —                      |
| `trust-bg.jpg`             | _Place at `apps/web/public/images/trust-bg.jpg`_                   | —                      |

### For Industry & Product Pages in Sanity

After uploading the hero background image, change the **Background Type** field from "gradient" to "image" to activate it.

### Quality Notes

- Export at **2x resolution** if possible (e.g., 3840x2160 for the homepage hero)
- Use **JPEG format** at 85-90% quality for photos, **PNG** for anything with transparency
- Ensure images are **under 500KB** after compression for web performance
- All images should pass the "squint test" — the dark navy + accent gradient palette should be immediately recognizable even at thumbnail size
