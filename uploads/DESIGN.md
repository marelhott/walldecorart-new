# Design System Inspired by Refit

## 1. Visual Theme & Atmosphere

Refit embodies a sophisticated and professional aesthetic rooted in contemporary construction and home improvement design. The visual language is characterized by a bold, high-contrast approach that pairs deep charcoal and pure black with crisp white and light neutrals. The design exudes confidence and expertise through generous whitespace, refined typography, and carefully curated imagery of elegant interior and exterior transformations. The atmosphere is minimalist yet warm—emphasizing quality craftsmanship and attention to detail through clean layouts and purposeful visual hierarchy. The brand projects trust, modernity, and premium service delivery suitable for high-end renovation projects.

**Key Characteristics**
- High-contrast color scheme with dominant dark backgrounds and bright accent highlights
- Elegant, spacious layouts with deliberate negative space
- Premium photography-forward design showcasing project portfolio
- Modern sans-serif typography (Manrope) for clarity and contemporary feel
- Minimalist interface with functional simplicity
- Warm metallic and natural wood tones in imagery to humanize technical services

## 2. Color Palette & Roles

### Primary
- **Deep Charcoal** (`#101014`): Primary interface background, primary text on light surfaces, dominant UI element
- **Pure Black** (`#000000`): Maximum contrast text, primary borders, foundational neutral backbone

### Accent Colors
- **Electric Blue** (`#0000EE`): Primary call-to-action links, interactive element highlights, brand accent
- **Bright Cyan** (`#0099FF`): Secondary accent, hover states for links, alternative accent applications
- **Vibrant Magenta** (`#FF2244`): Error and danger states, urgent notifications

### Interactive
- **Electric Blue** (`#0000EE`): Default link color, CTA elements
- **Bright Cyan** (`#0099FF`): Secondary interactive states, alternative CTAs
- **Deep Charcoal Overlay** (`#101014` at 75% opacity): Button backgrounds for subdued CTAs

### Neutral Scale
- **Off-White** (`#FAFAFA`): Minimal accent backgrounds, subtle surface variation
- **Light Gray** (`#E9ECF2`): Secondary background, input field underlines
- **Medium Gray** (`#D0D1DB`): Disabled states, muted text, secondary dividers
- **Dark Gray** (`#3D3D47`): Secondary text, supporting copy, form labels
- **Charcoal Gray** (`#28282C`): Tertiary text, subtle UI elements

### Surface & Borders
- **White** (`#FFFFFF`): Primary content backgrounds, card surfaces, modal backgrounds
- **Very Light Gray** (`#E6E6E6`): Subtle borders, divider lines
- **Dark Charcoal** (`#414142`): Secondary borders, input dividers

## 3. Typography Rules

### Font Family
**Primary:** Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
**Secondary/Links:** system-ui, -apple-system, sans-serif
**Fallback:** sans-serif

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Manrope | 58px | 500 | 69.6px | 0px | Maximum visual impact, page hero sections |
| Heading XL | Manrope | 50px | 500 | 55px | 0px | Major section headings, prominent hierarchy |
| Heading M | Manrope | 20px | 600 | 30px | 0px | Subsection headings, card titles |
| Heading S | Manrope | 16px | 500 | 16px | 0px | Small section headers, labels |
| Body / Paragraph | Manrope | 18px | 500 | 18px | 0px | Primary content, descriptive text |
| Input Field | Manrope | 16px | 400 | 20.8px | 0px | Form input text, placeholder text |
| Link / Button | system-ui | 12px | 400 | normal | 0px | Navigation links, button labels, small actions |

### Principles
- **Weight Consistency:** Use weight 500 for all display and body text to maintain refined appearance; reserve weight 600 for emphasis (subheadings)
- **Line Height:** Maintain 1.2× multiplier for heading clarity; body text uses generous 1× (18px size = 18px height) for clean typography
- **Visual Hierarchy:** Size progression emphasizes content priority; link text remains minimal (12px) to preserve whitespace
- **Manrope Dominance:** Primary font throughout except for navigation and links, which use system sans-serif for technical clarity
- **Letter Spacing:** No additional tracking applied—rely on typeface metrics and size variation for hierarchy

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `rgba(16, 16, 20, 0.75)` (Deep Charcoal at 75% opacity)
- **Text Color:** `#000000`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `11px 18px 14px 18px`
- **Border Radius:** `6px`
- **Border:** none
- **Min Height:** `46px`
- **Box Shadow:** none
- **Line Height:** normal
- **Hover State:** Background opacity to 1.0, text to `#FFFFFF`

#### Secondary Button
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `11px 18px 14px 18px`
- **Border Radius:** `6px`
- **Border:** `1px solid #D0D1DB`
- **Box Shadow:** none
- **Hover State:** Background `#FAFAFA`, border `#3D3D47`

#### Ghost Button (Link Style)
- **Background:** transparent
- **Text Color:** `#0000EE`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `10px 10px 10px 10px`
- **Border Radius:** `0px`
- **Border:** none
- **Box Shadow:** none
- **Hover State:** Text color `#0099FF`

### Cards & Containers

#### Standard Card
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Padding:** `40px`
- **Border Radius:** `10px`
- **Border:** `1px solid #E6E6E6`
- **Box Shadow:** `0px 1px 3px rgba(0, 0, 0, 0.08)`
- **Hover State:** Border `#D0D1DB`, shadow `0px 2px 6px rgba(0, 0, 0, 0.12)`

#### Dark Container
- **Background:** `#101014`
- **Text Color:** `#FFFFFF`
- **Padding:** `52px`
- **Border Radius:** `0px`
- **Border:** none
- **Box Shadow:** none

#### Image Container
- **Border Radius:** `10px`
- **Overflow:** hidden
- **Box Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.15)`

### Inputs & Forms

#### Text Input (Single Line)
- **Background:** transparent
- **Text Color:** `#101014`
- **Font:** Manrope, 16px, weight 400
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `0px` (use bottom border in parent: `1px solid #E6E6E6`)
- **Line Height:** `20.8px`
- **Placeholder Color:** `#D0D1DB`
- **Focus State:** Border-bottom `1px solid #101014`

#### Text Input (Multi-line / Textarea)
- **Background:** transparent
- **Text Color:** `#101014`
- **Font:** Manrope, 16px, weight 400
- **Padding:** `14px 12px 14px 12px`
- **Border Radius:** `0px`
- **Border:** `0px` (use bottom border in parent: `1px solid #E6E6E6`)
- **Line Height:** `20.8px`
- **Min Height:** `150px`
- **Resize:** vertical
- **Focus State:** Border-bottom `1px solid #101014`

#### Form Label
- **Font:** Manrope, 16px, weight 500
- **Text Color:** `#3D3D47`
- **Margin Bottom:** `12px`

#### Form Group
- **Margin Bottom:** `32px`
- **Display:** flex, flex-direction column

### Navigation

#### Header Navigation
- **Background:** transparent
- **Text Color:** `#000000`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `0px`
- **Line Height:** normal
- **Display:** flex, gap `40px`
- **Align Items:** center

#### Navigation Link
- **Color:** `#000000`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `10px 10px 10px 10px`
- **Border:** none
- **Border Radius:** `0px`
- **Hover State:** Color `#0000EE`
- **Active State:** Color `#0000EE`, border-bottom `2px solid #0000EE`

### Badges & Labels

#### Category Badge
- **Background:** `#3D3D47`
- **Text Color:** `#FFFFFF`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `6px 12px 6px 12px`
- **Border Radius:** `20px`
- **Font Weight:** 500

## 5. Layout Principles

### Spacing System
**Base Unit:** 4px

**Scale:** 4px, 8px, 12px, 20px, 32px, 40px, 44px, 52px, 60px, 80px, 100px, 120px

- **4–8px:** Micro spacing within components (icon-to-text distance, tight button padding)
- **12–20px:** Component internal spacing (card padding, input padding)
- **32–40px:** Section internal spacing (content blocks within containers)
- **52–60px:** Medium section separation (space between logical content regions)
- **80–120px:** Macro section separation (major layout breaks, hero to content transition)

### Grid & Container
- **Max Width:** 1400px (primary content container)
- **Columns:** 12-column flexible grid for desktop; adapt to 6 columns at tablet, 1 column at mobile
- **Gutter:** 20px between columns (10px left + 10px right padding per column)
- **Section Pattern:** Full-width background containers with centered max-width content

### Whitespace Philosophy
Refit prioritizes generous whitespace to communicate premium quality and reduce cognitive load. Sections use significant top and bottom spacing (80–120px) to establish visual rhythm. Content within cards and sections maintains breathing room with minimum 40px padding. Whitespace is a primary design material—never fill it unnecessarily.

### Border Radius Scale
- **6px:** Button corners, small interactive elements, subtle rounding for modern aesthetic
- **10px:** Card corners, image containers, product showcases—provides accessible warmth without excessive softness
- **0px:** Form inputs, dividers, typography-focused sections—maintains technical precision

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Typography, text backgrounds, flat layouts |
| Subtle (1) | `0px 1px 3px rgba(0, 0, 0, 0.08)` | Card surfaces, slight lift above background |
| Elevated (2) | `0px 2px 6px rgba(0, 0, 0, 0.12)` | Card hover states, dropdown menus, secondary panels |
| High (3) | `0px 4px 12px rgba(0, 0, 0, 0.15)` | Image containers, modals, primary overlays |
| Highest (4) | `0px 8px 24px rgba(0, 0, 0, 0.20)` | Modals, popovers, top-level navigation |

**Shadow Philosophy:** Refit uses minimal shadow depth to maintain the clean, contemporary aesthetic. Shadows are reserved for visual separation and hover states, not primary styling. The dark background (#101014) means shadows must be visible; use opacity adjustments rather than blur-only effects. All shadows use pure black with varying opacity rather than colored shadows. Shadows enhance depth hierarchy without overwhelming the minimalist design language.

## 7. Do's and Don'ts

### Do
- Use the deep charcoal (#101014) and pure black (#000000) as dominant backgrounds—they establish the premium atmosphere
- Leverage electric blue (#0000EE) for all primary CTAs and interactive elements to create visual focus
- Maintain generous whitespace around major sections—minimum 80px top/bottom for visual breathing room
- Apply Manrope 500 weight for all body and heading text—consistency strengthens brand recognition
- Use 6px border radius for buttons and 10px for cards to maintain contemporary elegance
- Layer transparent backgrounds with opacity (e.g., rgba(16, 16, 20, 0.75)) for depth without color shifts
- Include visible focus states on all interactive elements for accessibility (outline or color change)
- Stack images with 10px border radius and elevation shadow to showcase portfolio quality

### Don't
- Avoid heavy shadows or excessive blur—Refit's aesthetic is precision-focused, not soft
- Don't mix serif typefaces with Manrope—maintain sans-serif consistency across all UI
- Never use button text sizes larger than 12px; keep CTAs visually restrained for sophistication
- Don't apply padding less than 11px on buttons—maintain comfortable touch targets
- Avoid introducing new colors beyond the defined palette—stick to primary blues, grays, and neutrals
- Don't reduce line height below 1× for body text; maintain readability and elegance
- Never apply border radius to form inputs (0px radius)—forms require technical precision
- Don't stack multiple shadows on a single element—single, appropriate shadow per elevation level

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–767px | Single column layout, 20px padding, 12px font for navigation, 40px section spacing, 50px hero text |
| Tablet | 768px–1023px | 2-column grid, 32px padding, 20px gutter, 60px section spacing |
| Desktop | 1024px–1399px | 12-column grid, 40px padding, 20px gutter, 80px section spacing |
| Large Desktop | 1400px+ | Max-width 1400px container, centered with side margins |

### Touch Targets
- **Minimum Button Height:** 44px (comfortable tap size for mobile)
- **Minimum Link Padding:** 10px × 10px (comfortable tap spacing for navigation)
- **Minimum Input Height:** 44px (form fields must accommodate touch comfortably)
- **Spacing Between Interactive Elements:** 12px minimum gap to prevent accidental tap

### Collapsing Strategy
- **Navigation:** Horizontal menu on desktop (40px gaps) collapses to hamburger menu on tablet/mobile with vertical 12px-spaced list
- **Section Padding:** 100px–120px on desktop reduces to 52px on tablet, 32px on mobile
- **Typography:** Hero display (58px) reduces to 42px on tablet, 32px on mobile; body (18px) reduces to 16px on mobile
- **Grid Columns:** 12 columns on desktop → 6 on tablet → 1 on mobile; gutter reduces from 20px to 12px on mobile
- **Image Containers:** Full-width on all breakpoints with 10px border radius maintained; adjust aspect ratios as needed for mobile portrait

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Electric Blue (`#0000EE`)
- **Secondary CTA:** Bright Cyan (`#0099FF`)
- **Primary Background:** Pure Black (`#000000`) or Deep Charcoal (`#101014`)
- **Content Background:** White (`#FFFFFF`)
- **Primary Text (on light):** Deep Charcoal (`#101014`) or Pure Black (`#000000`)
- **Secondary Text:** Dark Gray (`#3D3D47`)
- **Disabled/Muted:** Medium Gray (`#D0D1DB`)
- **Error/Danger:** Vibrant Magenta (`#FF2244`)
- **Borders:** Very Light Gray (`#E6E6E6`)
- **Button Background:** Deep Charcoal at 75% opacity (`rgba(16, 16, 20, 0.75)`)

### Iteration Guide

1. **Color Foundation:** All UI must use colors from the defined palette only. Primary backgrounds are #000000 or #101014; primary text on white is #000000; all CTAs default to #0000EE.

2. **Typography Consistency:** Font is always Manrope for body/headings (weight 500, except headers at 600), and system sans-serif for navigation/links (12px, weight 400). No custom font imports beyond Manrope. Line heights follow 1× multiplier: 18px text = 18px height.

3. **Spacing Rhythm:** Section spacing uses the scale: 12px (gaps), 20px (padding), 40px (standard padding), 80px (major breaks), 120px (hero separation). Never add custom spacing—choose from the defined scale.

4. **Component Templates:** Buttons use 6px radius, 11px top/bottom padding, 18px left/right padding. Cards use 10px radius, 40px padding, 1px border (#E6E6E6). Forms have 0px radius, transparent background, bottom-border only.

5. **Depth via Shadow:** Apply exactly one shadow per element at the appropriate level. Use the shadow values verbatim: subtle `0px 1px 3px rgba(0, 0, 0, 0.08)`, elevated `0px 2px 6px rgba(0, 0, 0, 0.12)`, high `0px 4px 12px rgba(0, 0, 0, 0.15)`.

6. **Elevation & Layering:** Dark backgrounds (#101014) are primary containers; white backgrounds (#FFFFFF) are content cards. Layer them with subtle shadows to establish depth without confusion.

7. **Responsive Grid:** Desktop is 12 columns with 20px gutters; tablet is 6 columns; mobile is 1 column. Section padding adapts: 100px (desktop) → 52px (tablet) → 32px (mobile).

8. **Interactive States:** All links and buttons must have visible hover and focus states. Links change to #0099FF on hover. Buttons reverse text/background opacity or shift color on interaction. Include outline or underline for keyboard focus.

9. **Image Presentation:** All portfolio/showcase images use 10px border-radius and elevation shadow `0px 4px 12px rgba(0, 0, 0, 0.15)` for premium presentation. Images must be full-width within their containers.

10. **Premium Aesthetic:** Prioritize whitespace, clarity, and minimal visual noise. Never apply unnecessary borders, shadows, or decoration. Let typography and image quality do the visual work. Typography size hierarchy and generous spacing create sophistication, not ornament.