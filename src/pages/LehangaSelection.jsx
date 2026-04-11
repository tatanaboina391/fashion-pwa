import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LehangaSelection.css';

// ─────────────────────────────────────────────────
//  LEHANGA DATA
// ─────────────────────────────────────────────────

const lehangaTypes = [
  'A-Line Lehenga', 'Circular / Flared Lehenga', 'Mermaid / Fishtail Lehenga', 
  'Panelled Lehenga', 'Sharara Cut Lehenga', 'Straight Cut Lehenga', 
  'Jacket Style Lehenga', 'Half-Saree Style Lehenga', 'Bridal Lehenga', 
  'Party Wear Lehenga', 'Indo-Western Lehenga', 'Floral Print Lehenga'
];

const lehangaFabrics = [
  { name: 'Velvet', desc: 'Rich, heavy and royal' },
  { name: 'Silk Brocade', desc: 'Traditional woven patterns' },
  { name: 'Pure Silk', desc: 'Classic elegant sheen' },
  { name: 'Net Fabric', desc: 'Light and princess-like' },
  { name: 'Organza', desc: 'Crisp and trendy sheer' },
  { name: 'Georgette', desc: 'Flowy and comfortable' },
  { name: 'Satin', desc: 'Smooth and glossy finish' },
  { name: 'Raw Silk', desc: 'Natural textured look' },
  { name: 'Crepe Silk', desc: 'Matte and sophisticated' },
  { name: 'Chiffon', desc: 'Ultra-light and airy' },
  { name: 'Banarasi Silk', desc: 'Heritage brocade work' },
  { name: 'Kanjeevaram', desc: 'Temple-inspired weave' },
];

const dupattaFabrics = [
  { name: 'Net', desc: 'Classic sheer dupatta' },
  { name: 'Organza', desc: 'Trendy and stiff sheer' },
  { name: 'Chiffon', desc: 'Soft and light drape' },
  { name: 'Georgette', desc: 'Heavy and elegant' },
  { name: 'Tissue Silk', desc: 'Golden shimmering look' },
  { name: 'Silk', desc: 'Rich and traditional' },
  { name: 'Crepe', desc: 'Understated matte' },
  { name: 'Lace Fabric', desc: 'Floral see-through' },
];

const blouseFabrics = [
  { name: 'Silk Brocade', desc: 'Standard heavy match' },
  { name: 'Velvet', desc: 'Plush and opulent' },
  { name: 'Raw Silk', desc: 'Classic structural fit' },
  { name: 'Cotton Silk', desc: 'Breathable elegance' },
  { name: 'Net with Satin', desc: 'Sheer over glossy' },
  { name: 'Satin Silk', desc: 'Sleek and shining' },
  { name: 'Dupion Silk', desc: 'Royal slub texture' },
  { name: 'Work / Embroidered', desc: 'Pre-designed fabric' },
];

const borderTypes = [
  { name: 'Zari Border', icon: '✴️', desc: 'Gold/silver thread work' },
  { name: 'Kanchi Border', icon: '🔶', desc: 'Traditional Kanchipuram' },
  { name: 'Cutwork Border', icon: '✂️', desc: 'Intricate cut patterns' },
  { name: 'Temple Border', icon: '🏛️', desc: 'Temple motif weave' },
  { name: 'Silk Border', icon: '🧵', desc: 'Pure silk edging' },
  { name: 'Velvet Border', icon: '🟥', desc: 'Rich velvet trim' },
  { name: 'Lace Border', icon: '🌸', desc: 'Delicate lace trim' },
  { name: 'Pearl Border', icon: '⬜', desc: 'Pearl embellishment' },
  { name: 'Sequins Border', icon: '✨', desc: 'Glittery sequin edge' },
  { name: 'Stone Border', icon: '💎', desc: 'Crystal stone work' },
  { name: 'Thread Border', icon: '🧶', desc: 'Colourful thread work' },
  { name: 'Embroidery Border', icon: '🌺', desc: 'Hand embroidered trim' },
];

const blouseTypes = {
  frontNeck: [
    'Round neck', 'Deep round neck', 'U-neck', 'Sweetheart neck',
    'V-neck', 'Deep V-neck', 'Boat neck', 'High neck',
    'Collar neck', 'Square neck'
  ],
  backNeck: [
    'Deep U-back', 'Deep V-back', 'Round back neck', 'Square back neck',
    'Backless blouse', 'Tie-up (Dori) back', 'Keyhole back', 'Cut-out back',
    'String back', 'Bow-tie back'
  ],
  handDesign: [
    'Regular Short', 'Elbow Length', 'Full Sleeves',
    'Puff Sleeves', 'Sleeveless', 'Balloon Sleeves',
    'Cap Sleeves', '3/4th Sleeves'
  ]
};

const designWorks = [
  { name: 'Zari Work', icon: '✴️', desc: 'Gold & silver thread weaving' },
  { name: 'Stone Work', icon: '💎', desc: 'Crystal & rhinestone embellishment' },
  { name: 'Embroidery', icon: '🌺', desc: 'Hand & machine embroidery' },
  { name: 'Mirror Work', icon: '🪩', desc: 'Shisha mirror embedding' },
  { name: 'Kundan Work', icon: '👑', desc: 'Gold-set stone jewelry work' },
  { name: 'Meenakari Work', icon: '🎨', desc: 'Enamel colour detailing' },
  { name: 'Aari Work', icon: '🧵', desc: 'Fine hook needle embroidery' },
  { name: 'Gota Patti', icon: '🔶', desc: 'Metallic ribbon appliqué' },
  { name: 'Sequence Work', icon: '✨', desc: 'Sequin & bead embellishment' },
  { name: 'Thread Work', icon: '🎀', desc: 'Silk & cotton thread motifs' },
  { name: 'Patch Work', icon: '🔳', desc: 'Decorative fabric patches' },
  { name: 'Smocking', icon: '🌊', desc: 'Gathered fabric ornament' },
  { name: 'Block Print', icon: '🖨️', desc: 'Wooden block stamp print' },
  { name: 'Digital Print', icon: '🖥️', desc: 'High-res digital art print' },
  { name: 'Bandhani', icon: '🔴', desc: 'Tie-dye dot pattern' },
  { name: 'Chikankari', icon: '🌼', desc: 'Lucknowi shadow stitch' },
  { name: 'Plain (No Work)', icon: '◻️', desc: 'Clean minimal look' },
];

const VIBGYOR = {
  Violet: { icon: '🟣', baseHex: '#8B00FF', tones: { Pastel: [{ name: 'Lavender', hex: '#E6E6FA' }, { name: 'Thistle', hex: '#D8BFD8' }, { name: 'Plum Light', hex: '#DDA0DD' }, { name: 'Wisteria', hex: '#C9A0DC' }, { name: 'Mauve', hex: '#E0B0FF' }, { name: 'Lilac', hex: '#C8A2C8' }], Light: [{ name: 'Orchid', hex: '#DA70D6' }, { name: 'Medium Orchid', hex: '#BA55D3' }, { name: 'Amethyst', hex: '#9966CC' }, { name: 'Medium Purple', hex: '#9370DB' }, { name: 'Heliotrope', hex: '#DF73FF' }, { name: 'Iris', hex: '#5A4FCF' }], True: [{ name: 'Violet', hex: '#8B00FF' }, { name: 'Blue Violet', hex: '#8A2BE2' }, { name: 'Dark Violet', hex: '#9400D3' }, { name: 'Rebecca Purple', hex: '#663399' }, { name: 'Royal Purple', hex: '#7851A9' }, { name: 'Grape', hex: '#6F2DA8' }], Deep: [{ name: 'Purple', hex: '#800080' }, { name: 'Dark Magenta', hex: '#8B008B' }, { name: 'Byzantium', hex: '#702963' }, { name: 'Plum', hex: '#673147' }, { name: 'Eggplant', hex: '#614051' }, { name: 'Mulberry', hex: '#C54B8C' }], Dark: [{ name: 'Indigo', hex: '#4B0082' }, { name: 'Dark Indigo', hex: '#310062' }, { name: 'Aubergine', hex: '#3B0054' }, { name: 'Deep Plum', hex: '#3C1361' }, { name: 'Blackcurrant', hex: '#32174D' }, { name: 'Raven Purple', hex: '#1C0033' }] } },
  Indigo: { icon: '🔵', baseHex: '#4B0082', tones: { Pastel: [{ name: 'Periwinkle', hex: '#CCCCFF' }, { name: 'Lavender Blue', hex: '#B8B8FF' }, { name: 'Soft Slate', hex: '#C5CAE9' }, { name: 'Baby Cornflower', hex: '#AECBF5' }, { name: 'Moonstone', hex: '#B5C0D0' }, { name: 'Pale Indigo', hex: '#9D8EC7' }], Light: [{ name: 'Cornflower Blue', hex: '#6495ED' }, { name: 'Medium Slate Blue', hex: '#7B68EE' }, { name: 'Light Slate Blue', hex: '#8470FF' }, { name: 'Light Indigo', hex: '#818CF8' }, { name: 'Blue Bell', hex: '#9999CC' }, { name: 'Portage', hex: '#8778C8' }], True: [{ name: 'Indigo', hex: '#4B0082' }, { name: 'Persian Blue', hex: '#1C39BB' }, { name: 'Ultramarine', hex: '#3F00FF' }, { name: 'Cobalt Blue', hex: '#0047AB' }, { name: 'Egyptian Blue', hex: '#1034A6' }, { name: 'Denim Blue', hex: '#1560BD' }], Deep: [{ name: 'Dark Blue', hex: '#00008B' }, { name: 'Midnight Blue', hex: '#191970' }, { name: 'Oxford Blue', hex: '#002147' }, { name: 'Prussian Blue', hex: '#003153' }, { name: 'Yale Blue', hex: '#0F4D92' }, { name: 'Sapphire Deep', hex: '#082567' }], Dark: [{ name: 'Navy Blue', hex: '#000080' }, { name: 'Space Cadet', hex: '#1D2951' }, { name: 'Dark Navy', hex: '#0A0A2E' }, { name: 'Seal Blue', hex: '#0E1A40' }, { name: 'Abyss Blue', hex: '#070B24' }, { name: 'Void Indigo', hex: '#080820' }] } },
  Blue: { icon: '💙', baseHex: '#0000FF', tones: { Pastel: [{ name: 'Alice Blue', hex: '#F0F8FF' }, { name: 'Baby Blue', hex: '#89CFF0' }, { name: 'Columbia Blue', hex: '#B9D9EB' }, { name: 'Powder Blue', hex: '#B0E0E6' }, { name: 'Light Steel Blue', hex: '#B0C4DE' }, { name: 'Pale Blue', hex: '#CCEEFF' }], Light: [{ name: 'Sky Blue', hex: '#87CEEB' }, { name: 'Light Blue', hex: '#ADD8E6' }, { name: 'Deep Sky Blue', hex: '#00BFFF' }, { name: 'Dodger Blue', hex: '#1E90FF' }, { name: 'Steel Blue', hex: '#4682B4' }, { name: 'Carolina Blue', hex: '#56A0D3' }], True: [{ name: 'Blue', hex: '#0000FF' }, { name: 'Royal Blue', hex: '#4169E1' }, { name: 'Azure', hex: '#007FFF' }, { name: 'Sapphire', hex: '#0F52BA' }, { name: 'Cerulean Blue', hex: '#2A52BE' }, { name: 'Cobalt', hex: '#0047AB' }], Deep: [{ name: 'Dark Blue', hex: '#00008B' }, { name: 'Duke Blue', hex: '#00009C' }, { name: 'Catalina Blue', hex: '#062A78' }, { name: 'Smalt', hex: '#003399' }, { name: 'Indigo Dye', hex: '#09347A' }, { name: 'Delft Blue', hex: '#26428B' }], Dark: [{ name: 'Midnight Blue', hex: '#191970' }, { name: 'Dark Cerulean', hex: '#08457E' }, { name: 'Oxford Blue', hex: '#002147' }, { name: 'Deep Sea Blue', hex: '#015482' }, { name: 'Inkwell Blue', hex: '#1C2833' }, { name: 'Abyss Blue', hex: '#01012A' }] } },
  Green: { icon: '💚', baseHex: '#008000', tones: { Pastel: [{ name: 'Mint Cream', hex: '#F5FFFA' }, { name: 'Honeydew', hex: '#F0FFF0' }, { name: 'Pale Green', hex: '#98FB98' }, { name: 'Tea Green', hex: '#D0F0C0' }, { name: 'Celadon', hex: '#ACE1AF' }, { name: 'Soft Sage', hex: '#C1D8B8' }], Light: [{ name: 'Light Green', hex: '#90EE90' }, { name: 'Mint Green', hex: '#98FF98' }, { name: 'Spring Green', hex: '#00FF7F' }, { name: 'Aquamarine', hex: '#7FFFD4' }, { name: 'Pistachio', hex: '#93C572' }, { name: 'Yellow Green', hex: '#9ACD32' }], True: [{ name: 'Green', hex: '#008000' }, { name: 'Emerald', hex: '#50C878' }, { name: 'Jade', hex: '#00A36C' }, { name: 'Malachite', hex: '#0BDA51' }, { name: 'Kelly Green', hex: '#4CBB17' }, { name: 'Lime Green', hex: '#32CD32' }], Deep: [{ name: 'Forest Green', hex: '#228B22' }, { name: 'Bottle Green', hex: '#006A4E' }, { name: 'Hunter Green', hex: '#355E3B' }, { name: 'Pakistan Green', hex: '#006600' }, { name: 'British Racing', hex: '#004225' }, { name: 'Phthalo Green', hex: '#123524' }], Dark: [{ name: 'Dark Green', hex: '#006400' }, { name: 'Olive', hex: '#808000' }, { name: 'Army Green', hex: '#4B5320' }, { name: 'Dark Olive Green', hex: '#556B2F' }, { name: 'Rifle Green', hex: '#444C38' }, { name: 'Kombu Green', hex: '#354230' }] } },
  Yellow: { icon: '💛', baseHex: '#FFFF00', tones: { Pastel: [{ name: 'Cream', hex: '#FFFDD0' }, { name: 'Lemon Chiffon', hex: '#FFFACD' }, { name: 'Cornsilk', hex: '#FFF8DC' }, { name: 'Vanilla', hex: '#F3E5AB' }, { name: 'Butter', hex: '#FAFAD2' }, { name: 'Blond', hex: '#FAF0BE' }], Light: [{ name: 'Lemon Yellow', hex: '#FFF44F' }, { name: 'Canary', hex: '#FFFF99' }, { name: 'Khaki', hex: '#F0E68C' }, { name: 'Pale Goldenrod', hex: '#EEE8AA' }, { name: 'Sunny Yellow', hex: '#FFE135' }, { name: 'Flax', hex: '#EEDC82' }], True: [{ name: 'Yellow', hex: '#FFFF00' }, { name: 'Gold', hex: '#FFD700' }, { name: 'Amber', hex: '#FFBF00' }, { name: 'Saffron', hex: '#F4C430' }, { name: 'Cyber Yellow', hex: '#FFD300' }, { name: 'Maize', hex: '#FBEC5D' }], Deep: [{ name: 'Mustard', hex: '#FFDB58' }, { name: 'Dark Goldenrod', hex: '#B8860B' }, { name: 'Goldenrod', hex: '#DAA520' }, { name: 'Harvest Gold', hex: '#DA9100' }, { name: 'Ochre', hex: '#CC7722' }, { name: 'Bronze', hex: '#CD7F32' }], Dark: [{ name: 'Dark Mustard', hex: '#7C6608' }, { name: 'Raw Umber', hex: '#826644' }, { name: 'Olive Gold', hex: '#6B6000' }, { name: 'Burnished Gold', hex: '#856D1B' }, { name: 'Antique Bronze', hex: '#665D1E' }, { name: 'Coyote Brown', hex: '#81613C' }] } },
  Orange: { icon: '🟠', baseHex: '#FF7F00', tones: { Pastel: [{ name: 'Papaya Whip', hex: '#FFEFD5' }, { name: 'Bisque', hex: '#FFE4C4' }, { name: 'Peach Puff', hex: '#FFDAB9' }, { name: 'Moccasin', hex: '#FFE4B5' }, { name: 'Linen', hex: '#FAF0E6' }, { name: 'Peach', hex: '#FFE5B4' }], Light: [{ name: 'Apricot', hex: '#FBCEB1' }, { name: 'Peach Orange', hex: '#FFCC99' }, { name: 'Sandy Brown', hex: '#F4A460' }, { name: 'Light Salmon', hex: '#FFA07A' }, { name: 'Atomic Tangerine', hex: '#FF9966' }, { name: 'Rajah', hex: '#FBAB50' }], True: [{ name: 'Orange', hex: '#FF7F00' }, { name: 'Web Orange', hex: '#FFA500' }, { name: 'Tangerine', hex: '#F28500' }, { name: 'Pumpkin', hex: '#FF7518' }, { name: 'Carrot Orange', hex: '#ED9121' }, { name: 'Tiger Orange', hex: '#FD6A02' }], Deep: [{ name: 'Burnt Orange', hex: '#CC5500' }, { name: 'Rust', hex: '#B7410E' }, { name: 'Ochre Orange', hex: '#CC7722' }, { name: 'Terra Cotta', hex: '#E2725B' }, { name: 'Mahogany', hex: '#C04000' }, { name: 'Sienna', hex: '#A0522D' }], Dark: [{ name: 'Dark Rust', hex: '#7C2D12' }, { name: 'Cinnamon', hex: '#7B3F00' }, { name: 'Auburn', hex: '#A52A2A' }, { name: 'Sepia', hex: '#704214' }, { name: 'Brown', hex: '#A52A2A' }, { name: 'Dark Brown', hex: '#5C2C0E' }] } },
  Red: { icon: '❤️', baseHex: '#FF0000', tones: { Pastel: [{ name: 'Misty Rose', hex: '#FFE4E1' }, { name: 'Lavender Blush', hex: '#FFF0F5' }, { name: 'Pale Pink', hex: '#FADADD' }, { name: 'Bubble Gum', hex: '#FFC1CC' }, { name: 'Cameo Pink', hex: '#EFBBCC' }, { name: 'Carnation Pink', hex: '#FFA6C9' }], Light: [{ name: 'Light Coral', hex: '#F08080' }, { name: 'Salmon', hex: '#FA8072' }, { name: 'Coral', hex: '#FF7F50' }, { name: 'Tomato', hex: '#FF6347' }, { name: 'Pastel Red', hex: '#FF6961' }, { name: 'Indian Red', hex: '#CD5C5C' }], True: [{ name: 'Red', hex: '#FF0000' }, { name: 'Crimson', hex: '#DC143C' }, { name: 'Scarlet', hex: '#FF2400' }, { name: 'Carmine', hex: '#960018' }, { name: 'Firebrick', hex: '#B22222' }, { name: 'Amaranth Red', hex: '#E52B50' }], Deep: [{ name: 'Ruby', hex: '#9B111E' }, { name: 'Maroon', hex: '#800000' }, { name: 'Burgundy', hex: '#800020' }, { name: 'Wine Red', hex: '#722F37' }, { name: 'Oxblood', hex: '#4A0404' }, { name: 'Merlot', hex: '#73343A' }], Dark: [{ name: 'Dark Red', hex: '#8B0000' }, { name: 'Barn Red', hex: '#7C0A02' }, { name: 'Black Cherry', hex: '#3D0C02' }, { name: 'Rosewood', hex: '#65000B' }, { name: 'Dark Burgundy', hex: '#560319' }, { name: 'Chocolate Box', hex: '#420516' }] } },
  Pink: { icon: '🩷', baseHex: '#FF69B4', tones: { Pastel: [{ name: 'Lavender Blush', hex: '#FFF0F5' }, { name: 'Cotton Candy', hex: '#FFB7C5' }, { name: 'Baby Pink', hex: '#F4C2C2' }, { name: 'Piggy Pink', hex: '#FDDDE6' }, { name: 'Powder Pink', hex: '#FFD1DC' }, { name: 'Ballet Slipper', hex: '#F5C2C7' }], Light: [{ name: 'Pink', hex: '#FFC0CB' }, { name: 'Light Pink', hex: '#FFB6C1' }, { name: 'Carnation Pink', hex: '#FFA6C9' }, { name: 'Flamingo', hex: '#FC8EAC' }, { name: 'Salmon Pink', hex: '#FF91A4' }, { name: 'Brink Pink', hex: '#FB607F' }], True: [{ name: 'Hot Pink', hex: '#FF69B4' }, { name: 'Deep Pink', hex: '#FF1493' }, { name: 'Fuchsia', hex: '#FF00FF' }, { name: 'Rose', hex: '#FF007F' }, { name: 'Cerise', hex: '#DE3163' }, { name: 'Wild Strawberry', hex: '#FF43A4' }, { name: 'Magenta Rose', hex: '#FF00AF' }], Deep: [{ name: 'Medium Violet Red', hex: '#C71585' }, { name: 'Dark Pink', hex: '#E75480' }, { name: 'Mulberry', hex: '#C54B8C' }, { name: 'Deep Cerise', hex: '#DA3287' }, { name: 'Amaranth', hex: '#E52B50' }, { name: 'Fuchsia Rose', hex: '#C74375' }], Dark: [{ name: 'Dark Magenta', hex: '#8B008B' }, { name: 'Maroon Rose', hex: '#800040' }, { name: 'Tyrian Purple', hex: '#66023C' }, { name: 'Byzantium', hex: '#702963' }, { name: 'Mardi Gras', hex: '#880085' }, { name: 'Dark Rose', hex: '#905D5D' }] } },
  Neutrals: { icon: '🤍', baseHex: '#9CA3AF', tones: { White: [{ name: 'Pure White', hex: '#FFFFFF' }, { name: 'Snow', hex: '#FFFAFA' }, { name: 'Ivory', hex: '#FFFFF0' }, { name: 'Ghost White', hex: '#F8F8FF' }, { name: 'Old Lace', hex: '#FDF5E6' }, { name: 'Linen', hex: '#FAF0E6' }], Silver: [{ name: 'Silver', hex: '#C0C0C0' }, { name: 'Platinum', hex: '#E5E4E2' }, { name: 'Light Grey', hex: '#D3D3D3' }, { name: 'Gainsboro', hex: '#DCDCDC' }, { name: 'Ash Grey', hex: '#B2BEB5' }, { name: 'Cool Grey', hex: '#8C92AC' }], Gold: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Pale Gold', hex: '#E6BE8A' }, { name: 'Old Gold', hex: '#CFB53B' }, { name: 'Metallic Gold', hex: '#D4AF37' }, { name: 'Gold', hex: '#FFD700' }, { name: 'Antique Gold', hex: '#B29700' }], Grey: [{ name: 'Grey', hex: '#808080' }, { name: 'Slate Grey', hex: '#708090' }, { name: 'Dim Grey', hex: '#696969' }, { name: 'Charcoal', hex: '#36454F' }, { name: 'Davys Grey', hex: '#555555' }, { name: 'Steel Grey', hex: '#43464B' }], Black: [{ name: 'Black', hex: '#000000' }, { name: 'Eerie Black', hex: '#1B1B1B' }, { name: 'Jet Black', hex: '#343434' }, { name: 'Onyx', hex: '#353839' }, { name: 'Rich Black', hex: '#010B13' }, { name: 'Night', hex: '#0D0D0D' }] } },
};

const TONE_ORDER = ['Pastel', 'Light', 'True', 'Deep', 'Dark', 'White', 'Silver', 'Gold', 'Grey', 'Black'];

const STEPS = [
  { id: 1, label: 'Lehanga Style', icon: '💃' },
  { id: 2, label: 'Lehanga Fabric', icon: '🪡' },
  { id: 3, label: 'Blouse Design', icon: '📐' },
  { id: 4, label: 'Dupatta Fabric', icon: '🌬️' },
  { id: 5, label: 'Border', icon: '🔶' },
  { id: 6, label: 'Embellishment', icon: '🎨' },
];

// ─────────────────────────────────────────────────
//  MINI VIBGYOR PICKER (shared)
// ─────────────────────────────────────────────────
const MiniVibgyorPicker = ({ selectedColor, onSelect, label }) => {
  const [activeFamily, setActiveFamily] = useState(null);
  const [activeTone, setActiveTone] = useState(null);

  const families = Object.keys(VIBGYOR);
  const tones = activeFamily ? Object.keys(VIBGYOR[activeFamily].tones).sort(
    (a, b) => TONE_ORDER.indexOf(a) - TONE_ORDER.indexOf(b)
  ) : [];
  const shades = activeFamily && activeTone ? VIBGYOR[activeFamily].tones[activeTone] ?? [] : [];

  return (
    <div className="lh-color-picker">
      <div className="lh-cp-label">{label}</div>
      <div className="lh-cp-families">
        {families.map(f => (
          <button
            key={f}
            className={`lh-cp-family ${activeFamily === f ? 'active' : ''}`}
            onClick={() => { setActiveFamily(prev => prev === f ? null : f); setActiveTone(null); }}
            title={f}
          >
            <span className="lh-cp-orb" style={{ backgroundColor: VIBGYOR[f].baseHex }} />
            <span className="lh-cp-fname">{VIBGYOR[f].icon} {f}</span>
          </button>
        ))}
      </div>
      {activeFamily && (
        <div className="lh-cp-tones">
          <span className="lh-cp-tone-hint">Select tone:</span>
          <div className="lh-cp-tone-pills">
            {tones.map(t => {
              const arr = VIBGYOR[activeFamily].tones[t] ?? [];
              const grad = arr.length ? `linear-gradient(135deg, ${arr[0].hex}, ${arr[arr.length - 1].hex})` : '#888';
              return (
                <button
                  key={t}
                  className={`lh-cp-tone ${activeTone === t ? 'active' : ''}`}
                  onClick={() => setActiveTone(p => p === t ? null : t)}
                  style={{ '--tone-grad': grad }}
                >
                  <span className="lh-cp-tone-swatch" />
                  <span>{t}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {shades.length > 0 && (
        <div className="lh-cp-shades">
          {shades.map((shade, i) => (
            <div
              key={i}
              className={`lh-cp-shade ${selectedColor?.hex === shade.hex ? 'selected' : ''}`}
              onClick={() => onSelect(shade)}
              title={shade.name}
            >
              <div className="lh-cp-shade-circle" style={{ backgroundColor: shade.hex }}>
                {selectedColor?.hex === shade.hex && <span className="lh-cp-check">✓</span>}
              </div>
              <span className="lh-cp-shade-name">{shade.name}</span>
            </div>
          ))}
        </div>
      )}
      {selectedColor && (
        <div className="lh-cp-preview">
          <div className="lh-cp-preview-swatch" style={{ backgroundColor: selectedColor.hex }} />
          <div>
            <span className="lh-cp-preview-tag">Selected Color</span>
            <span className="lh-cp-preview-name" style={{ color: selectedColor.hex === '#FFFFFF' ? '#aaa' : selectedColor.hex }}>
              {selectedColor.name}
            </span>
          </div>
        </div>
      )}
      {!activeFamily && !selectedColor && (
        <div className="lh-cp-placeholder">
          <span>🎨</span>
          <p>Pick a color family above</p>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────
const LehangaSelection = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('forward');

  const [lehangaType, setLehangaType] = useState('');
  const [lehangaFabric, setLehangaFabric] = useState('');
  const [lehangaColor, setLehangaColor] = useState(null);
  const [blouseFabric, setBlouseFabric] = useState('');
  const [blouseColor, setBlouseColor] = useState(null);
  const [frontNeck, setFrontNeck] = useState('');
  const [backNeck, setBackNeck] = useState('');
  const [handDesign, setHandDesign] = useState('');
  const [dupattaFabric, setDupattaFabric] = useState('');
  const [dupattaColor, setDupattaColor] = useState(null);
  const [hasBorder, setHasBorder] = useState(null);
  const [borderType, setBorderType] = useState('');
  const [borderColor, setBorderColor] = useState(null);
  const [selectedDesigns, setSelectedDesigns] = useState([]);

  const totalSteps = STEPS.length;
  const currentStepIndex = currentStep - 1;
  const progressPct = ((currentStepIndex + 1) / totalSteps) * 100;

  const toggleDesign = (name) => {
    if (name === 'Plain (No Work)') { setSelectedDesigns(['Plain (No Work)']); return; }
    setSelectedDesigns(prev => {
      const filtered = prev.filter(d => d !== 'Plain (No Work)');
      return filtered.includes(name) ? filtered.filter(d => d !== name) : [...filtered, name];
    });
  };

  const stepValid = () => {
    switch (currentStep) {
      case 1: return !!lehangaType;
      case 2: return !!lehangaFabric && !!lehangaColor;
      case 3: return !!blouseFabric && !!blouseColor && !!frontNeck && !!backNeck && !!handDesign;
      case 4: return !!dupattaFabric && !!dupattaColor;
      case 5: return hasBorder !== null && (!hasBorder || (!!borderType && !!borderColor));
      case 6: return selectedDesigns.length > 0;
      default: return false;
    }
  };

  const goNext = () => {
    if (!stepValid()) return;
    if (currentStep < totalSteps) { setDirection('forward'); setCurrentStep(s => s + 1); }
  };
  const goBack = () => {
    if (currentStep > 1) { setDirection('back'); setCurrentStep(s => s - 1); }
  };

  const isFormValid = lehangaType && lehangaFabric && lehangaColor && 
    blouseFabric && blouseColor && frontNeck && backNeck && handDesign && 
    dupattaFabric && dupattaColor && hasBorder !== null &&
    (!hasBorder || (borderType && borderColor)) && selectedDesigns.length > 0;

  const handleGenerate = () => {
    if (isFormValid) {
      navigate('/saree/preview', {
        state: {
          type: 'lehanga',
          sareeType: lehangaType,
          sareeColor: lehangaColor,
          lehangaFabric,
          blouseFabric,
          blouseColor,
          frontNeck,
          backNeck,
          handDesign,
          dupattaFabric,
          dupattaColor,
          hasBorder,
          borderType: hasBorder ? borderType : null,
          borderColor: hasBorder ? borderColor : null,
          designs: selectedDesigns
        }
      });
    }
  };

  const FabricGrid = ({ items, selected, onSelect }) => {
    const NeedleIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 3.5C18.1193 2.11929 15.8807 2.11929 14.5 3.5L4 14L2 22L10 20L20.5 9.5C21.8807 8.11929 21.8807 5.88071 20.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 5L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
    );

    return (
      <div className="lh-fabric-grid">
        {items.map((item, i) => (
          <div
            key={i}
            className={`lh-fabric-card ${selected === item.name ? 'selected' : ''}`}
            onClick={() => onSelect(item.name)}
          >
            <div className="lh-fabric-icon">
              <NeedleIcon />
            </div>
            <div className="lh-fabric-info">
              <span className="lh-fabric-name">{item.name}</span>
              <span className="lh-fabric-desc">{item.desc}</span>
            </div>
            {selected === item.name && <div className="lh-type-check">✓</div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lh-container">
      <div className="lh-header">
        <div className="container">
          <button className="lh-back-home" onClick={() => navigate('/')}>← Back to Home</button>
          <div className="lh-header-content">
            <h1 className="lh-title">Tailor Your Lehanga</h1>
            <p className="lh-subtitle">Create a breathtaking ethnic ensemble designed by you</p>
          </div>
        </div>
      </div>

      <div className="lh-progress-wrap">
        <div className="lh-progress-track">
          <div className="lh-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="lh-steps-row">
          {STEPS.map((s, idx) => {
            const done = idx < currentStepIndex;
            const active = s.id === currentStep;
            return (
              <div key={s.id} className={`lh-step-dot ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                <div className="lh-dot-circle">{done ? '✓' : s.icon}</div>
                <span className="lh-dot-label">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lh-content">
        <div className="container">
          <div key={currentStep} className={`lh-panel ${direction === 'forward' ? 'slide-in-right' : 'slide-in-left'}`}>
            
            {/* STEP 1: Lehanga Style */}
            {currentStep === 1 && (
              <section className="lh-section">
                <div className="lh-section-head">
                  <h2 className="lh-section-title">💃 Step 1: Lehanga Style</h2>
                  <p className="lh-section-sub">Pick the silhouette that defines your look</p>
                </div>
                <div className="lh-type-grid">
                  {lehangaTypes.map((type, i) => (
                    <div
                      key={i}
                      className={`lh-type-card ${lehangaType === type ? 'selected' : ''}`}
                      onClick={() => setLehangaType(type)}
                    >
                      <div className="lh-type-icon">👗</div>
                      <span className="lh-type-name">{type}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* STEP 2: Lehanga Fabric */}
            {currentStep === 2 && (
              <section className="lh-section">
                <div className="lh-section-head">
                  <h2 className="lh-section-title">🪡 Step 2: Lehanga Fabric & Color</h2>
                  <p className="lh-section-sub">Choose base fabric and a stunning shade</p>
                </div>
                <div className="lh-two-col">
                  <div className="lh-col">
                    <h3 className="lh-col-title">Select Fabric</h3>
                    <FabricGrid items={lehangaFabrics} selected={lehangaFabric} onSelect={setLehangaFabric} icon="🧵" />
                  </div>
                  <div className="lh-col">
                    <MiniVibgyorPicker label="Lehanga Color" selectedColor={lehangaColor} onSelect={setLehangaColor} />
                  </div>
                </div>
              </section>
            )}

            {/* STEP 3: Blouse Design */}
            {currentStep === 3 && (
              <section className="lh-section">
                <div className="lh-section-head">
                  <h2 className="lh-section-title">📐 Step 3: Blouse Designing</h2>
                  <p className="lh-section-sub">Customize the blouse to match your lehanga</p>
                </div>

                {lehangaFabric && lehangaColor && (
                  <div className="lh-same-group">
                    <label className={`lh-same-checkbox ${blouseFabric === lehangaFabric ? 'checked' : ''}`}>
                      <input type="checkbox" className="lh-same-input" checked={blouseFabric === lehangaFabric} 
                        onChange={(e) => { if (e.target.checked) setBlouseFabric(lehangaFabric); else setBlouseFabric(''); }} />
                      <div className="lh-same-toggle"><div className="lh-same-toggle-track"><div className="lh-same-toggle-thumb" /></div></div>
                      <div className="lh-same-icon">🪡</div>
                      <div className="lh-same-details"><span className="lh-same-label">Same as Lehanga Fabric</span><span className="lh-same-meta">{lehangaFabric}</span></div>
                    </label>
                    <label className={`lh-same-checkbox ${blouseColor?.hex === lehangaColor?.hex ? 'checked' : ''}`}>
                      <input type="checkbox" className="lh-same-input" checked={blouseColor?.hex === lehangaColor?.hex} 
                        onChange={(e) => { if (e.target.checked) setBlouseColor(lehangaColor); else setBlouseColor(null); }} />
                      <div className="lh-same-toggle"><div className="lh-same-toggle-track"><div className="lh-same-toggle-thumb" /></div></div>
                      <div className="lh-same-swatch" style={{ backgroundColor: lehangaColor.hex }} />
                      <div className="lh-same-details"><span className="lh-same-label">Same as Lehanga Color</span><span className="lh-same-meta">{lehangaColor.name}</span></div>
                    </label>
                  </div>
                )}

                <div className="lh-two-col">
                  <div className="lh-col">
                    <h3 className="lh-col-title">Select Fabric</h3>
                    <FabricGrid items={blouseFabrics} selected={blouseFabric} onSelect={setBlouseFabric} icon="✂️" />
                  </div>
                  <div className="lh-col">
                    <MiniVibgyorPicker label="Blouse Color" selectedColor={blouseColor} onSelect={setBlouseColor} />
                  </div>
                </div>

                <div className="lh-blouse-design-row">
                  <div className="lh-col">
                    <h3 className="lh-col-title">Front Neck</h3>
                    <div className="lh-design-card-grid">
                      {[
                        { name: 'Round neck',      img: '/blouse-references/front-round-neck.png' },
                        { name: 'Deep round neck', img: '/blouse-references/front-deep-round-neck.png' },
                        { name: 'Sweetheart neck', img: '/blouse-references/front-sweetheart-neck.png' },
                        { name: 'V-neck',          img: '/blouse-references/front-v-neck.png' },
                        { name: 'Boat neck',       img: '/blouse-references/front-boat-neck.png' },
                      ].map((d, i) => (
                        <div key={i} className={`lh-design-select-card ${frontNeck === d.name ? 'selected' : ''}`} onClick={() => setFrontNeck(d.name)}>
                          <div className="lh-ds-card-img"><img src={d.img} alt={d.name} /></div>
                          <span className="lh-ds-card-name">{d.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="lh-ds-more-label">More styles:</p>
                    <div className="lh-ds-chip-row">
                      {['U-neck', 'Deep V-neck', 'High neck', 'Collar neck', 'Square neck', 'Halter neck', 'Keyhole neck', 'Scalloped neck', 'Asymmetrical neck', 'Princess cut neck', 'Shirt-style neck', 'Illusion neck (net)', 'Angrakha neck', 'One-shoulder neck'].map((n, i) => (
                        <button key={i} className={`lh-ds-chip ${frontNeck === n ? 'selected' : ''}`} onClick={() => setFrontNeck(n)}>{n}</button>
                      ))}
                    </div>
                    {frontNeck && <p className="lh-ds-selected-badge">✓ Selected: <strong>{frontNeck}</strong></p>}
                  </div>
                  <div className="lh-col">
                    <h3 className="lh-col-title">Back Neck</h3>
                    <div className="lh-design-card-grid">
                      {[
                        { name: 'Deep U-back',     img: '/blouse-references/back-deep-u-back.png' },
                        { name: 'Deep V-back',     img: '/blouse-references/back-deep-v-back.png' },
                        { name: 'Round back neck', img: '/blouse-references/back-round-back-neck.png' },
                        { name: 'Backless blouse', img: '/blouse-references/back-backless-blouse.png' },
                      ].map((d, i) => (
                        <div key={i} className={`lh-design-select-card ${backNeck === d.name ? 'selected' : ''}`} onClick={() => setBackNeck(d.name)}>
                          <div className="lh-ds-card-img"><img src={d.img} alt={d.name} /></div>
                          <span className="lh-ds-card-name">{d.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="lh-ds-more-label">More styles:</p>
                    <div className="lh-ds-chip-row">
                      {['Square back neck', 'Tie-up (Dori) back', 'Keyhole back', 'Cut-out back', 'String back', 'Bow-tie back', 'Zip back neck', 'Buttoned back', 'Corset back', 'Sheer / net back', 'Criss-cross back', 'Potli button back', 'Temple design back', 'Tattoo-style back', 'Peep-hole back'].map((n, i) => (
                        <button key={i} className={`lh-ds-chip ${backNeck === n ? 'selected' : ''}`} onClick={() => setBackNeck(n)}>{n}</button>
                      ))}
                    </div>
                    {backNeck && <p className="lh-ds-selected-badge">✓ Selected: <strong>{backNeck}</strong></p>}
                  </div>
                  <div className="lh-col">
                    <h3 className="lh-col-title">Sleeve Style</h3>
                    <div className="lh-design-card-grid">
                      {[
                        { name: 'Regular short', img: '/blouse-references/hand-regular-short.png' },
                        { name: 'Elbow length',  img: '/blouse-references/hand-elbow-length.png' },
                        { name: 'Full sleeves',  img: '/blouse-references/hand-full-sleeves.png' },
                        { name: 'Puff sleeves',  img: '/blouse-references/hand-puff-sleeves.png' },
                      ].map((d, i) => (
                        <div key={i} className={`lh-design-select-card ${handDesign === d.name ? 'selected' : ''}`} onClick={() => setHandDesign(d.name)}>
                          <div className="lh-ds-card-img"><img src={d.img} alt={d.name} /></div>
                          <span className="lh-ds-card-name">{d.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="lh-ds-more-label">More styles:</p>
                    <div className="lh-ds-chip-row">
                      {['Bell sleeves', 'Cap sleeves', 'Three-quarter', 'Flared sleeves', 'Sleeveless', 'Cold shoulder', 'Ruffle sleeves', 'Brocade sleeves'].map((n, i) => (
                        <button key={i} className={`lh-ds-chip ${handDesign === n ? 'selected' : ''}`} onClick={() => setHandDesign(n)}>{n}</button>
                      ))}
                    </div>
                    {handDesign && <p className="lh-ds-selected-badge">✓ Selected: <strong>{handDesign}</strong></p>}
                  </div>
                </div>
              </section>
            )}

            {/* STEP 4: Dupatta Fabric */}
            {currentStep === 4 && (
              <section className="lh-section">
                <div className="lh-section-head">
                  <h2 className="lh-section-title">🌬️ Step 4: Dupatta Fabric & Color</h2>
                  <p className="lh-section-sub">Choose a matching or contrasting dupatta</p>
                </div>
                {lehangaFabric && lehangaColor && (
                  <div className="lh-same-group">
                    <label className={`lh-same-checkbox ${dupattaFabric === lehangaFabric ? 'checked' : ''}`}>
                      <input type="checkbox" className="lh-same-input" checked={dupattaFabric === lehangaFabric} 
                        onChange={(e) => { if (e.target.checked) setDupattaFabric(lehangaFabric); else setDupattaFabric(''); }} />
                      <div className="lh-same-toggle"><div className="lh-same-toggle-track"><div className="lh-same-toggle-thumb" /></div></div>
                      <div className="lh-same-icon">🪡</div>
                      <div className="lh-same-details"><span className="lh-same-label">Same as Lehanga Fabric</span><span className="lh-same-meta">{lehangaFabric}</span></div>
                    </label>
                    <label className={`lh-same-checkbox ${dupattaColor?.hex === lehangaColor?.hex ? 'checked' : ''}`}>
                      <input type="checkbox" className="lh-same-input" checked={dupattaColor?.hex === lehangaColor?.hex} 
                        onChange={(e) => { if (e.target.checked) setDupattaColor(lehangaColor); else setDupattaColor(null); }} />
                      <div className="lh-same-toggle"><div className="lh-same-toggle-track"><div className="lh-same-toggle-thumb" /></div></div>
                      <div className="lh-same-swatch" style={{ backgroundColor: lehangaColor.hex }} />
                      <div className="lh-same-details"><span className="lh-same-label">Same as Lehanga Color</span><span className="lh-same-meta">{lehangaColor.name}</span></div>
                    </label>
                  </div>
                )}
                <div className="lh-two-col">
                  <div className="lh-col">
                    <h3 className="lh-col-title">Select Fabric</h3>
                    <FabricGrid items={dupattaFabrics} selected={dupattaFabric} onSelect={setDupattaFabric} icon="🌬️" />
                  </div>
                  <div className="lh-col">
                    <MiniVibgyorPicker label="Dupatta Color" selectedColor={dupattaColor} onSelect={setDupattaColor} />
                  </div>
                </div>
              </section>
            )}

            {/* STEP 5: Border */}
            {currentStep === 5 && (
              <section className="lh-section">
                <div className="lh-section-head">
                  <h2 className="lh-section-title">🔶 Step 5: Border Preference</h2>
                  <p className="lh-section-sub">Add a rich border to your lehanga skirt</p>
                </div>
                <div className="lh-border-choice">
                  <div className={`lh-border-opt ${hasBorder === true ? 'selected' : ''}`} onClick={() => setHasBorder(true)}>
                    <div className="lh-border-opt-icon">✨</div>
                    <h3>With Border</h3>
                  </div>
                  <div className={`lh-border-opt ${hasBorder === false ? 'selected' : ''}`} onClick={() => setHasBorder(false)}>
                    <div className="lh-border-opt-icon">🌫️</div>
                    <h3>Without Border</h3>
                  </div>
                </div>
                {hasBorder === true && (
                  <div className="lh-border-details">
                    <h3 className="lh-col-title">Choose Border Type</h3>
                    <div className="lh-border-grid">
                      {borderTypes.map((b, i) => (
                        <div key={i} className={`lh-border-card ${borderType === b.name ? 'selected' : ''}`} onClick={() => setBorderType(b.name)}>
                          <div className="lh-border-icon">{b.icon}</div>
                          <span className="lh-border-name">{b.name}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                      <MiniVibgyorPicker label="Border Color" selectedColor={borderColor} onSelect={setBorderColor} />
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* STEP 6: Design Work */}
            {currentStep === 6 && (
              <section className="lh-section">
                <div className="lh-section-head">
                  <h2 className="lh-section-title">🎨 Step 6: Embellishments</h2>
                  <p className="lh-section-sub">Final touch with traditional embroidery and stone work</p>
                </div>
                <div className="lh-design-grid">
                  {designWorks.map((dw, i) => (
                    <div key={i} className={`lh-design-card ${selectedDesigns.includes(dw.name) ? 'selected' : ''}`} onClick={() => toggleDesign(dw.name)}>
                      <div className="lh-design-icon">{dw.icon}</div>
                      <span className="lh-design-name">{dw.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          <div className="lh-nav-row">
            <button className="lh-back-btn" onClick={goBack} style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}>← Back</button>
            {currentStep === totalSteps ? (
              <button className={`lh-generate-btn ${isFormValid ? 'enabled' : 'disabled'}`} onClick={handleGenerate} disabled={!isFormValid}>
                {isFormValid ? '✨ Visualize My Lehanga →' : 'Complete all fields'}
              </button>
            ) : (
              <button className={`lh-next-btn ${stepValid() ? 'active' : ''}`} onClick={goNext} disabled={!stepValid()}>Next Step →</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LehangaSelection;
