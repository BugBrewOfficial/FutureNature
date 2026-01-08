import Head from "next/head";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useRef } from "react";

export default function Blog() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const products = [
    {
      id: 1,
      name: "GINGER HONEY",
      description:
        "This blend is perfect for soothing sore throats, improving digestion, and warming the body, especially during chilly mornings or after meals. The bold combination of ginger and raw honey provides an energizing start to the day, making it an ideal choice for anyone seeking a natural boost.",
      image: "/Assets/Tile/T1.jpg",
      position: "right",
    },
    {
      id: 2,
      name: "GULKAND",
      description:
        "A gentle fusion of rose petal preserve and raw natural honey products. Gulkand naturally cools the system and supports digestion. You can enjoy it in many ways – add it to desserts, stir it into warm water, or savor it as a calming evening ritual. As a bonus, its floral sweetness promotes a sense of tranquility.",
      image: "/Assets/Tile/T2.jpg",
      position: "left",
    },
    {
      id: 3,
      name: "CAVITY HONEY",
      description:
        "This product goes beyond being just a sweetener. In fact, it supports oral hygiene through selected ingredients, making it a perfect choice for pulling or even daily use. Moreover, by promoting gum health and helping prevent tooth decay, it actively contributes to maintaining a healthy mouth with its gentle yet effective properties.",
      image: "/Assets/Tile/T3.jpg",
      position: "right",
    },
    {
      id: 4,
      name: "LEMON HONEY",
      description:
        "Combining the freshness of lemon with the richness of raw honey, this blend is perfect for boosting immunity and providing natural energy. Great for adding to warm water in the morning or mixing with herbal teas for a citrus twist.",
      image: "/Assets/Tile/T4.jpg",
      position: "left",
    },
    {
      id: 5,
      name: "TURMERIC HONEY",
      description:
        "Known for its anti-inflammatory properties, turmeric honey is perfect for joint health and overall wellness. A perfect natural remedy for daily use and supporting your body's natural defense system.",
      image: "/Assets/Tile/T5.jpg",
      position: "right",
    },
    {
      id: 6,
      name: "BLACK SEED HONEY",
      description:
        "Enriched with black seeds, this honey blend supports respiratory health and boosts immunity. Perfect for those seeking powerful natural wellness support with traditional herbs.",
      image: "/Assets/Tile/T6.jpg",
      position: "left",
    },
    {
      id: 7,
      name: "CINNAMON HONEY",
      description:
        "Warm and aromatic, cinnamon honey helps with blood sugar balance and adds a delightful spice to your daily wellness routine. Ideal for morning beverages or natural energy boosting.",
      image: "/Assets/Tile/T1.jpg",
      position: "right",
    },
    {
      id: 8,
      name: "ASHWAGANDHA HONEY",
      description:
        "A powerful adaptogenic blend that helps manage stress and promotes mental clarity. Perfect for evening routines or whenever you need natural balance and calm.",
      image: "/Assets/Tile/T2.jpg",
      position: "left",
    },
    {
      id: 9,
      name: "BASIL HONEY",
      description:
        "Holy basil infused honey promotes respiratory health and supports digestion. A sacred blend for holistic wellness and natural vitality.",
      image: "/Assets/Tile/T3.jpg",
      position: "right",
    },
    {
      id: 10,
      name: "MULTIFLORAL HONEY",
      description:
        "A blend of multiple flower nectars, this honey offers diverse nutritional benefits. Perfect for those who want comprehensive wellness support from nature's bounty.",
      image: "/Assets/Tile/T4.jpg",
      position: "left",
    },
    {
      id: 11,
      name: "EUCALYPTUS HONEY",
      description:
        "Perfect for respiratory support and clear breathing. This soothing blend is ideal for seasonal wellness and maintaining healthy airways naturally.",
      image: "/Assets/Tile/T5.jpg",
      position: "right",
    },
    {
      id: 12,
      name: "HIBISCUS HONEY",
      description:
        "Vibrant and energizing, hibiscus honey supports heart health and provides natural antioxidants. A delicious way to care for your cardiovascular wellness.",
      image: "/Assets/Tile/T6.jpg",
      position: "left",
    },
    {
      id: 13,
      name: "APPLE CIDER HONEY",
      description:
        "Combining apple cider vinegar with raw honey, this blend supports digestion and detoxification. A powerful wellness tonic for daily use.",
      image: "/Assets/Tile/T1.jpg",
      position: "right",
    },
    {
      id: 14,
      name: "BRAHMI HONEY",
      description:
        "An ancient herb combined with honey for enhanced cognitive function and mental clarity. Perfect for students and professionals seeking natural mental support.",
      image: "/Assets/Tile/T2.jpg",
      position: "left",
    },
    {
      id: 15,
      name: "SAFFRON HONEY",
      description:
        "A luxurious blend infused with the finest saffron threads. Known for promoting skin health, improving mood, and providing premium wellness support.",
      image: "/Assets/Tile/T3.jpg",
      position: "right",
    },
    {
      id: 16,
      name: "FLORAL BLEND",
      description:
        "A premium selection of the finest floral honeys combined for ultimate wellness benefits. Perfect for those seeking the best of nature's offerings.",
      image: "/Assets/Tile/T4.jpg",
      position: "left",
    },
  ];

  return (
    <>
      <Head>
        <title>Blog - FutureNature</title>
        <meta
          name="description"
          content="Learn about natural honey and wellness"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <Navbar />

        {/* Hero Section */}
        <div
          style={{
            backgroundImage: "url(/Assets/blog.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            overflow: "hidden",
            padding: "160px 24px",
            marginBottom: "0",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "300px",
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: "600px" }}>
              <h1
                style={{
                  fontSize: "42px",
                  fontWeight: "900",
                  color: "#78350f",
                  margin: "0",
                  lineHeight: "1.3",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                FUTURE NATURE'S
                <br />
                MISSION IS CUSTOMERS
                <br />
                HEALTH AND BEAUTY
              </h1>
            </div>

            {/* Right Image - Honey Jars */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            ></div>
          </div>
        </div>

        {/* Content Section 1 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "80px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#fbbf24",
                marginBottom: "30px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              HONEY & HERBS: NATURE'S REMEDY FOR EVERYDAY WELLNESS
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#374151",
                lineHeight: "1.8",
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              In today's fast-paced world, reconnecting with nature's rhythms
              brings a sense of deep healing. More people are embracing simple,
              natural ways to care for both body and mind. Natural Honey
              Products and herbal medicine offer a timeless approach to wellness
              that starts right in your kitchen.
            </p>
          </div>
        </div>

        {/* Timeline Products Section */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "80px 24px",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* Top Arrow Button */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({
                    top: -300,
                    behavior: "smooth",
                  });
                }
              }}
              className="blog-scroll-button"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: "0",
                zIndex: 10,
                backgroundColor: "rgba(251, 191, 36, 0.8)",
                color: "#fff",
                border: "none",
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(251, 191, 36, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(251, 191, 36, 0.8)";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>

            {/* Bottom Arrow Button */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({
                    top: 300,
                    behavior: "smooth",
                  });
                }
              }}
              className="blog-scroll-button"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "0",
                zIndex: 10,
                backgroundColor: "rgba(251, 191, 36, 0.8)",
                color: "#fff",
                border: "none",
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(251, 191, 36, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(251, 191, 36, 0.8)";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Vertical Scrollable Products */}
            <div
              ref={scrollContainerRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                overflowY: "auto",
                overflowX: "hidden",
                height: "600px",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "y mandatory",
                position: "relative",
                zIndex: 1,
                paddingLeft: "60px",
                paddingRight: "60px",
                scrollbarWidth: "thin",
                scrollbarColor: "#fbbf24 transparent",
              }}
            >
              {products.map((product, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={product.id}
                    style={{
                      flex: "0 0 100%",
                      minHeight: "100%",
                      display: "flex",
                      gap: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: isLeft ? "row" : "row-reverse",
                      scrollSnapAlign: "center",
                      position: "relative",
                      padding: "40px 0",
                    }}
                  >
                    {/* Image Side */}
                    <div
                      style={{
                        flex: "0 0 40%",
                        display: "flex",
                        justifyContent: isLeft ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "280px",
                          height: "280px",
                          borderRadius: "20px",
                          overflow: "hidden",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                          backgroundColor: "#f3f4f6",
                          clipPath:
                            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={280}
                          height={280}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>

                    {/* Center Vertical Line - moves with scroll */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "0",
                        bottom: "0",
                        width: "4px",
                        backgroundColor: "#fbbf24",
                        transform: "translateX(-50%)",
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    ></div>

                    {/* Center Circle */}
                    <div
                      style={{
                        flex: "0 0 auto",
                        width: "70px",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src="/Assets/Svg/Bloghoneys.svg"
                        alt="Honey Icon"
                        width={70}
                        height={70}
                        style={{
                          width: "70px",
                          height: "70px",
                        }}
                      />
                    </div>

                    {/* Text Side */}
                    <div
                      style={{
                        flex: "0 0 40%",
                        textAlign: isLeft ? "left" : "right",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: "700",
                          color: "#fbbf24",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          margin: "0 0 12px 0",
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#4b5563",
                          lineHeight: "1.7",
                          margin: 0,
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Section 2 */}
        <div
          style={{
            backgroundColor: "#fafaf8",
            padding: "80px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#fbbf24",
                marginBottom: "30px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              HONEY PRODUCTS FROM THE NATURE: NATURE'S SWEETEST REMEDIES
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#374151",
                lineHeight: "1.8",
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              Bringing nature into your daily self-care routine doesn't have to
              be complicated. At Future Nature, we offer a handcrafted
              collection of Natural honey products infused with carefully chosen
              herbs. Each one is designed to support your well-being from the
              inside out. Below, you'll find some of our most-loved honey blends
              and the powerful benefits they provide.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
