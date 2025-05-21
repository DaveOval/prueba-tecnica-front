import { RootState } from "@/store"
export default function Header() {
    return(
        <header 
            className="flex w-full h-16 items-center justify-between p-4"
            style={{
                border: '1px solid #e0e0e081',
                borderRadius: '15px',
            }}
        >
            <h1>Header</h1>
        </header>
    )
}

