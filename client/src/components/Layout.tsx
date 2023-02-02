import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <main className="flex flex-1 flex-col justify-center p-4">
                {children}
            </main>
        </div>
    )
}
