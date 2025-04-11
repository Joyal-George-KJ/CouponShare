import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { useSelector } from "react-redux";
import CouponCard from "../components/CouponCard";
import AppwriteConfig from "../constants/AppwriteConf";
import { useNavigate } from "react-router-dom";
import CouponLoader from "../components/CouponLoader";

const Profile = () => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        sharedCoupons: 15,
        revenueGenerated: 120.5,
        savedCoupons: 25,
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    
    const config = new AppwriteConfig(
        import.meta.env.VITE_APPWRITE_REDIRECT_URL,
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    );
    
    const handleClick = async () => {
        let res = await config.updateUser(user.$id, profile?.name, profile.bio);
        setEditMode(!editMode);
    }
    useEffect(() => {
        function fetchProfile() {
            const profileData = user;
            if (profileData) {
                setProfile((prev) => ({
                    ...prev,
                    ...profileData,
                }));
            } else {
                navigate("/401");
            }
        }

        (async () => {
            const res = await config.getCoupons("uid", user.id);
            if (res.documents) {
                setCoupons(res.documents);
                setLoading(false);
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        })();

        fetchProfile();
    }, []);

    return (
        <div className="bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white">
            <div className="flex items-center gap-4">
                <Avatar pic={profile?.avatar ? profile.avatar : profile.name} />
                <div className="flex-1">
                    {editMode ? (
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="p-2 bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white rounded-md w-full"
                        />
                    ) : (
                        <h2 className="laptop:text-2xl font-bold mobile:text-lg">
                            {profile.name}
                        </h2>
                    )}
                    {/* <p className="text-neutral-400 ">{profile.email}</p> */}
                    <div>
                        {editMode ? (
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                className="w-full p-2 mt-4 bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white rounded-md"
                            />
                        ) : (
                            <p className="text-neutral-700 dark:text-neutral-300">{profile.bio}</p>
                        )}
                    </div>
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium"
                    onClick={() => {editMode ? handleClick() : setEditMode(!editMode)}}
                >
                    {editMode ? "Save" : "Edit"}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-neutral-300 dark:bg-neutral-700 p-4 rounded-lg text-center">
                    <h3 className="text-lg mobile:text-base font-bold">
                        Shared Coupons
                    </h3>
                    <p className="text-2xl mobile:text-lg font-semibold">
                        {profile.sharedCoupons}
                    </p>
                </div>
                <div className="bg-neutral-300 dark:bg-neutral-700 p-4 rounded-lg text-center">
                    <h3 className="text-lg mobile:text-base font-bold">
                        Revenue Generated
                    </h3>
                    <p className="text-2xl mobile:text-lg font-semibold">
                        ₹{profile.revenueGenerated.toFixed(2)}
                    </p>
                </div>
                <div className="bg-neutral-300 dark:bg-neutral-700 p-4 rounded-lg text-center col-span-2">
                    <h3 className="text-lg mobile:text-base font-bold">
                        Saved Coupons
                    </h3>
                    <p className="text-2xl mobile:text-lg font-semibold">
                        {profile.savedCoupons}
                    </p>
                </div>
            </div>
            <div className="grid laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-4 mt-4">
                {loading
                    ? [...Array(6).keys()].map((val, ind) => (
                          <CouponLoader key={ind} />
                      ))
                    : coupons.map((val, ind) => (
                          <CouponCard key={ind} {...val} />
                      ))}
            </div>
        </div>
    );
};

export default Profile;
