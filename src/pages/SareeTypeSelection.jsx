import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SareeTypeSelection.css';

// ─────────────────────────────────────────────────
//  BLOUSE TYPES
// ─────────────────────────────────────────────────
const blouseTypes = {
  frontNeck: [
    'Round neck', 'Deep round neck', 'U-neck', 'Sweetheart neck',
    'V-neck', 'Deep V-neck', 'Boat neck', 'High neck',
    'Collar neck', 'Square neck', 'Halter neck', 'Keyhole neck',
    'Scalloped neck', 'Asymmetrical neck', 'Princess cut neck',
    'Shirt-style neck', 'Illusion neck (net)', 'Angrakha neck', 'One-shoulder neck'
  ],
  backNeck: [
    'Deep U-back', 'Deep V-back', 'Round back neck', 'Square back neck',
    'Backless blouse', 'Tie-up (Dori) back', 'Keyhole back', 'Cut-out back',
    'String back', 'Bow-tie back', 'Zip back neck', 'Buttoned back',
    'Corset back', 'Sheer / net back', 'Criss-cross back', 'Potli button back',
    'Temple design back', 'Tattoo-style back', 'Peep-hole back'
  ]
};

// ─────────────────────────────────────────────────
//  SAREE TYPES
// ─────────────────────────────────────────────────
const sareeTypes = {
  traditional: [
    'Kanjeevaram', 'Banarasi', 'Paithani', 'Pochampally Ikat',
    'Sambalpuri', 'Chanderi', 'Maheshwari', 'Gadwal', 'Dharmavaram',
    'Uppada Silk', 'Narayanpet', 'Chettinad cotton', 'Mangalagiri', 'Venkatagiri'
  ],
  silk: ['Pure silk', 'Soft silk', 'Mysore silk', 'Tussar silk', 'Raw silk', 'Art silk', 'Tissue silk', 'Kora silk'],
  cotton: ['Cotton saree', 'Linen saree', 'Khadi saree', 'Kota Doria', 'Jamdani', 'Handloom cotton', 'Mulmul cotton'],
  designer: ['Georgette', 'Chiffon', 'Net saree', 'Organza', 'Crepe', 'Satin', 'Ruffle saree', 'Pre-stitched saree', 'Half-and-half saree', 'Digital print saree'],
  occasion: ['Bridal saree', 'Party-wear saree', 'Wedding guest saree', 'Festival saree', 'Office-wear saree', 'Casual wear saree']
};

// ─────────────────────────────────────────────────
//  VIBGYOR FULL COLOR PALETTE  (family → tone → shades)
// ─────────────────────────────────────────────────
const VIBGYOR = {
  Violet: {
    icon: '🟣',
    baseHex: '#8B00FF',
    tones: {
      Pastel: [
        { name: 'Lavender',        hex: '#E6E6FA' },
        { name: 'Thistle',         hex: '#D8BFD8' },
        { name: 'Plum Light',      hex: '#DDA0DD' },
        { name: 'Wisteria',        hex: '#C9A0DC' },
        { name: 'Mauve',           hex: '#E0B0FF' },
        { name: 'Lilac',           hex: '#C8A2C8' },
        { name: 'Pale Violet',     hex: '#CC99CC' },
      ],
      Light: [
        { name: 'Orchid',          hex: '#DA70D6' },
        { name: 'Medium Orchid',   hex: '#BA55D3' },
        { name: 'Amethyst',        hex: '#9966CC' },
        { name: 'Medium Purple',   hex: '#9370DB' },
        { name: 'Heliotrope',      hex: '#DF73FF' },
        { name: 'Periwinkle',      hex: '#CCCCFF' },
        { name: 'Iris',            hex: '#5A4FCF' },
      ],
      True: [
        { name: 'Violet',          hex: '#8B00FF' },
        { name: 'Blue Violet',     hex: '#8A2BE2' },
        { name: 'Dark Violet',     hex: '#9400D3' },
        { name: 'Electric Violet', hex: '#8F00FF' },
        { name: 'Rebecca Purple',  hex: '#663399' },
        { name: 'Grape',           hex: '#6F2DA8' },
        { name: 'Royal Purple',    hex: '#7851A9' },
      ],
      Deep: [
        { name: 'Purple',          hex: '#800080' },
        { name: 'Dark Magenta',    hex: '#8B008B' },
        { name: 'Byzantium',       hex: '#702963' },
        { name: 'Tyrian Purple',   hex: '#66023C' },
        { name: 'Plum',            hex: '#673147' },
        { name: 'Eggplant',        hex: '#614051' },
        { name: 'Mulberry',        hex: '#C54B8C' },
      ],
      Dark: [
        { name: 'Indigo',          hex: '#4B0082' },
        { name: 'Dark Indigo',     hex: '#310062' },
        { name: 'Midnight Violet', hex: '#290032' },
        { name: 'Aubergine',       hex: '#3B0054' },
        { name: 'Deep Plum',       hex: '#3C1361' },
        { name: 'Blackcurrant',    hex: '#32174D' },
        { name: 'Raven Purple',    hex: '#1C0033' },
      ],
    }
  },
  Indigo: {
    icon: '🔵',
    baseHex: '#4B0082',
    tones: {
      Pastel: [
        { name: 'Periwinkle',      hex: '#CCCCFF' },
        { name: 'Lavender Blue',   hex: '#B8B8FF' },
        { name: 'Pale Indigo',     hex: '#9D8EC7' },
        { name: 'Soft Slate',      hex: '#C5CAE9' },
        { name: 'Blue Lavender',   hex: '#D0D1F7' },
        { name: 'Baby Cornflower', hex: '#AECBF5' },
        { name: 'Moonstone',       hex: '#B5C0D0' },
      ],
      Light: [
        { name: 'Cornflower Blue', hex: '#6495ED' },
        { name: 'Medium Slate Blue',hex: '#7B68EE' },
        { name: 'Light Slate Blue', hex: '#8470FF' },
        { name: 'Light Indigo',    hex: '#818CF8' },
        { name: 'Blue Bell',       hex: '#9999CC' },
        { name: 'Portage',         hex: '#8778C8' },
        { name: 'Wedgewood',       hex: '#4E7FA3' },
      ],
      True: [
        { name: 'Indigo',          hex: '#4B0082' },
        { name: 'Persian Blue',    hex: '#1C39BB' },
        { name: 'Ultramarine',     hex: '#3F00FF' },
        { name: 'Cobalt Blue',     hex: '#0047AB' },
        { name: 'Egyptian Blue',   hex: '#1034A6' },
        { name: 'Denim Blue',      hex: '#1560BD' },
        { name: 'Klein Blue',      hex: '#002FA7' },
      ],
      Deep: [
        { name: 'Dark Blue',       hex: '#00008B' },
        { name: 'Midnight Blue',   hex: '#191970' },
        { name: 'Phthalo Blue',    hex: '#000F89' },
        { name: 'Oxford Blue',     hex: '#002147' },
        { name: 'Prussian Blue',   hex: '#003153' },
        { name: 'Yale Blue',       hex: '#0F4D92' },
        { name: 'Sapphire Deep',   hex: '#082567' },
      ],
      Dark: [
        { name: 'Navy Blue',       hex: '#000080' },
        { name: 'Space Cadet',     hex: '#1D2951' },
        { name: 'Regal Blue',      hex: '#013162' },
        { name: 'Dark Navy',       hex: '#0A0A2E' },
        { name: 'Seal Blue',       hex: '#0E1A40' },
        { name: 'Abyss Blue',      hex: '#070B24' },
        { name: 'Void Indigo',     hex: '#080820' },
      ],
    }
  },
  Blue: {
    icon: '💙',
    baseHex: '#0000FF',
    tones: {
      Pastel: [
        { name: 'Alice Blue',      hex: '#F0F8FF' },
        { name: 'Baby Blue',       hex: '#89CFF0' },
        { name: 'Columbia Blue',   hex: '#B9D9EB' },
        { name: 'Pale Cyan',       hex: '#AFEEEE' },
        { name: 'Powder Blue',     hex: '#B0E0E6' },
        { name: 'Light Steel Blue',hex: '#B0C4DE' },
        { name: 'Pale Blue',       hex: '#CCEEFF' },
      ],
      Light: [
        { name: 'Sky Blue',        hex: '#87CEEB' },
        { name: 'Light Blue',      hex: '#ADD8E6' },
        { name: 'Cornflower Blue', hex: '#6495ED' },
        { name: 'Deep Sky Blue',   hex: '#00BFFF' },
        { name: 'Dodger Blue',     hex: '#1E90FF' },
        { name: 'Steel Blue',      hex: '#4682B4' },
        { name: 'Carolina Blue',   hex: '#56A0D3' },
      ],
      True: [
        { name: 'Blue',            hex: '#0000FF' },
        { name: 'Royal Blue',      hex: '#4169E1' },
        { name: 'Azure',           hex: '#007FFF' },
        { name: 'Brandeis Blue',   hex: '#0070FF' },
        { name: 'Sapphire',        hex: '#0F52BA' },
        { name: 'Cerulean Blue',   hex: '#2A52BE' },
        { name: 'Cobalt',          hex: '#0047AB' },
      ],
      Deep: [
        { name: 'Dark Blue',       hex: '#00008B' },
        { name: 'Duke Blue',       hex: '#00009C' },
        { name: 'Catalina Blue',   hex: '#062A78' },
        { name: 'Smalt',           hex: '#003399' },
        { name: 'Tufts Blue',      hex: '#417DC1' },
        { name: 'Indigo Dye',      hex: '#09347A' },
        { name: 'Delft Blue',      hex: '#26428B' },
      ],
      Dark: [
        { name: 'Midnight Blue',   hex: '#191970' },
        { name: 'Space Blue',      hex: '#1B2A4A' },
        { name: 'Dark Cerulean',   hex: '#08457E' },
        { name: 'Oxford Blue',     hex: '#002147' },
        { name: 'Deep Sea Blue',   hex: '#015482' },
        { name: 'Inkwell Blue',    hex: '#1C2833' },
        { name: 'Abyss Blue',      hex: '#01012A' },
      ],
    }
  },
  Green: {
    icon: '💚',
    baseHex: '#008000',
    tones: {
      Pastel: [
        { name: 'Mint Cream',      hex: '#F5FFFA' },
        { name: 'Honeydew',        hex: '#F0FFF0' },
        { name: 'Pale Green',      hex: '#98FB98' },
        { name: 'Tea Green',       hex: '#D0F0C0' },
        { name: 'Celadon',         hex: '#ACE1AF' },
        { name: 'Pistachio Cream', hex: '#DAEAC1' },
        { name: 'Soft Sage',       hex: '#C1D8B8' },
      ],
      Light: [
        { name: 'Light Green',     hex: '#90EE90' },
        { name: 'Mint Green',      hex: '#98FF98' },
        { name: 'Spring Green',    hex: '#00FF7F' },
        { name: 'Aquamarine',      hex: '#7FFFD4' },
        { name: 'Pistachio',       hex: '#93C572' },
        { name: 'Yellow Green',    hex: '#9ACD32' },
        { name: 'Seafoam Green',   hex: '#2E8B57' },
      ],
      True: [
        { name: 'Green',           hex: '#008000' },
        { name: 'Emerald',         hex: '#50C878' },
        { name: 'Jade',            hex: '#00A36C' },
        { name: 'Malachite',       hex: '#0BDA51' },
        { name: 'Kelly Green',     hex: '#4CBB17' },
        { name: 'Lime Green',      hex: '#32CD32' },
        { name: 'Shamrock',        hex: '#009E60' },
      ],
      Deep: [
        { name: 'Forest Green',    hex: '#228B22' },
        { name: 'Bottle Green',    hex: '#006A4E' },
        { name: 'Hunter Green',    hex: '#355E3B' },
        { name: 'Pakistan Green',  hex: '#006600' },
        { name: 'Mughal Green',    hex: '#306030' },
        { name: 'British Racing',  hex: '#004225' },
        { name: 'Phthalo Green',   hex: '#123524' },
      ],
      Dark: [
        { name: 'Dark Green',      hex: '#006400' },
        { name: 'Olive',           hex: '#808000' },
        { name: 'Army Green',      hex: '#4B5320' },
        { name: 'Dark Olive Green',hex: '#556B2F' },
        { name: 'Deep Jungle',     hex: '#004B49' },
        { name: 'Rifle Green',     hex: '#444C38' },
        { name: 'Kombu Green',     hex: '#354230' },
      ],
    }
  },
  Yellow: {
    icon: '💛',
    baseHex: '#FFFF00',
    tones: {
      Pastel: [
        { name: 'Cream',           hex: '#FFFDD0' },
        { name: 'Lemon Chiffon',   hex: '#FFFACD' },
        { name: 'Cornsilk',        hex: '#FFF8DC' },
        { name: 'Blond',           hex: '#FAF0BE' },
        { name: 'Vanilla',         hex: '#F3E5AB' },
        { name: 'Butter',          hex: '#FAFAD2' },
        { name: 'Ivory Yellow',    hex: '#FFFFF0' },
      ],
      Light: [
        { name: 'Lemon Yellow',    hex: '#FFF44F' },
        { name: 'Canary',          hex: '#FFFF99' },
        { name: 'Pale Yellow',     hex: '#FDFD96' },
        { name: 'Khaki',           hex: '#F0E68C' },
        { name: 'Pale Goldenrod',  hex: '#EEE8AA' },
        { name: 'Sunny Yellow',    hex: '#FFE135' },
        { name: 'Flax',            hex: '#EEDC82' },
      ],
      True: [
        { name: 'Yellow',          hex: '#FFFF00' },
        { name: 'Gold',            hex: '#FFD700' },
        { name: 'Amber',           hex: '#FFBF00' },
        { name: 'Golden Yellow',   hex: '#FFDF00' },
        { name: 'Saffron',         hex: '#F4C430' },
        { name: 'Cyber Yellow',    hex: '#FFD300' },
        { name: 'Maize',           hex: '#FBEC5D' },
      ],
      Deep: [
        { name: 'Mustard',         hex: '#FFDB58' },
        { name: 'Dark Goldenrod',  hex: '#B8860B' },
        { name: 'Goldenrod',       hex: '#DAA520' },
        { name: 'Harvest Gold',    hex: '#DA9100' },
        { name: 'Ochre',           hex: '#CC7722' },
        { name: 'Bronze',          hex: '#CD7F32' },
        { name: 'Dark Amber',      hex: '#FF8C00' },
      ],
      Dark: [
        { name: 'Dark Mustard',    hex: '#7C6608' },
        { name: 'Raw Umber',       hex: '#826644' },
        { name: 'Olive Gold',      hex: '#6B6000' },
        { name: 'Burnished Gold',  hex: '#856D1B' },
        { name: 'Antique Bronze',  hex: '#665D1E' },
        { name: 'Coyote Brown',    hex: '#81613C' },
        { name: 'Dark Goldenrod 2',hex: '#996515' },
      ],
    }
  },
  Orange: {
    icon: '🟠',
    baseHex: '#FF7F00',
    tones: {
      Pastel: [
        { name: 'Papaya Whip',     hex: '#FFEFD5' },
        { name: 'Bisque',          hex: '#FFE4C4' },
        { name: 'Peach Puff',      hex: '#FFDAB9' },
        { name: 'Moccasin',        hex: '#FFE4B5' },
        { name: 'Antique White',   hex: '#FAEBD7' },
        { name: 'Linen',           hex: '#FAF0E6' },
        { name: 'Peach',           hex: '#FFE5B4' },
      ],
      Light: [
        { name: 'Apricot',         hex: '#FBCEB1' },
        { name: 'Peach Orange',    hex: '#FFCC99' },
        { name: 'Sandy Brown',     hex: '#F4A460' },
        { name: 'Light Salmon',    hex: '#FFA07A' },
        { name: 'Salmon',          hex: '#FA8072' },
        { name: 'Atomic Tangerine',hex: '#FF9966' },
        { name: 'Rajah',           hex: '#FBAB50' },
      ],
      True: [
        { name: 'Orange',          hex: '#FF7F00' },
        { name: 'Web Orange',      hex: '#FFA500' },
        { name: 'Tangerine',       hex: '#F28500' },
        { name: 'Pumpkin',         hex: '#FF7518' },
        { name: 'Carrot Orange',   hex: '#ED9121' },
        { name: 'Tiger Orange',    hex: '#FD6A02' },
        { name: 'Cadmium Orange',  hex: '#ED872D' },
      ],
      Deep: [
        { name: 'Burnt Orange',    hex: '#CC5500' },
        { name: 'Rust',            hex: '#B7410E' },
        { name: 'Alloy Orange',    hex: '#C46210' },
        { name: 'Ochre',           hex: '#CC7722' },
        { name: 'Terra Cotta',     hex: '#E2725B' },
        { name: 'Mahogany',        hex: '#C04000' },
        { name: 'Sienna',          hex: '#A0522D' },
      ],
      Dark: [
        { name: 'Dark Rust',       hex: '#7C2D12' },
        { name: 'Cinnamon',        hex: '#7B3F00' },
        { name: 'Burnt Sienna',    hex: '#6B3322' },
        { name: 'Auburn',          hex: '#A52A2A' },
        { name: 'Sepia',           hex: '#704214' },
        { name: 'Brown',           hex: '#A52A2A' },
        { name: 'Dark Brown',      hex: '#5C2C0E' },
      ],
    }
  },
  Red: {
    icon: '❤️',
    baseHex: '#FF0000',
    tones: {
      Pastel: [
        { name: 'Misty Rose',      hex: '#FFE4E1' },
        { name: 'Lavender Blush',  hex: '#FFF0F5' },
        { name: 'Pale Pink',       hex: '#FADADD' },
        { name: 'Baby Pink',       hex: '#F4C2C2' },
        { name: 'Bubble Gum',      hex: '#FFC1CC' },
        { name: 'Cameo Pink',      hex: '#EFBBCC' },
        { name: 'Carnation Pink',  hex: '#FFA6C9' },
      ],
      Light: [
        { name: 'Light Coral',     hex: '#F08080' },
        { name: 'Salmon',          hex: '#FA8072' },
        { name: 'Coral',           hex: '#FF7F50' },
        { name: 'Coral Pink',      hex: '#F88379' },
        { name: 'Tomato',          hex: '#FF6347' },
        { name: 'Pastel Red',      hex: '#FF6961' },
        { name: 'Indian Red',      hex: '#CD5C5C' },
      ],
      True: [
        { name: 'Red',             hex: '#FF0000' },
        { name: 'Crimson',         hex: '#DC143C' },
        { name: 'Scarlet',         hex: '#FF2400' },
        { name: 'Alizarin Red',    hex: '#E32636' },
        { name: 'Carmine',         hex: '#960018' },
        { name: 'Firebrick',       hex: '#B22222' },
        { name: 'Amaranth Red',    hex: '#E52B50' },
      ],
      Deep: [
        { name: 'Ruby',            hex: '#9B111E' },
        { name: 'Maroon',          hex: '#800000' },
        { name: 'Burgundy',        hex: '#800020' },
        { name: 'Wine Red',        hex: '#722F37' },
        { name: 'Blood Red',       hex: '#880808' },
        { name: 'Oxblood',         hex: '#4A0404' },
        { name: 'Merlot',          hex: '#73343A' },
      ],
      Dark: [
        { name: 'Dark Red',        hex: '#8B0000' },
        { name: 'Barn Red',        hex: '#7C0A02' },
        { name: 'Black Cherry',    hex: '#3D0C02' },
        { name: 'Deep Maroon',     hex: '#3D0000' },
        { name: 'Rosewood',        hex: '#65000B' },
        { name: 'Dark Burgundy',   hex: '#560319' },
        { name: 'Chocolate Box',   hex: '#420516' },
      ],
    }
  },
  Pink: {
    icon: '🩷',
    baseHex: '#FF69B4',
    tones: {
      Pastel: [
        { name: 'Lavender Blush',  hex: '#FFF0F5' },
        { name: 'Piggy Pink',      hex: '#FDDDE6' },
        { name: 'Ballet Slipper',  hex: '#F5C2C7' },
        { name: 'Cotton Candy',    hex: '#FFB7C5' },
        { name: 'Pale Pink',       hex: '#FADADD' },
        { name: 'Baby Pink',       hex: '#F4C2C2' },
        { name: 'Powder Pink',     hex: '#FFD1DC' },
      ],
      Light: [
        { name: 'Pink',            hex: '#FFC0CB' },
        { name: 'Light Pink',      hex: '#FFB6C1' },
        { name: 'Carnation Pink',  hex: '#FFA6C9' },
        { name: 'Flamingo',        hex: '#FC8EAC' },
        { name: 'Tickle Me Pink',  hex: '#FC89AC' },
        { name: 'Salmon Pink',     hex: '#FF91A4' },
        { name: 'Brink Pink',      hex: '#FB607F' },
      ],
      True: [
        { name: 'Hot Pink',        hex: '#FF69B4' },
        { name: 'Deep Pink',       hex: '#FF1493' },
        { name: 'Fuchsia',         hex: '#FF00FF' },
        { name: 'Rose',            hex: '#FF007F' },
        { name: 'Cerise',          hex: '#DE3163' },
        { name: 'Wild Strawberry', hex: '#FF43A4' },
        { name: 'Magenta Rose',    hex: '#FF00AF' },
      ],
      Deep: [
        { name: 'Medium Violet Red',hex: '#C71585' },
        { name: 'Dark Pink',       hex: '#E75480' },
        { name: 'Mulberry',        hex: '#C54B8C' },
        { name: 'Amaranth',        hex: '#E52B50' },
        { name: 'Deep Cerise',     hex: '#DA3287' },
        { name: 'Fuchsia Rose',    hex: '#C74375' },
        { name: 'Dark Hot Pink',   hex: '#C0006B' },
      ],
      Dark: [
        { name: 'Dark Magenta',    hex: '#8B008B' },
        { name: 'Maroon Rose',     hex: '#800040' },
        { name: 'Tyrian Purple',   hex: '#66023C' },
        { name: 'Mardi Gras',      hex: '#880085' },
        { name: 'Byzantium',       hex: '#702963' },
        { name: 'Dark Rose',       hex: '#905D5D' },
        { name: 'Dark Violet Red', hex: '#641651' },
      ],
    }
  },
  Neutrals: {
    icon: '🤍',
    baseHex: '#9CA3AF',
    tones: {
      White: [
        { name: 'Pure White',      hex: '#FFFFFF' },
        { name: 'Snow',            hex: '#FFFAFA' },
        { name: 'Ivory',           hex: '#FFFFF0' },
        { name: 'Floral White',    hex: '#FFFAF0' },
        { name: 'Ghost White',     hex: '#F8F8FF' },
        { name: 'Old Lace',        hex: '#FDF5E6' },
        { name: 'Linen',           hex: '#FAF0E6' },
      ],
      Silver: [
        { name: 'Silver',          hex: '#C0C0C0' },
        { name: 'Platinum',        hex: '#E5E4E2' },
        { name: 'Light Grey',      hex: '#D3D3D3' },
        { name: 'Gainsboro',       hex: '#DCDCDC' },
        { name: 'Ash Grey',        hex: '#B2BEB5' },
        { name: 'Silver Sand',     hex: '#BFC1C2' },
        { name: 'Cool Grey',       hex: '#8C92AC' },
      ],
      Gold: [
        { name: 'Champagne',       hex: '#F7E7CE' },
        { name: 'Pale Gold',       hex: '#E6BE8A' },
        { name: 'Old Gold',        hex: '#CFB53B' },
        { name: 'Vegas Gold',      hex: '#C5B358' },
        { name: 'Metallic Gold',   hex: '#D4AF37' },
        { name: 'Gold',            hex: '#FFD700' },
        { name: 'Antique Gold',    hex: '#B29700' },
      ],
      Grey: [
        { name: 'Grey',            hex: '#808080' },
        { name: 'Slate Grey',      hex: '#708090' },
        { name: 'Dim Grey',        hex: '#696969' },
        { name: 'Charcoal',        hex: '#36454F' },
        { name: 'Davys Grey',      hex: '#555555' },
        { name: 'Taupe Grey',      hex: '#8B8589' },
        { name: 'Steel Grey',      hex: '#43464B' },
      ],
      Black: [
        { name: 'Black',           hex: '#000000' },
        { name: 'Eerie Black',     hex: '#1B1B1B' },
        { name: 'Jet Black',       hex: '#343434' },
        { name: 'Onyx',            hex: '#353839' },
        { name: 'Licorice',        hex: '#1A1110' },
        { name: 'Rich Black',      hex: '#010B13' },
        { name: 'Night',           hex: '#0D0D0D' },
      ],
    }
  }
};

const TONE_ORDER = ['Pastel', 'Light', 'True', 'Deep', 'Dark', 'White', 'Silver', 'Gold', 'Grey', 'Black'];

const borderTypes = [
  'Zari Border', 'Kanchi Border', 'Cutwork Border',
  'Temple Border', 'Silk Border', 'Velvet Border',
  'Lace Border', 'Pearl Border', 'Sequins Border'
];

const handDesigns = [
  'Regular Short', 'Elbow Length', 'Full Sleeves',
  'Puff Sleeves', 'Sleeveless', 'Balloon Sleeves',
  'Cap Sleeves', '3/4th Sleeves', 'Bell Sleeves'
];

const BASE_STEPS = [
  { id: 1, label: 'Saree Style' },
  { id: 2, label: 'Saree Color' },
  { id: 3, label: 'Border' },
  { id: 4, label: 'Border Details' },
  { id: 5, label: 'Blouse Design' },
];

// ─────────────────────────────────────────────────────────────
//  3-LEVEL COLOR PICKER COMPONENT
//  family (VIBGYOR) → tone (Pastel/Light/True/Deep/Dark) → shade
// ─────────────────────────────────────────────────────────────
const VibgyorPicker = ({ selectedColor, onSelect, compact = false }) => {
  const [activeFamily, setActiveFamily] = useState(null);
  const [activeTone, setActiveTone] = useState(null);

  const families = Object.keys(VIBGYOR);
  const tones = activeFamily
    ? Object.keys(VIBGYOR[activeFamily].tones).sort(
        (a, b) => TONE_ORDER.indexOf(a) - TONE_ORDER.indexOf(b)
      )
    : [];
  const shades = activeFamily && activeTone
    ? VIBGYOR[activeFamily].tones[activeTone] ?? []
    : [];

  const handleFamily = (f) => {
    if (activeFamily === f) { setActiveFamily(null); setActiveTone(null); return; }
    setActiveFamily(f);
    setActiveTone(null);
  };

  const handleTone = (t) => {
    setActiveTone(prev => prev === t ? null : t);
  };

  const toneGradient = (family, tone) => {
    const arr = VIBGYOR[family]?.tones[tone] ?? [];
    if (!arr.length) return '#888';
    return `linear-gradient(135deg, ${arr[0].hex}, ${arr[arr.length - 1].hex})`;
  };

  return (
    <div className={`vibgyor-picker ${compact ? 'compact' : ''}`}>
      {/* LEVEL 1 – Family */}
      <div className="vp-level vp-families">
        {families.map(f => (
          <button
            key={f}
            className={`vp-family-btn ${activeFamily === f ? 'active' : ''}`}
            onClick={() => handleFamily(f)}
            title={f}
          >
            <span
              className="vp-family-orb"
              style={{ backgroundColor: VIBGYOR[f].baseHex }}
            />
            <span className="vp-family-label">{VIBGYOR[f].icon} {f}</span>
          </button>
        ))}
      </div>

      {/* LEVEL 2 – Tone */}
      {activeFamily && (
        <div className="vp-level vp-tones">
          <span className="vp-level-hint">Select tone:</span>
          <div className="vp-tone-pills">
            {tones.map(t => (
              <button
                key={t}
                className={`vp-tone-pill ${activeTone === t ? 'active' : ''}`}
                onClick={() => handleTone(t)}
                style={{ '--tone-gradient': toneGradient(activeFamily, t) }}
              >
                <span className="vp-tone-swatch" />
                <span>{t}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 3 – Shades */}
      {shades.length > 0 && (
        <div className="vp-shades-panel">
          <div className="vp-shades-grid">
            {shades.map((shade, idx) => {
              // Determine text contrast
              const isDark = shade.hex === '#FFFFFF' || shade.hex.startsWith('#FFF') || shade.hex.startsWith('#EEE') || shade.hex.startsWith('#FEF') || shade.hex.startsWith('#FAF');
              return (
                <div
                  key={idx}
                  className={`vp-shade-card ${selectedColor?.hex === shade.hex ? 'selected' : ''}`}
                  onClick={() => onSelect(shade)}
                  title={shade.name}
                >
                  <div className="vp-shade-circle" style={{ backgroundColor: shade.hex }}>
                    {selectedColor?.hex === shade.hex && (
                      <span className="vp-check" style={{ color: isDark ? '#333' : '#fff' }}>✓</span>
                    )}
                  </div>
                  <span className="vp-shade-name">{shade.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected swatch preview */}
      {selectedColor && (
        <div className="vp-selected-preview">
          <div className="vp-selected-swatch" style={{ backgroundColor: selectedColor.hex }}>
            <div className="silk-shine" />
          </div>
          <div className="vp-selected-meta">
            <span className="vp-selected-badge">Selected</span>
            <span className="vp-selected-name" style={{ color: selectedColor.hex === '#FFFFFF' ? '#aaa' : selectedColor.hex }}>
              {selectedColor.name}
            </span>
          </div>
        </div>
      )}

      {/* Placeholder when nothing selected */}
      {!activeFamily && !selectedColor && (
        <div className="vp-placeholder">
          <span>✦</span>
          <p>Pick a color family above to explore shades</p>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────
const SareeTypeSelection = () => {
  const navigate = useNavigate();

  const [selectedSareeType, setSelectedSareeType]   = useState('');
  const [activeSareeCategory, setActiveSareeCategory] = useState('traditional');
  const [selectedSareeColor, setSelectedSareeColor] = useState(null);

  const [hasBorder, setHasBorder]                   = useState(null);
  const [selectedBorderType, setSelectedBorderType] = useState('');
  const [selectedBorderColor, setSelectedBorderColor] = useState(null);

  const [selectedBlouseColor, setSelectedBlouseColor] = useState(null);
  const [selectedFrontNeck, setSelectedFrontNeck]   = useState('');
  const [selectedBackNeck, setSelectedBackNeck]     = useState('');
  const [selectedHandDesign, setSelectedHandDesign] = useState('');

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection]     = useState('forward');

  const effectiveSteps = BASE_STEPS.filter(s => !(s.id === 4 && hasBorder !== true));
  const totalSteps = effectiveSteps.length;
  const currentStepIndex = effectiveSteps.findIndex(s => s.id === currentStep);
  const progressPct = ((currentStepIndex + 1) / totalSteps) * 100;

  const stepValid = () => {
    switch (currentStep) {
      case 1: return !!selectedSareeType;
      case 2: return !!selectedSareeColor;
      case 3: return hasBorder !== null;
      case 4: return !!selectedBorderType && !!selectedBorderColor;
      case 5: return !!selectedBlouseColor && !!selectedFrontNeck && !!selectedBackNeck && !!selectedHandDesign;
      default: return false;
    }
  };

  const goNext = () => {
    if (!stepValid()) return;
    const nextIdx = currentStepIndex + 1;
    if (nextIdx < totalSteps) { setDirection('forward'); setCurrentStep(effectiveSteps[nextIdx].id); }
  };

  const goBack = () => {
    const prevIdx = currentStepIndex - 1;
    if (prevIdx >= 0) { setDirection('back'); setCurrentStep(effectiveSteps[prevIdx].id); }
  };

  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFormValid =
    selectedSareeType && selectedSareeColor && hasBorder !== null &&
    (!hasBorder || (selectedBorderType && selectedBorderColor)) &&
    selectedBlouseColor && selectedFrontNeck && selectedBackNeck && selectedHandDesign;

  const handleCreateSaree = () => {
    if (isFormValid) {
      navigate('/saree/preview', {
        state: {
          sareeType: selectedSareeType, sareeColor: selectedSareeColor,
          hasBorder,
          borderType: hasBorder ? selectedBorderType : null,
          borderColor: hasBorder ? selectedBorderColor : null,
          blouseColor: selectedBlouseColor,
          frontNeck: selectedFrontNeck, backNeck: selectedBackNeck, handDesign: selectedHandDesign
        }
      });
    }
  };

  return (
    <div className="saree-type-selection-container">

      {/* Header */}
      <div className="selection-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-button">← Back to Home</button>
          <div className="header-content fade-in">
            <h1 className="page-title">Personalize Your Saree</h1>
            <p className="page-subtitle">Complete your dream design in a few simple steps</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="wizard-progress-wrapper">
        <div className="wizard-progress-bar-track">
          <div className="wizard-progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="wizard-steps-list">
          {effectiveSteps.map((s, idx) => {
            const done   = idx < currentStepIndex;
            const active = s.id === currentStep;
            return (
              <div key={s.id} className={`wizard-step-dot ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                <div className="wizard-dot-circle">{done ? '✓' : idx + 1}</div>
                <span className="wizard-dot-label">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="selection-content">
        <div className="container">
          <div key={currentStep} className={`wizard-step-panel ${direction === 'forward' ? 'slide-in-right' : 'slide-in-left'}`}>

            {/* ── STEP 1: Saree Style ── */}
            {currentStep === 1 && (
              <section className="selection-section">
                <div className="section-header">
                  <h2 className="section-title">Step 1: Saree Style</h2>
                  <p className="section-description">Pick the fabric &amp; occasion that suits you</p>
                </div>
                <div className="category-tabs">
                  {Object.keys(sareeTypes).map(cat => (
                    <button key={cat} className={`category-tab ${activeSareeCategory === cat ? 'active' : ''}`} onClick={() => setActiveSareeCategory(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="selection-grid compact">
                  {sareeTypes[activeSareeCategory].map((type, i) => (
                    <div key={i} className={`selection-card compact ${selectedSareeType === type ? 'selected' : ''}`} onClick={() => setSelectedSareeType(type)}>
                      <span className="card-text">{type}</span>
                    </div>
                  ))}
                </div>
                {!selectedSareeType && <p className="step-hint">👆 Select a saree style to continue</p>}
              </section>
            )}

            {/* ── STEP 2: Saree Color ── */}
            {currentStep === 2 && (
              <section className="selection-section">
                <div className="section-header">
                  <h2 className="section-title">Step 2: Choose Your Color</h2>
                  <p className="section-description">Explore the full VIBGYOR spectrum — from pastel to dark</p>
                </div>
                <VibgyorPicker selectedColor={selectedSareeColor} onSelect={setSelectedSareeColor} />
                {!selectedSareeColor && <p className="step-hint">🎨 Pick a shade to continue</p>}
              </section>
            )}

            {/* ── STEP 3: Border Preference ── */}
            {currentStep === 3 && (
              <section className="selection-section">
                <div className="section-header">
                  <h2 className="section-title">Step 3: Border Preference</h2>
                  <p className="section-description">Choose if you want a distinct border</p>
                </div>
                <div className="border-selection-grid">
                  <div className={`border-option-card ${hasBorder === true ? 'selected' : ''}`} onClick={() => setHasBorder(true)}>
                    <div className="border-option-icon">✨</div>
                    <h3>With Border</h3>
                  </div>
                  <div className={`border-option-card ${hasBorder === false ? 'selected' : ''}`} onClick={() => setHasBorder(false)}>
                    <div className="border-option-icon">🌫️</div>
                    <h3>Without Border</h3>
                  </div>
                </div>
                {hasBorder === null && <p className="step-hint">✨ Choose border preference to continue</p>}
              </section>
            )}

            {/* ── STEP 4: Border Customization ── */}
            {currentStep === 4 && hasBorder === true && (
              <section className="selection-section border-details-box">
                <div className="section-header">
                  <h2 className="section-title">Step 4: Border Customization</h2>
                  <p className="section-description">Choose your border type &amp; color</p>
                </div>
                <div className="detail-sub-section">
                  <h3 className="category-label">Border Type</h3>
                  <div className="selection-grid compact">
                    {borderTypes.map((type, i) => (
                      <div key={i} className={`selection-card compact ${selectedBorderType === type ? 'selected' : ''}`} onClick={() => setSelectedBorderType(type)}>
                        <span className="card-text">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="detail-sub-section" style={{ marginTop: '2rem' }}>
                  <h3 className="category-label">Border Color</h3>
                  <VibgyorPicker compact selectedColor={selectedBorderColor} onSelect={setSelectedBorderColor} />
                </div>
                {(!selectedBorderType || !selectedBorderColor) && <p className="step-hint">💎 Complete border type &amp; color to continue</p>}
              </section>
            )}

            {/* ── STEP 5: Blouse Designing ── */}
            {currentStep === 5 && (
              <section className="selection-section blouse-customization-box">
                <div className="section-header">
                  <h2 className="section-title">Final Step: Blouse Designing</h2>
                  <p className="section-description">Customize the perfect blouse for your saree</p>
                </div>

                <div className="detail-sub-section">
                  <h3 className="category-label">1. Blouse Color</h3>
                  <VibgyorPicker compact selectedColor={selectedBlouseColor} onSelect={setSelectedBlouseColor} />
                </div>

                <div className="blouse-design-grid" style={{ marginTop: '2.5rem' }}>
                  <div className="design-block">
                    <h3 className="category-label">2. Front Neck Design</h3>
                    <div className="selection-grid compact">
                      {blouseTypes.frontNeck.slice(0, 8).map((type, i) => (
                        <div key={i} className={`selection-card compact ${selectedFrontNeck === type ? 'selected' : ''}`} onClick={() => setSelectedFrontNeck(type)}>
                          <span className="card-text">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="design-block">
                    <h3 className="category-label">3. Back Neck Design</h3>
                    <div className="selection-grid compact">
                      {blouseTypes.backNeck.slice(0, 8).map((type, i) => (
                        <div key={i} className={`selection-card compact ${selectedBackNeck === type ? 'selected' : ''}`} onClick={() => setSelectedBackNeck(type)}>
                          <span className="card-text">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="design-block">
                    <h3 className="category-label">4. Sleeve Design</h3>
                    <div className="selection-grid compact">
                      {handDesigns.map((type, i) => (
                        <div key={i} className={`selection-card compact ${selectedHandDesign === type ? 'selected' : ''}`} onClick={() => setSelectedHandDesign(type)}>
                          <span className="card-text">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {(!selectedBlouseColor || !selectedFrontNeck || !selectedBackNeck || !selectedHandDesign) && (
                  <p className="step-hint">👗 Complete all blouse details to visualize</p>
                )}
              </section>
            )}
          </div>

          {/* Navigation */}
          <div className="wizard-nav-row">
            <button
              className="wizard-back-btn"
              onClick={goBack}
              style={{ visibility: currentStepIndex === 0 ? 'hidden' : 'visible' }}
            >
              ← Back
            </button>

            {isLastStep ? (
              <button
                className={`create-button ${isFormValid ? 'enabled' : 'disabled'}`}
                onClick={handleCreateSaree}
                disabled={!isFormValid}
              >
                {isFormValid ? 'Visualize My Design →' : 'Please complete all selections'}
              </button>
            ) : (
              <button
                className={`wizard-next-btn ${stepValid() ? 'active' : ''}`}
                onClick={goNext}
                disabled={!stepValid()}
              >
                Next Step →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeTypeSelection;
