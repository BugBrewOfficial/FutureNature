import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { productApi } from "@/api/productApi";
import { isAdminUser } from "@/utils/authUtils";
import Cookies from "js-cookie";

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productNameE: "",
    productNameT: "",
    descriptionE: "",
    descriptionT: "",
    price: "",
    salePrice: "",
    discountPercentage: "",
    availableQuantity: "",
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Admin Verification
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token || !isAdminUser(token)) {
      toast.error("Unauthorized access");
      router.push("/");
    }
  }, [router]);

  // Auto-calculate discount percentage
  useEffect(() => {
    const price = parseFloat(formData.price);
    const salePrice = parseFloat(formData.salePrice);

    if (price > 0 && salePrice > 0 && salePrice < price) {
      const discount = ((price - salePrice) / price) * 100;
      setFormData((prev) => ({
        ...prev,
        discountPercentage: discount.toFixed(2),
      }));
    } else if (salePrice >= price || !salePrice) {
      setFormData((prev) => ({
        ...prev,
        discountPercentage: "",
      }));
    }
  }, [formData.price, formData.salePrice]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const img = event.target.result as string;
            newImages.push(img);
            if (!mainImage) setMainImage(img);
            if (newImages.length === files.length) {
              setUploadedImages((prev) => [...prev, ...newImages].slice(0, 3));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    if (mainImage === uploadedImages[index]) {
      setMainImage(newImages[0] || "");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.productNameE.trim())
      return "Product Name (English) is required";
    if (!formData.productNameT.trim())
      return "Product Name (Tamil) is required";
    if (!formData.descriptionE.trim())
      return "Description (English) is required";
    if (!formData.descriptionT.trim()) return "Description (Tamil) is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      return "Valid Price is required";
    if (uploadedImages.length === 0)
      return "At least one product image is required";
    if (!formData.availableQuantity || parseInt(formData.availableQuantity) < 0)
      return "Valid Quantity is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      // Construct payload matching backend schema
      const payload = {
        productName: formData.productNameE,
        productNameTamil: formData.productNameT,
        description: formData.descriptionE,
        descriptionTamil: formData.descriptionT,
        price: formData.price,
        discountedType: "percentage", // Defaulting to percentage based on UI logic
        discountedAmount: formData.discountPercentage || "0",
        imageUrl: uploadedImages,
        availableQuantity: formData.availableQuantity,
        variants: [], // Sending empty variants as per current UI
      };

      const response = await productApi.addProduct(payload);
      if (response.data.status) {
        toast.success("Product added successfully!");
        setTimeout(() => {
          router.push("/products"); // Or back to admin panel
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    color: "#374151",
    backgroundColor: "white",
  };

  const noSpinnerStyle = {
    ...inputStyle,
    MozAppearance: "textfield" as const,
    WebkitAppearance: "none" as const,
    appearance: "none" as const,
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <Toaster />
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <button
              onClick={() => router.back()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                cursor: "pointer",
                padding: "0",
              }}
            >
              <span style={{ fontSize: "20px" }}>←</span> Products
            </button>
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                marginTop: "4px",
                marginLeft: "28px",
              }}
            >
              Add a New Product
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => router.back()}
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                backgroundColor: "white",
                color: "#374151",
                border: "2px solid #e5e7eb",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                backgroundColor: "#fbbf24",
                color: "#111827",
                border: "none",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.5px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#000";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fbbf24";
                e.currentTarget.style.color = "#111827";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Save Product
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* Left Column - Form */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* General Information */}
            <div
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "20px",
                }}
              >
                General Information
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Product Name (E)
                  </label>
                  <input
                    type="text"
                    name="productNameE"
                    value={formData.productNameE}
                    onChange={handleInputChange}
                    placeholder="Product name in English"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Product Name (T)
                  </label>
                  <input
                    type="text"
                    name="productNameT"
                    value={formData.productNameT}
                    onChange={handleInputChange}
                    placeholder="Product name in Tamil"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Description (E)
                  </label>
                  <textarea
                    name="descriptionE"
                    value={formData.descriptionE}
                    onChange={handleInputChange}
                    placeholder="Description in English"
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Description (T)
                  </label>
                  <textarea
                    name="descriptionT"
                    value={formData.descriptionT}
                    onChange={handleInputChange}
                    placeholder="Description in Tamil"
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "20px",
                }}
              >
                Pricing & Inventory
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="100"
                    step="0.01"
                    style={noSpinnerStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Sale Price
                  </label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    placeholder="90"
                    step="0.01"
                    style={noSpinnerStyle}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Discount Percentage
                  </label>
                  <input
                    type="text"
                    name="discountPercentage"
                    value={
                      formData.discountPercentage
                        ? `${formData.discountPercentage}%`
                        : ""
                    }
                    readOnly
                    placeholder="10.00%"
                    style={{
                      ...noSpinnerStyle,
                      backgroundColor: "#f9fafb",
                      cursor: "not-allowed",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    name="availableQuantity"
                    value={formData.availableQuantity}
                    onChange={handleInputChange}
                    placeholder="e.g 100"
                    min="0"
                    style={noSpinnerStyle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "20px",
                }}
              >
                Upload Product Images (0-3)
              </h2>

              {/* Main Image Display */}
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt="Product"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "#9ca3af" }}>
                    <div style={{ fontSize: "48px", marginBottom: "8px" }}>
                      📷
                    </div>
                    <p style={{ fontSize: "14px" }}>Upload main image</p>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                {uploadedImages.map((img, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      height: "80px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "6px",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: mainImage === img ? "2px solid #fbbf24" : "none",
                    }}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {Array.from({
                  length: Math.max(0, 3 - uploadedImages.length),
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    style={{
                      width: "100%",
                      height: "80px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "6px",
                      border: "2px dashed #d1d5db",
                    }}
                  />
                ))}
              </div>

              {/* Upload Button */}
              <label
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "#fbbf24",
                  color: "#111827",
                  textAlign: "center",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "700",
                  transition: "all 0.2s",
                  letterSpacing: "0.5px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fbbf24";
                  e.currentTarget.style.color = "#111827";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Choose Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "8px",
                  textAlign: "center",
                }}
              >
                You can upload up to 3 images (Click on thumbnail to set as
                main)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
