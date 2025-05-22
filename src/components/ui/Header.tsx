'use client';
import { RootState } from "@/store"
import { toggleSidebar } from "@/store/slices/uiSlice";
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";

export default function Header() {

    const { isSidebarOpen } = useSelector((state: RootState) => state.ui);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    return(
        <header 
            className="flex w-full h-16 items-center justify-between p-4"
            style={{
                borderRadius: '15px',
                marginTop: '10px',
                marginBottom: '10px',
            }}
        >
            <button 
                onClick={() => dispatch(toggleSidebar())}
                className="flex items-center justify-center"
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',  
                }}
            >
                {
                    isSidebarOpen ? (
                        <Image 
                            src="/close.svg" 
                            alt="menu" 
                            width={30} 
                            height={30}  
                        />
                    ) : (
                        <Image 
                            src="/menu.svg" 
                            alt="menu" 
                            width={30} 
                            height={30} 
                        />
                    )
                }
            </button>
            <div 
                className="flex items-center justify-center"
                style={{
                    color: '#e0e0e081',
                    gap: '10px',
                }}
            >
                <p 
                    className="flex items-center justify-center"
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#5472E4',
                        gap: '5px',
                    }}
                >
                    <span 
                    style={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                    }}>Welcome</span> 
                    {user?.name}
                </p>
                <Image 
                    src="/user.svg" 
                    alt="user" 
                    width={30} 
                    height={30} 
                    style={{
                        borderRadius: '50%',
                        marginRight: '10px',
                        padding: '5px',
                        border: '3px solid #e0e0e081',
                    }}
                />
                
            </div>
        </header>
    )
}

