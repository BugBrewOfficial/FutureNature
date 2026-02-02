import { useState, useEffect } from "react";
import CustomInputError from "./CustomInputError";
import { AddressData } from "../api/addressApi";

interface AddressFormProps {
    initialData?: AddressData;
    onSubmit: (data: AddressData) => Promise<void>;
    onCancel: () => void;
}

export default function AddressForm({ initialData, onSubmit, onCancel }: AddressFormProps) {
    const [formData, setFormData] = useState<AddressData>({
        address1: "",
        address2: "",
        address3: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        mobileNumber: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.address1.trim()) newErrors.address1 = "Address Line 1 is required";
        if (!formData.address2.trim()) newErrors.address2 = "Address Line 2 is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.district.trim()) newErrors.district = "District is required";
        if (!formData.state.trim()) newErrors.state = "State is required";

        if (!formData.pincode) {
            newErrors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Invalid 6-digit Pincode";
        }

        if (!formData.mobileNumber) {
            newErrors.mobileNumber = "Mobile Number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\s/g, ""))) {
            newErrors.mobileNumber = "Invalid 10-digit Indian mobile number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = (error?: string) => ({
        width: "100%",
        padding: "10px 12px",
        borderRadius: "6px",
        border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
        outline: "none",
        fontSize: "14px",
    });

    const labelStyle = {
        display: "block",
        fontSize: "14px",
        fontWeight: 500,
        marginBottom: "8px",
        color: "#374151"
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Flat/House No/Building</label>
                    <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        style={inputStyle(errors.address1)}
                        placeholder="e.g. Flat 101, Galaxy Apts"
                    />
                    <CustomInputError message={errors.address1} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Street/Area/Colony</label>
                    <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        style={inputStyle(errors.address2)}
                        placeholder="e.g. MG Road, Indiranagar"
                    />
                    <CustomInputError message={errors.address2} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Landmark (Optional)</label>
                <input
                    type="text"
                    name="address3"
                    value={formData.address3}
                    onChange={handleChange}
                    style={inputStyle()}
                    placeholder="e.g. Near Metro Station"
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        style={inputStyle(errors.city)}
                    />
                    <CustomInputError message={errors.city} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>District</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        style={inputStyle(errors.district)}
                    />
                    <CustomInputError message={errors.district} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        style={inputStyle(errors.state)}
                    />
                    <CustomInputError message={errors.state} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        style={inputStyle(errors.pincode)}
                    />
                    <CustomInputError message={errors.pincode} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Mobile Number</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        maxLength={10}
                        style={inputStyle(errors.mobileNumber)}
                    />
                    <CustomInputError message={errors.mobileNumber} />
                </div>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        backgroundColor: "white",
                        color: "#374151",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: '14px'
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#fbbf24",
                        color: "#000",
                        fontWeight: 700,
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        opacity: isSubmitting ? 0.7 : 1,
                        fontSize: '14px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = '#000';
                            e.currentTarget.style.color = '#fff';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = '#fbbf24';
                            e.currentTarget.style.color = '#000';
                        }
                    }}
                >
                    {isSubmitting ? "Saving..." : (initialData?.id ? "Update Address" : "Save Address")}
                </button>
            </div>
        </form>
    );
}
