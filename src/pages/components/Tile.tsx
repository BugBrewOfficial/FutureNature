import Image from "next/image";
import React from "react";

const Tile = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        gridAutoRows: "minmax(200px, auto)",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
        }}
      >
        <Image
          src="/Assets/Tile/T1.jpg"
          alt="Honey Product"
          width={400}
          height={280}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "20px", width: "100%" }}>
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(0, 0, 0, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 0, 0, 0.12)";
            }}
          >
            <Image
              src="/Assets/Tile/T2.jpg"
              alt="Honey Product"
              width={400}
              height={280}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(0, 0, 0, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 0, 0, 0.12)";
            }}
          >
            <Image
              src="/Assets/Tile/T3.jpg"
              alt="Honey Product"
              width={400}
              height={280}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
          }}
        >
          <Image
            src="/Assets/Tile/T3.jpg"
            alt="Honey Product"
            width={400}
            height={480}
            style={{
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
          }}
        >
          <Image
            src="/Assets/Tile/T6.jpg"
            alt="Honey Product"
            width={400}
            height={280}
            style={{
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
          }}
        >
          <Image
            src="/Assets/Tile/T4.jpg"
            alt="Honey Product"
            width={400}
            height={390}
            style={{
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tile;
