import { AddressData } from "../api/addressApi";

interface AddressListProps {
    addresses: AddressData[];
    onEdit: (address: AddressData) => void;
    onDelete: (id: string) => void;
    onAddNew: () => void;
    onSelect?: (address: AddressData) => void;
    selectedId?: string;
}

export default function AddressList({ addresses, onEdit, onDelete, onAddNew, onSelect, selectedId }: AddressListProps) {
    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {/* Add New Card */}
                <div
                    onClick={onAddNew}
                    style={{
                        border: "2px dashed #d1d5db",
                        borderRadius: "12px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        minHeight: "220px",
                        backgroundColor: "#f9fafb",
                        transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = "#fbbf24";
                        e.currentTarget.style.backgroundColor = "#fffbeb";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                >
                    <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "#f3f4f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "12px",
                        color: "#9ca3af",
                        fontSize: "24px"
                    }}>
                        +
                    </div>
                    <span style={{ fontWeight: 600, color: "#4b5563", fontSize: "16px" }}>Add New Address</span>
                </div>

                {/* Address Cards */}
                {addresses.map((addr) => {
                    const isSelected = selectedId === addr.id;
                    return (
                        <div
                            key={addr.id}
                            style={{
                                border: isSelected ? "2px solid #fbbf24" : "1px solid #e5e7eb",
                                borderRadius: "12px",
                                padding: "24px",
                                backgroundColor: isSelected ? "#fffbeb" : "white",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '220px',
                                position: 'relative',
                                transition: 'all 0.2s'
                            }}
                        >
                            {isSelected && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    color: '#b45309',
                                    backgroundColor: '#fcd34d',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                }}>
                                    ✓
                                </div>
                            )}

                            <div style={{ marginBottom: "15px" }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{
                                        backgroundColor: '#f3f4f6',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#4b5563',
                                        textTransform: 'uppercase'
                                    }}>
                                        Home
                                    </span>
                                </div>
                                <p style={{ fontWeight: 700, marginBottom: "4px", color: "#111827", fontSize: '16px' }}>
                                    {addr.address1} {addr.address2}
                                </p>
                                {addr.address3 && <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "2px" }}>{addr.address3}</p>}
                                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                                    {addr.city}, {addr.district}
                                </p>
                                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                                    {addr.state} - {addr.pincode}
                                </p>
                                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px", display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontWeight: 500, color: "#374151" }}>Phone:</span> {addr.mobileNumber}
                                </p>
                            </div>

                            <div style={{ marginTop: "auto", display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {onSelect && (
                                    <button
                                        onClick={() => onSelect(addr)}
                                        style={{
                                            width: '100%',
                                            padding: "10px",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            border: "none",
                                            backgroundColor: isSelected ? "#fbbf24" : "#1f2937",
                                            color: isSelected ? "#000" : "#fff",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            marginBottom: '6px'
                                        }}
                                    >
                                        {isSelected ? "Selected" : "Deliver Here"}
                                    </button>
                                )}

                                <div style={{
                                    display: "flex",
                                    gap: "12px",
                                    borderTop: "1px solid #e5e7eb", // slightly darker for visibility on yellow bg
                                    paddingTop: "12px",
                                }}>
                                    <button
                                        onClick={() => onEdit(addr)}
                                        style={{
                                            flex: 1,
                                            padding: "8px 16px",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            border: "1px solid #d1d5db",
                                            backgroundColor: "white",
                                            color: "#374151",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => addr.id && onDelete(addr.id)}
                                        style={{
                                            flex: 1,
                                            padding: "8px 16px",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            border: "1px solid #fee2e2",
                                            backgroundColor: "#fef2f2",
                                            color: "#ef4444",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
