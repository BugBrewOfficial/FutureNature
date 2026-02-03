import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Banner.module.scss";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "Fresh Harvest",
      title: "Forest Honey",
      tamilTitle: "மலை தேன்",
      description: "100% Raw & Unprocessed.",
      weight: "250gms",
      price: "₹1500",
      image: "/Assets/Products/1.png"
    }
  ];

  const totalSlides = 1;
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerCard}>

        {/* --- Background Pattern --- */}
        <div className={styles.bgPattern}></div>

        {/* --- NAVIGATION ARROWS --- */}
        <button onClick={prevSlide} className={`${styles.navArrow} ${styles.prev}`} aria-label="Previous Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <button onClick={nextSlide} className={`${styles.navArrow} ${styles.next}`} aria-label="Next Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div className={styles.bannerContent}>

          {/* --- LEFT: Text Content --- */}
          <div className={styles.textCol}>
            <div className={styles.tagRow}>
              <span className={styles.badge}>{slides[0].tag}</span>
            </div>

            <h1 className={styles.title}>
              {slides[0].title}
              <span className={styles.tamil}> / {slides[0].tamilTitle}</span>
            </h1>

            <p className={styles.desc}>{slides[0].description}</p>

            <div className={styles.priceRow}>
              <span className={styles.price}>{slides[0].price}</span>
              <span className={styles.divider}>|</span>
              <span className={styles.weight}>{slides[0].weight}</span>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.shopBtn}>Add to Cart</button>
            </div>
          </div>

          {/* --- RIGHT: Image with Organic Shape --- */}
          <div className={styles.imageCol}>
            <div className={styles.imageStack}>
              <div className={styles.organicBlob}></div>

              <div className={styles.imgContainer}>
                <Image
                  src={slides[0].image}
                  alt={slides[0].title}
                  width={280}
                  height={320}
                  className={styles.productImg}
                  priority
                />
              </div>

              <div className={styles.discountPill}>-10%</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}