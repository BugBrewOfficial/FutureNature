import Head from "next/head";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - FutureNature</title>
        <meta
          name="description"
          content="Learn about FutureNature and our beekeeping practices"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Navbar />

        {/* Hero Banner */}
        <div
          style={{
            maxWidth: "100%",
            margin: "40px auto 60px",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
              borderRadius: "360px",
              padding: "30px 50px",
              display: "flex",
              alignItems: "center",
              gap: "50px",
              boxShadow: "0 8px 24px rgba(245, 158, 11, 0.25)",
              position: "relative",
              overflow: "hidden",
              maxWidth: "1200px",
              margin: "40px auto 60px",
            }}
          >
            {/* Left Circle Image */}
            <div
              style={{
                flex: "0 0 220px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "320px",
                  height: "320px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  border: "10px solid #fbbf24",
                }}
              >
                <Image
                  src="/Assets/About us.png"
                  alt="Honey jar with bees"
                  width={196}
                  height={196}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Right Text */}
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: "138px",
                  fontWeight: "900",
                  color: "white",
                  margin: "0",
                  lineHeight: "1",
                  letterSpacing: "3px",
                  textAlign: "center",
                }}
              >
                ALL
              </h1>
              <h2
                style={{
                  fontSize: "60px",
                  fontWeight: "900",
                  color: "#000",
                  margin: "8px 0 0 0",
                  lineHeight: "1",
                  letterSpacing: "2px",
                  textAlign: "center",
                }}
              >
                ABOUT US
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto 60px",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
            }}
          >
            {/* Section 1: Beekeeper Info */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "350px 1fr",
                gap: "40px",
                alignItems: "flex-start",
              }}
            >
              {/* Left Section - Beekeeper Image */}
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src="/Assets/About us.png"
                  alt="Beekeeper Vidhya Sri"
                  width={350}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Right Section - Beekeeper Info */}
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#fbbf24",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  MEET THE BEEKEEPER BEHIND FUTURE NATURE
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4b5563",
                    lineHeight: "1.8",
                    margin: 0,
                  }}
                >
                  Hi, I'm Vidhya sri, the passionate beekeeper behind future
                  nature. My journey into beekeeping started with a deep
                  appreciation for nature and a curiosity about the incredible
                  world of bees. What began as a small venture soon turned into
                  a lifelong passion, caring for bees, harvesting pure honey,
                  and promoting sustainability.
                </p>
              </div>
            </div>

            {/* Section 2: Bookkeeping Practices and Certificate */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                alignItems: "flex-start",
              }}
            >
              {/* Left - Bookkeeping Practices */}
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fbbf24",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  OUR BOOKKEEPING PRACTICES:
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#4b5563",
                    lineHeight: "1.8",
                    margin: 0,
                  }}
                >
                  At FUTURE NATURE, we believe that healthy bees create the
                  finest honey. That's why we follow ethical, sustainable
                  beekeeping practices to ensure the well-being of our bees
                  while delivering 100% pure, raw honey to you.
                </p>
              </div>

              {/* Right - Certificate Section */}
              <div>
                <div
                  style={{
                    backgroundColor: "#fbbf24",
                    borderRadius: "360px",
                    padding: "50px 40px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                    minHeight: "200px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "52px",
                      fontWeight: "700",
                      color: "#8b5a00",
                      fontStyle: "italic",
                      fontFamily: "serif",
                      marginBottom: "16px",
                    }}
                  >
                    fssai
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#000",
                      letterSpacing: "2px",
                      fontFamily: "monospace",
                    }}
                  >
                    22424445000161
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
