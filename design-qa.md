# Design QA — Pricing & Plans

## Evidence

- Source visual truth: `/Users/sumangaldey/.codex/generated_images/01a1b141-a902-7991-99b0-8fd319006f24/exec-78c114c7-4883-43c8-a41b-78c54ff90a04.png`
- Browser-rendered implementation: `/Users/sumangaldey/Desktop/SDS/ai-chatbot/ai-chatbot-web/pricing-implementation.png`
- Full-view comparison: `/Users/sumangaldey/Desktop/SDS/ai-chatbot/ai-chatbot-web/pricing-comparison.png`
- Focused pricing-card comparison: `/Users/sumangaldey/Desktop/SDS/ai-chatbot/ai-chatbot-web/pricing-focused-comparison.png`
- Mobile implementation capture: `/Users/sumangaldey/Desktop/SDS/ai-chatbot/ai-chatbot-web/pricing-mobile.png`
- Source pixels: 1487 × 1058.
- Implementation pixels: 1487 × 1058.
- Matched CSS viewport: 1487 × 1058 at browser device pixel ratio 1.1; browser screenshot output was normalized to the same 1487 × 1058 pixel dimensions as the source, so no additional density resampling was used.
- State: desktop monthly billing, Free current plan, all plans visible.

## Full-view comparison evidence

The final implementation preserves the source composition: Aurion logo lockup and back arrow at the upper left, centered single-line heading and supporting sentence, segmented billing control, three equal-height plan cards, emphasized Plus plan, full-width Business strip, and the informational note within the initial desktop viewport. Measured implementation anchors closely match the source: heading y=136, toggle y=268, cards y=358 with 482px height, and Business y=864.

## Focused-region comparison evidence

The pricing-card crop confirms consistent card widths, radii, warm borders, plan hierarchy, price placement, check-icon rhythm, bottom-aligned actions, and Plus emphasis. The live Geist rendering is slightly more compact than the generated mockup's synthetic type rendering, but the content hierarchy and readable optical scale are preserved.

## Required fidelity surfaces

- Fonts and typography: Geist is used consistently with the existing product. Heading, card titles, prices, descriptions, feature labels, and actions preserve the reference hierarchy. The generated source's letterforms are slightly wider than live Geist; this is a P3-only optical difference.
- Spacing and layout rhythm: desktop anchors, card height, three-column grid, card action alignment, Business strip, and footer note match the source composition. Mobile collapses cleanly to one column without horizontal overflow.
- Colors and visual tokens: the existing ivory canvas, espresso ink, terracotta accent, warm border, muted sand buttons, and pale Plus emphasis match the selected visual and the established Aurion system.
- Image quality and asset fidelity: the supplied `/public/brand/aurion-mark.png` is used directly at native quality; no CSS or SVG approximation was introduced. Phosphor icons are used for the arrow and checks.
- Copy and content: all approved plan descriptions, prices, features, Business copy, and informational sentences are present. Yearly prices and annual-billing labels update correctly.

## Interaction, responsiveness, and accessibility

- Monthly/yearly toggle changes Plus from $9 to $7.20 and Pro from $19 to $15.20 while keeping all three plans visible.
- Plus and Business actions expose visible selected/requested states.
- Back arrow returns to chat; the sidebar's Upgrade and Pricing & plans links open `/pricing` through client navigation.
- Mobile verification used a 390 × 843 CSS viewport. Document width remained 390px with no horizontal overflow; all plans remain available in the scroll flow.
- Controls have accessible names, visible focus styling, and `aria-pressed` state for billing selection.
- Browser console checked: zero warnings or errors.
- ESLint passed. Production Webpack build passed; the environment blocked Turbopack's internal worker-port binding, so the documented `next build --webpack` fallback was used.

## Comparison history

1. Initial browser capture rendered without utilities because Webpack development mode did not load the project's Turbopack-specific Tailwind integration. The development preview was restarted in the project's normal Turbopack mode and recaptured with complete styling.
2. First styled comparison found compressed logo, typography, card height, and vertical rhythm. The logo lockup, heading width and size, billing control, card height, card grid, feature type, Business strip, and responsive spacing were adjusted.
3. Second comparison found the heading wrapping and the main content approximately 40px too low. The heading container was widened and the pricing section was moved upward. Post-fix anchors now align with the source and no actionable P0/P1/P2 mismatch remains.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- P3: the live Geist font is slightly narrower and crisper than the generated mockup's synthetic type rendering.
- P3: the implementation uses marginally lighter shadows to stay consistent with the existing Aurion application rather than reproducing rasterized shadow softness exactly.

final result: passed
