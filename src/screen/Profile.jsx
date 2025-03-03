import { useState } from "react";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        avatar: "https://via.placeholder.com/100",
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Passionate deal hunter and coupon sharer!",
        sharedCoupons: 15,
        revenueGenerated: 120.50,
        savedCoupons: 25,
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <div className=" bg-neutral-800 rounded-lg shadow-lg text-white">
            <div className="flex items-center gap-4">
                <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-neutral-500"
                />
                <div className="flex-1">
                    {editMode ? (
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="p-2 bg-neutral-700 text-white rounded-md w-full"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                    )}
                    <p className="text-neutral-400">{profile.email}</p>
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-medium"
                    onClick={() => setEditMode(!editMode)}
                >
                    {editMode ? "Save" : "Edit"}
                </button>
            </div>
            <div className="mt-4">
                {editMode ? (
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="w-full p-2 bg-neutral-700 text-white rounded-md"
                    />
                ) : (
                    <p className="text-neutral-300">{profile.bio}</p>
                )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-neutral-700 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">Shared Coupons</h3>
                    <p className="text-2xl font-semibold">{profile.sharedCoupons}</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">Revenue Generated</h3>
                    <p className="text-2xl font-semibold">₹{profile.revenueGenerated.toFixed(2)}</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg text-center col-span-2">
                    <h3 className="text-lg font-bold">Saved Coupons</h3>
                    <p className="text-2xl font-semibold">{profile.savedCoupons}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
