'use client';
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import Image from "next/image"
import { openModal } from "@/store/slices/modalSlice"
import { logout } from "@/store/slices/authSlice"

export default function Sidebar() {
    const dispatch = useDispatch();
    const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

    const handleLogoutClick = () => {
        dispatch(openModal({
            title: "Confirm Logout",
            message: "Are you sure you want to logout?",
            onConfirm: () => dispatch(logout())
        }));
    };

    return(
        <aside 
            className="flex h-full min-h-screen flex-col items-center justify-between gap-4 overflow-y-auto  p-4 transition-all duration-300 py-4"
            style={{
                width: !isSidebarOpen ? '260px' : '70px',
            }}
        >
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Link 
                    href="/dashboard"
                    style={{
                        width: '95%',
                        border: '1px solid #e0e0e081',
                        borderRadius: '10px',
                        marginTop: '10px',
                    }}
                    className="flex items-center justify-center"
                >
                    <Image
                        src="/logo.svg" 
                        alt="logo" 
                        width={ !isSidebarOpen ? 70 : 60 } 
                        height={ !isSidebarOpen ? 70 : 60 }
                    />
                </Link>
                <section
                    style={{
                        width: '95%',
                        border: '1px solid #e0e0e081',
                        borderRadius: '10px',
                        marginTop: '10px',
                    }}
                    className="h-[calc(100vh-200px)] "
                >
                    <Link
                        href={"/my-images"}
                        className="flex items-center justify-around gap-4"
                        >
                        <Image
                            src="/images.svg"
                            alt="images"
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
                            Images
                        </p>
                    </Link>
                    <Link
                        href={"/dashboard"}
                        className="flex items-center justify-around gap-4"
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
                    <button
                        className="flex items-center justify-around gap-4"
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
                </section>
            </div>
        </aside>
    )
}

