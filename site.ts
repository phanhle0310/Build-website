import { Bed, Coffee, DoorClosed, Leaf, Moon, VolumeX } from "lucide-react";

export const images = {
  hero: "https://images.unsplash.com/photo-1685602729695-0664ea4e5c06?auto=format&fit=crop&w=1800&q=85",
  cafe: "https://images.unsplash.com/photo-1565650839149-2c48a094196c?auto=format&fit=crop&w=1200&q=85",
  pods: "https://images.unsplash.com/photo-1621871305450-7d9a2c6e6149?auto=format&fit=crop&w=1000&q=85",
  sleep:
    "https://images.unsplash.com/photo-1539606420556-14c457c45507?auto=format&fit=crop&w=1000&q=85",
  detail:
    "https://images.unsplash.com/photo-1649767860304-b48ebb297499?auto=format&fit=crop&w=1000&q=85",
  about:
    "https://images.unsplash.com/photo-1633073490205-27c0ad419a84?auto=format&fit=crop&w=1400&q=85",
  cup: "https://images.unsplash.com/photo-1597628312449-a5cf4e90556e?auto=format&fit=crop&w=900&q=85",
};

export const spaces = [
  {
    title: "Study Café",
    label: "Open seating",
    description: "A calm, softly social room for reading, writing, and unhurried work.",
    price: "From $8 / 2 hours",
    image: images.cafe,
    icon: Coffee,
  },
  {
    title: "Quiet Study Pods",
    label: "4 private pods",
    description: "Acoustically softened spaces for deep work, calls, and focused sessions.",
    price: "From $12 / hour",
    image: images.pods,
    icon: DoorClosed,
  },
  {
    title: "Sleep Boxes",
    label: "8 private boxes",
    description: "A restorative pause with a proper mattress, dimmable light, and fresh linen.",
    price: "From $16 / hour",
    image: images.sleep,
    icon: Bed,
  },
];

export const principles = [
  {
    icon: VolumeX,
    title: "Quiet by design",
    text: "Sound-zoned rooms and considerate house rituals.",
  },
  {
    icon: Leaf,
    title: "Naturally grounded",
    text: "Warm timber, soft light, plants, and tactile materials.",
  },
  {
    icon: Moon,
    title: "Rest is productive",
    text: "Space to pause is part of doing your best work.",
  },
];

export const menuGroups = [
  {
    title: "Coffee",
    note: "Small-batch beans, roasted locally",
    items: [
      ["Kissaten pour-over", "Single origin, hand poured", "$6"],
      ["Brown sugar latte", "Espresso, milk, Okinawa sugar", "$6.5"],
      ["Black sesame latte", "Sesame, espresso, steamed milk", "$7"],
      ["Cold brew", "Slow steeped for 18 hours", "$5.5"],
    ],
  },
  {
    title: "Tea & tonic",
    note: "Japanese leaves and seasonal botanicals",
    items: [
      ["Ceremonial matcha", "Uji matcha, whisked to order", "$7"],
      ["Hojicha cloud", "Roasted tea, oat foam", "$6.5"],
      ["Yuzu sencha tonic", "Sencha, yuzu, sparkling water", "$6"],
      ["Genmaicha pot", "Green tea with toasted rice", "$5.5"],
    ],
  },
  {
    title: "Small plates",
    note: "Simple nourishment for long sessions",
    items: [
      ["Miso egg sando", "Milk bread, jammy egg, white miso", "$10"],
      ["Onigiri pair", "Salmon shio and ume shiso", "$9"],
      ["Sesame banana toast", "Shokupan, tahini, honey", "$8"],
      ["Seasonal wagashi", "Ask about today’s confection", "$5"],
    ],
  },
];
