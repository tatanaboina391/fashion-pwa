# AI-Enhanced Saree Customization Flow - v2.0

## Overview
This update transforms the generic/static saree customization flow into a simulated **AI-driven experience**. The key change is the replacement of pencil sketches with realistic image assets that are "recolored" dynamically to simulate generative AI output.

## New Flow Architecture

```
Home (Saree Card Click)
    ↓
Step 1: Selection (/saree/select)
    • Select saree type and blouse type
    ↓
Step 2: AI Generation Preview (/saree/preview) [NEW]
    • Simulates AI generation process ("Scanning...")
    • Displays realistic base model image
    ↓
Step 3: Realistic Color Customization (/saree/customize) [UPDATED]
    • Uses realistic image base
    • Interactive "AI Recolor" overlays (Blouse/Saree)
    • Preserves fabric texture and drape
    ↓
Step 4: Real 360° View (/saree/360-view) [UPDATED]
    • Displays the customized realistic model
    • 3D rotating card presentation
```

## Key Technical Enhancements

### 1. Simulated AI Generation (`SareeGeneratedPreview.jsx`)
- **Loading State**: Simulated 5-step generation process with progress indicators.
- **Visuals**: Uses a high-quality realistic placeholder image as the "AI Output".
- **UX**: Provides a "scanning" animation to build anticipation.

### 2. Texture-Preserving Recolor (`SareeColorCustomization.jsx`)
- **Technique**: CSS `mix-blend-mode: color` (or soft-light/multiply depending on base) is used to tint the underlying image.
- **Overlays**: Custom-shaped CSS/SVG polygons approximate the blouse and saree areas on the model photo.
- **Benefit**: This allows us to change the color *without* losing the shadows, highlights, and fabric texture of the realistic image, effectively mimicking a Generative Fill operation.

### 3. Consistency
- The same "base image" is passed through the state from Preview -> Customize -> 360 View.
- This ensures the user sees the *exact same* model and drape throughout the entire journey.

## Component Changes

### New Components
- `SareeGeneratedPreview.jsx`
- `SareeGeneratedPreview.css`

### Updated Components
- `SareeTypeSelection.jsx` (Navigation target changed)
- `SareeColorCustomization.jsx` (Converted from SVG sketch to Image overlay)
- `Saree360View.jsx` (Converted from SVG model to Image-based 3D card)

## 5. Implemented AI Integration (Google Imagen 4.0)

The application now integrates the **Google Imagen 4.0 API** via the `generativelanguage` endpoint to generate high-fidelity previews.

### Implementation Logic
Located in `src/pages/SareeGeneratedPreview.jsx`:

1.  **Endpoint**:
    *   `POST https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${AIzaSyBfvAUTvdWZcUnixuG5aNCYeSdX-o8X4_A}`
2.  **Payload Structure**:
    ```json
    {
      "instances": [
        { "prompt": "Professional high-end fashion catalog photography... Split-view composite..." }
      ],
      "parameters": {
        "sampleCount": 1,
        "aspectRatio": "3:4"
      }
    }
    ```
3.  **Process**:
    *   Constructs a detailed prompt using user selections (Fabric, Necklines, Color).
    *   Fetches the prediction from the API.
    *   Extracts the `bytesBase64Encoded` string.
    *   Renders as `data:image/png;base64,...`.
4.  **Fallback**:
    *   If the API key is missing or the request fails, it defaults to the local `/saree-model.jpeg` (Red Saree Model).

## 6. Future Enhancements
- [ ] Backend Integration for secure key management.
- [ ] User Authentication system.
- [ ] Save designs to user profile.

## Dev Notes
- **Base Image**: Currently hardcoded to a specific Unsplash URL. In production, this would be the dynamic output from the Generation step.
- **Mobile Responsiveness**: The new layout creates a focused, app-like experience on mobile with bottom-sheet palettes.
