'use client';
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import Image from "next/image"
import { openModal } from "@/store/slices/modalSlice"
import { logout } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "sonner";

export default function Sidebar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

    const handleLogoutClick = () => {
        dispatch(openModal({
            title: "Confirm Logout",
            message: "Are you sure you want to logout?",
            onConfirm: () => {
                dispatch(logout());
                router.push('/auth/login');
                toast.success("Logged out successfully");
            }
        }));
    };

    return(
        <aside 
            className="flex h-full min-h-screen flex-col items-center justify-between gap-4 overflow-y-auto  p-4 transition-all duration-300 py-4"
            style={{
                width: !isSidebarOpen ? '200px' : '70px',
            }}
        >
            <div className="flex flex-col items-center justify-center gap-4 w-full ">
                <Link 
                    href="/dashboard"
                    style={{
                        width: '95%',
                        border: '1px solid #27272A',
                        borderRadius: '10px',
                        marginTop: '10px',
                    }}
                    className="flex items-center justify-center container_color"
                >
                    <Image
                        src="/logo.svg" 
                        alt="logo" 
                        width={ !isSidebarOpen ? 50 : 40 } 
                        height={ !isSidebarOpen ? 50 : 40 }
                    />
                </Link>
                <section
                    style={{
                        width: '95%',
                        border: '1px solid #27272A',
                        borderRadius: '10px',
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        height: 'calc(100vh - 200px)',
                    }}
                    className="container_color"
                >
                    <div
                        style={{
                            marginTop: '20px',
                            width: '90%',
                            height: '96%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <Link
                                href={"/my-images"}
                                className="flex items-center justify-around p-2 rounded-lg transition-all duration-300 hover:bg-[#27272A] hover:scale-105"
                            >
                                <Image
                                    src="/images.svg"
                                    alt="images"
                                    width={ 40 }
                                    height={ 40 }
                                    className="transition-all  duration-300"
                                />
                                <p 
                                    style={{
                                        color: '#ededee',
                                        fontWeight: 'bold',
                                        textDecoration: 'none !important',
                                        textUnderlineOffset: 'none',
                                        display: !isSidebarOpen ? 'block' : 'none',
                                    }}
                                >
                                    Images
                                </p>
                            </Link>
                            <Link
                                href={"/dashboard"}
                                className="flex items-center justify-around p-2 rounded-lg transition-all duration-300 hover:bg-[#27272A] hover:scale-105"
                            >
                                <Image
                                    src="/upload.svg"
                                    alt="upload"
                                    width={ 40 }
                                    height={ 40 }
                                    className="transition-all duration-300"
                                />
                                <p 
                                    style={{
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        textDecoration: 'none !important',
                                        textUnderlineOffset: 'none',
                                        display: !isSidebarOpen ? 'block' : 'none',
                                    }}
                                >
                                    Upload
                                </p>
                            </Link>
                        </div>
                        <button
                            className="flex items-center justify-around mt-auto mb-4 p-2 rounded-lg transition-all duration-300 hover:bg-[#27272A] hover:scale-105"
                            style={{
                                width: '100%',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={handleLogoutClick}
                        >
                            <Image 
                                src="/logout.svg"
                                alt="logout"
                                width={ 40 }
                                height={ 40 }
                                className="transition-all duration-300"
                            />
                            <p 
                                style={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    textDecoration: 'none !important',
                                    textUnderlineOffset: 'none',
                                    display: !isSidebarOpen ? 'block' : 'none',
                                }}
                            >
                                Logout
                            </p>
                        </button>
                    </div>
                </section>
            </div>
        </aside>
    )
}

