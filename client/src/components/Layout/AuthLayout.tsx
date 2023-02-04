import { FC, ReactNode } from "react"
import { Box, Container } from '@mui/system'
import { Typography } from "@material-tailwind/react"

type Props = {
    children: ReactNode
}

export const AuthLayout: FC<Props> = ({ children }) => {
    return (
        <div>
    <Container component="main" maxWidth="xs">
        <Box 
        sx={{
            marginTop:6,
            display:"flex",
            alignItems: "center",
            flexDirection:"column"
        }}> 
        <Typography variant="h2" className="mb-6">
            家計簿アプリ
        </Typography>
            {children}
        </Box>
    </Container>
    </div>
    )
}
