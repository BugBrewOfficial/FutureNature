import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ViewProduct from "./components/ViewProduct";
import { useCart } from "./components/CartContext";

interface Product {
  id: number;
  name: string;
  nameTamil: string;
  image: string;
  rating: number;
  weight: string;
  price: number;
  originalPrice: number;
  description: string;
  descriptionTamil: string;
  benefits: string[];
  benefitsTamil: string[];
  isBestSeller?: boolean;
  discount?: number;
}

export default function Products() {
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});

  const products: Product[] = [
    {
      id: 1,
      name: "Wild Honey",
      nameTamil: "காட்டு தேன்",
      image: "/Assets/Products/15.png",
      rating: 4.7,
      weight: "Half kg",
      price: 850,
      originalPrice: 1050,
      discount: 19,
      description: "Pure wild honey collected from deep forests.",
      descriptionTamil: "ஆழ்ந்த காடுகளிலிருந்து சேகரிக்கப்பட்ட தூய காட்டு தேன்.",
      benefits: [
        "Unprocessed and natural.",
        "High enzyme content."
      ],
      benefitsTamil: [
        "செயலாக்கப்படாத மற்றும் இயற்கை.",
        "அதிக நொதி உள்ளடக்கம்."
      ]
    },
    {
      id: 2,
      name: "Honey Comb",
      nameTamil: "தேன் கூடு",
      image: "/Assets/Products/18.png",
      rating: 5.0,
      weight: "Half kg",
      price: 900,
      originalPrice: 1000,
      isBestSeller: true,
      discount: 20,
      description: "Our Pure Honey Comb is nature's sweetest gift, untouched, unprocessed, and straight from the hive. Every golden cell is filled with raw, pure honey, crafted by hardworking bees on blooming flowers.",
      descriptionTamil: "எங்கள் தூய தேன் கூடு இயற்கையின் இனிமையான பரிசு, தொடப்படாமல், செயலாக்கப்படாமல், நேரடியாக கூட்டிலிருந்து.",
      benefits: [
        "Bite into it and feel the crisp comb burst with liquid gold.",
        "A taste so natural, it feels like sunshine melting on your tongue."
      ],
      benefitsTamil: [
        "அதை கடித்து மொறுமொறுப்பான தேன் கூடு திரவ தங்கத்துடன் வெடிப்பதை உணருங்கள்.",
        "மிகவும் இயற்கையான சுவை, உங்கள் நாவில் சூரிய ஒளி உருகுவது போல் உணர்கிறது."
      ]
    },
    {
      id: 3,
      name: "Moringa Honey",
      nameTamil: "முருங்கை தேன்",
      image: "/Assets/Products/11.png",
      rating: 4.8,
      weight: "Half kg",
      price: 500,
      originalPrice: 850,
      discount: 24,
      description: "💛 From our moringa farms to your home — pure, natural, and filled with love. We don't add any flavor or mix anything. Our bees collect nectar from moringa flowers, and we carefully take the honey comb straight from the hive — just as nature gives it.",
      descriptionTamil: "💛 எங்கள் முருங்கை பண்ணைகளிலிருந்து உங்கள் வீட்டிற்கு — தூய, இயற்கை மற்றும் அன்பால் நிரப்பப்பட்டது.",
      benefits: [
        "Best for kids to consume.",
        "Pure and unprocessed, straight from the hive."
      ],
      benefitsTamil: [
        "குழந்தைகள் உட்கொள்ள சிறந்தது.",
        "தூய மற்றும் செயலாக்கப்படாத, கூட்டிலிருந்து நேரடியாக."
      ]
    },
    {
      id: 4,
      name: "Panner Rose Gulkhand",
      nameTamil: "பன்னீர் ரோஸ் குல்கந்த்",
      image: "/Assets/Products/3.png",
      rating: 4.2,
      weight: "250 gms",
      price: 400,
      originalPrice: 600,
      description: "Gulkand has powerful cooling properties, making it an excellent remedy for excess body heat. Known to improve digestion and soothe the digestive tract.",
      descriptionTamil: "குல்கந்திற்கு சக்திவாய்ந்த குளிர்ச்சி பண்புகள் உள்ளன, அதிகப்படியான உடல் வெப்பத்திற்கு சிறந்த தீர்வு.",
      benefits: [
        "Powerful cooling properties for excess body heat.",
        "May help in regulating menstrual cycles and alleviating menstrual pain."
      ],
      benefitsTamil: [
        "அதிகப்படியான உடல் வெப்பத்திற்கு சக்திவாய்ந்த குளிர்ச்சி பண்புகள்.",
        "மாதவிடாய் சுழற்சியை ஒழுங்குபடுத்த மற்றும் வலியைக் குறைக்க உதவும்."
      ]
    },
    {
      id: 5,
      name: "தேன் அத்தி",
      nameTamil: "Honey Fig",
      image: "/Assets/Products/8.png",
      rating: 4.6,
      weight: "250 gms",
      price: 300,
      originalPrice: 700,
      isBestSeller: true,
      discount: 21,
      description: "Good for mens to increase sperm count. Figs are a good source of calcium, and when combined with honey, fig honey may support bone health by contributing to calcium and magnesium intake.",
      descriptionTamil: "விந்தணு எண்ணிக்கையை அதிகரிக்க ஆண்களுக்கு நல்லது. அத்தி கால்சியத்தின் நல்ல மூலம்.",
      benefits: [
        "Good for mens to increase sperm count.",
        "Supports bone health with calcium and magnesium."
      ],
      benefitsTamil: [
        "விந்தணு எண்ணிக்கையை அதிகரிக்க ஆண்களுக்கு நல்லது.",
        "கால்சியம் மற்றும் மெக்னீசியத்துடன் எலும்பு ஆரோக்கியத்தை ஆதரிக்கிறது."
      ]
    },
    {
      id: 6,
      name: "Cavity Honey",
      nameTamil: "அடுக்கு தேன்",
      image: "/Assets/Products/2.png",
      rating: 4.9,
      weight: "Half kg",
      price: 450,
      originalPrice: 1300,
      isBestSeller: true,
      discount: 23,
      description: "Cavity honey is typically harvested directly from the wild with minimal human intervention. The flavor of cavity honey is influenced by the local flora where the bees forage.",
      descriptionTamil: "அடுக்கு தேன் பொதுவாக குறைந்தபட்ச மனித தலையீட்டுடன் காட்டிலிருந்து நேரடியாக அறுவடை செய்யப்படுகிறது.",
      benefits: [
        "Harvested directly from the wild with minimal intervention.",
        "Richer, more complex taste compared to farmed honey."
      ],
      benefitsTamil: [
        "குறைந்தபட்ச தலையீட்டுடன் காட்டிலிருந்து நேரடியாக அறுவடை.",
        "பண்ணை தேனுடன் ஒப்பிடும்போது பணக்காரமான, சிக்கலான சுவை."
      ]
    },
    {
      id: 7,
      name: "Country Cow Ghee",
      nameTamil: "நாட்டுமாடு நெய்",
      image: "/Assets/Products/7.png",
      rating: 5.0,
      weight: "Half litre",
      price: 600,
      originalPrice: 1500,
      isBestSeller: true,
      discount: 20,
      description: "This ghee is very much homemade and hand picked. 😊 Our country cow ghee is packed with healthy fats like Omega-3, supporting heart health and boosting immunity with essential vitamins (A, D, E, K).",
      descriptionTamil: "இந்த நெய் மிகவும் வீட்டில் தயாரிக்கப்பட்டது மற்றும் கையால் தேர்ந்தெடுக்கப்பட்டது. 😊",
      benefits: [
        "Aids digestion, improves skin health, and provides long-lasting energy.",
        "High smoke point, perfect for cooking without harmful compounds."
      ],
      benefitsTamil: [
        "செரிமானத்திற்கு உதவுகிறது, தோல் ஆரோக்கியத்தை மேம்படுத்துகிறது.",
        "அதிக புகை புள்ளி, தீங்கு விளைவிக்கும் சேர்மங்கள் இல்லாமல் சமைக்க சரியானது."
      ]
    },
    {
      id: 8,
      name: "Cavity Honey",
      nameTamil: "அடுக்குத் தேன் (முக்கால் கிலோ)",
      image: "/Assets/Products/10.png",
      rating: 4.9,
      weight: "750 grams",
      price: 650,
      originalPrice: 1800,
      discount: 22,
      description: "Cavity honey is typically harvested directly from the wild with minimal human intervention. The flavor of cavity honey is influenced by the local flora where the bees forage.",
      descriptionTamil: "அடுக்கு தேன் பொதுவாக குறைந்தபட்ச மனித தலையீட்டுடன் காட்டிலிருந்து நேரடியாக அறுவடை செய்யப்படுகிறது.",
      benefits: [
        "Harvested directly from the wild with minimal intervention.",
        "Richer, more complex taste compared to farmed honey."
      ],
      benefitsTamil: [
        "குறைந்தபட்ச தலையீட்டுடன் காட்டிலிருந்து நேரடியாக அறுவடை.",
        "பண்ணை தேனுடன் ஒப்பிடும்போது பணக்காரமான, சிக்கலான சுவை."
      ]
    },
    {
      id: 9,
      name: "Moringa Honey",
      nameTamil: "முருங்கை தேன் (முக்கால் கிலோ)",
      image: "/Assets/Products/13.png",
      rating: 4.8,
      weight: "750 grams",
      price: 750,
      originalPrice: 1200,
      discount: 21,
      description: "💛 From our moringa farms to your home — pure, natural, and filled with love. We don't add any flavor or mix anything. Our bees collect nectar from moringa flowers, and we carefully take the honey comb straight from the hive — just as nature gives it.",
      descriptionTamil: "💛 எங்கள் முருங்கை பண்ணைகளிலிருந்து உங்கள் வீட்டிற்கு — தூய, இயற்கை மற்றும் அன்பால் நிரப்பப்பட்டது.",
      benefits: [
        "Best for kids to consume.",
        "Pure and unprocessed, straight from the hive."
      ],
      benefitsTamil: [
        "குழந்தைகள் உட்கொள்ள சிறந்தது.",
        "தூய மற்றும் செயலாக்கப்படாத, கூட்டிலிருந்து நேரடியாக."
      ]
    },
    {
      id: 10,
      name: "Dryfruits with Honey (7 in 1)",
      nameTamil: "தேனில் உலர் பழங்கள் (7 in 1)",
      image: "/Assets/Products/16.png",
      rating: 4.7,
      weight: "Half kg",
      price: 500,
      originalPrice: 1900,
      isBestSeller: true,
      discount: 21,
      description: "We soak 6 types of dryfruits such as Badam, pista, black dry grapes, dates, figs, cashew nut soaked with pure and unprocessed honey.",
      descriptionTamil: "பாதாம், பிஸ்தா, கருப்பு உலர் திராட்சை, பேரீச்சம், அத்தி, முந்திரி போன்ற 6 வகை உலர் பழங்களை தூய மற்றும் செயலாக்கப்படாத தேனில் ஊறவைக்கிறோம்.",
      benefits: [
        "Helps weak bodies become stronger.",
        "Helps reduce extra fat naturally, keeping you healthy and fit."
      ],
      benefitsTamil: [
        "பலவீனமான உடல்கள் வலுவடைய உதவுகிறது.",
        "கூடுதல் கொழுப்பை இயற்கையாக குறைக்க உதவுகிறது."
      ]
    },
    {
      id: 11,
      name: "Forest Honey",
      nameTamil: "மலைத்தேன்",
      image: "/Assets/Products/4.png",
      rating: 5.0,
      weight: "Half kg",
      price: 900,
      originalPrice: 1100,
      isBestSeller: true,
      discount: 18,
      description: "The Gift from Nature's Heart. Deep inside the untouched forests, where wildflowers bloom freely and the air is pure, our bees collect nectar to create this golden treasure — Forest Honey.",
      descriptionTamil: "இயற்கையின் இதயத்திலிருந்து பரிசு. தொடப்படாத காடுகளின் ஆழத்தில், காட்டு பூக்கள் சுதந்திரமாக பூக்கும்.",
      benefits: [
        "Pure, unprocessed, and rich in natural nutrients.",
        "Boosts immunity, strengthens the body, and keeps you energetic."
      ],
      benefitsTamil: [
        "தூய, செயலாக்கப்படாத மற்றும் இயற்கை ஊட்டச்சத்துக்கள் நிறைந்தது.",
        "நோய் எதிர்ப்பு சக்தியை அதிகரிக்கிறது, உடலை வலுப்படுத்துகிறது."
      ]
    },
    {
      id: 12,
      name: "Forest Honey",
      nameTamil: "மலைத்தேன் (750 கிராம்)",
      image: "/Assets/Products/15.png",
      rating: 5.0,
      weight: "750 grams",
      price: 1350,
      originalPrice: 1600,
      discount: 19,
      description: "The Gift from Nature's Heart. Deep inside the untouched forests, where wildflowers bloom freely and the air is pure, our bees collect nectar to create this golden treasure — Forest Honey.",
      descriptionTamil: "இயற்கையின் இதயத்திலிருந்து பரிசு. தொடப்படாத காடுகளின் ஆழத்தில், காட்டு பூக்கள் சுதந்திரமாக பூக்கும்.",
      benefits: [
        "Pure, unprocessed, and rich in natural nutrients.",
        "Boosts immunity, strengthens the body, and keeps you energetic."
      ],
      benefitsTamil: [
        "தூய, செயலாக்கப்படாத மற்றும் இயற்கை ஊட்டச்சத்துக்கள் நிறைந்தது.",
        "நோய் எதிர்ப்பு சக்தியை அதிகரிக்கிறது, உடலை வலுப்படுத்துகிறது."
      ]
    },
    {
      id: 13,
      name: "Moringa Atta",
      nameTamil: "முருங்கை மாவு",
      image: "/Assets/Products/9.png",
      rating: 4.4,
      weight: "250 gms",
      price: 70,
      originalPrice: 350,
      description: "Moringa Atta is a nutrient-dense flour made from finely ground moringa leaves, known for their exceptional health benefits.",
      descriptionTamil: "முருங்கை அட்டா என்பது மிகச்சிறந்த ஆரோக்கிய நன்மைகளுக்கு பெயர் பெற்ற நுண்ணிய அரைக்கப்பட்ட முருங்கை இலைகளிலிருந்து தயாரிக்கப்பட்ட ஊட்டச்சத்து நிறைந்த மாவு.",
      benefits: [
        "Rich in protein, vitamins, minerals, and antioxidants.",
        "Can be easily incorporated into chapatis, poori and various recipes."
      ],
      benefitsTamil: [
        "புரதம், வைட்டமின்கள், தாதுக்கள் மற்றும் ஆக்ஸிஜனேற்றிகள் நிறைந்தது.",
        "சப்பாத்தி, பூரி மற்றும் பல்வேறு சமையல் குறிப்புகளில் எளிதாக சேர்க்கலாம்."
      ]
    },
    {
      id: 14,
      name: "Stingless Bee Honey",
      nameTamil: "கொடுக்கு இல்லாத தேனீ தேன்",
      image: "/Assets/Products/1.png",
      rating: 4.9,
      weight: "250 gms",
      price: 2500,
      originalPrice: 2200,
      isBestSeller: true,
      discount: 18,
      description: "குழந்தைகளுக்கு குடுக்கும் அறிய வகை தேன். சளி இருமல் போக்கும் தன்மை கொண்டது. வருடத்திற்கு அரை கிலோ மட்டும் கிடைப்பதால் இதன் விலை அதிகம். மிகுந்த மருத்துவ குணம் கொண்டது.",
      descriptionTamil: "Rare honey for children. Has properties to relieve cold and cough. Only half kg available per year, so the price is high.",
      benefits: [
        "Rare honey variety for children.",
        "Has sour taste and high medicinal value."
      ],
      benefitsTamil: [
        "குழந்தைகளுக்கான அரிய வகை தேன்.",
        "புளிப்பு சுவை மற்றும் அதிக மருத்துவ மதிப்பு கொண்டது."
      ]
    },
    {
      id: 15,
      name: "Stingless Bee Honey",
      nameTamil: "கொடுக்கு இல்லாத தேனீ தேன் (50 கிராம்)",
      image: "/Assets/Products/1.png",
      rating: 4.9,
      weight: "50 gms",
      price: 500,
      originalPrice: 500,
      discount: 20,
      description: "குழந்தைகளுக்கு குடுக்கும் அறிய வகை தேன். சளி இருமல் போக்கும் தன்மை கொண்டது. வருடத்திற்கு அரை கிலோ மட்டும் கிடைப்பதால் இதன் விலை அதிகம். குழந்தைகளுக்கு பெயர் சூட்டும் விழாவில் குடுக்கலாம். மிகுந்த மருத்துவ குணம் கொண்டது.",
      descriptionTamil: "Rare honey for children. Can be given at naming ceremonies. Has properties to relieve cold and cough.",
      benefits: [
        "Perfect for naming ceremony gifts.",
        "Has sour taste and high medicinal value."
      ],
      benefitsTamil: [
        "பெயர் சூட்டும் விழா பரிசுகளுக்கு சரியானது.",
        "புளிப்பு சுவை மற்றும் அதிக மருத்துவ மதிப்பு கொண்டது."
      ]
    },
    {
      id: 16,
      name: "உளுந்து உருண்டை",
      nameTamil: "Ulundhu Urundai",
      image: "/Assets/Products/17.png",
      rating: 4.5,
      weight: "Half kg",
      price: 400,
      originalPrice: 450,
      isBestSeller: true,
      discount: 22,
      description: "The Sweet Taste of Grandma's Love. Our Urad Dhal Laddu carries that same warmth and wisdom — made with hand-roasted urad dal, pure jaggery, and golden ghee, just like she made with her gentle hands.",
      descriptionTamil: "பாட்டியின் அன்பின் இனிமையான சுவை. எங்கள் உளுந்து லட்டு அதே அரவணைப்பு மற்றும் ஞானத்தை கொண்டு வருகிறது.",
      benefits: [
        "Made with hand-roasted urad dal, pure jaggery, and golden ghee.",
        "Carries the warmth and tradition of grandmother's recipe."
      ],
      benefitsTamil: [
        "கையால் வறுத்த உளுந்து, தூய வெல்லம் மற்றும் தங்க நெய்யுடன் தயாரிக்கப்படுகிறது.",
        "பாட்டியின் சமையல் முறையின் அரவணைப்பு மற்றும் பாரம்பரியத்தை கொண்டுள்ளது."
      ]
    }
    
  ];

  const handleQuantityChange = (productId: number, change: number) => {
    const currentQty = quantities[productId] || 1;
    const newQty = currentQty + change;
    
    if (newQty === 0) {
      setQuantities(prev => ({
        ...prev,
        [productId]: 1
      }));
      updateQuantity(productId, 0);
    } else {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQty
      }));
      updateQuantity(productId, newQty);
    }
  };

  const handleAddToCart = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
    addToCart(productId, 1);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: '#d1d5db', fontSize: '16px' }}>★</span>
      );
    }

    return stars;
  };

  return (
    <>
      {selectedProduct ? (
        <ViewProduct 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          allProducts={products}
          onProductClick={(productId) => {
            const product = products.find(p => p.id === productId);
            if (product) setSelectedProduct(product);
          }}
        />
      ) : (
        <>
          <Head>
            <title>Products - FutureNature</title>
            <meta name="description" content="Browse our natural honey products" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />

        {/* Hero Section */}
        <div style={{
          backgroundImage: 'url(/Assets/product.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          padding: '160px 84px',
          marginTop: '0px',
          marginBottom: '80px',
          width: '100%',
          height: '600px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Left Content */}
            <div style={{ maxWidth: '700px' }}>
              <h1 style={{
                fontSize: '64px',
                fontWeight: '900',
                color: 'white',
                margin: '0',
                lineHeight: '1.1',
                textShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                letterSpacing: '2px'
              }}>
                RAW HONEY &<br />HAND CRAFTED
              </h1>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px 80px'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#f59e0b',
              marginBottom: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              OUR PRODUCTS
            </h2>
          </div>

          {/* Products Grid */}
          <div className="products-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedProduct(product)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Product Image */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '320px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={320}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>

                {/* Product Details */}
                <div style={{
                  padding: '24px'
                }}>
                  {/* Product Name */}
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {product.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {product.nameTamil}
                    </p>
                  </div>

                  {/* Rating and Weight */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {renderStars(product.rating)}
                      <span style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginLeft: '4px'
                      }}>
                        {product.rating}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      {product.weight}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      ₹ {product.price}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>
                      ₹ {product.originalPrice}
                    </div>
                  </div>

                  {/* Add to Cart Button / Quantity Controls */}
                  {!cart.find(item => item.id === product.id) ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f59e0b';
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(product.id, -1);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '14px 24px',
                          fontSize: '20px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          color: '#374151',
                          transition: 'all 0.2s',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        −
                      </button>
                      <div style={{
                        backgroundColor: '#d1d5db',
                        padding: '14px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                        minWidth: '80px',
                        textAlign: 'center',
                        flex: 1
                      }}>
                        {quantities[product.id] || 1}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(product.id, 1);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '14px 24px',
                          fontSize: '20px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          color: '#374151',
                          transition: 'all 0.2s',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
        </>
      )}
    </>
  );
}
