import { Typography, useTheme} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
const serverUrl = process.env.REACT_APP_SERVER_URL;
    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img
            width="100%"
            height="auto"
            alt="advert"
            src={`${serverUrl}/assests/info4.jpeg`}
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main}>Shivanshu and company</Typography>
                <Typography color={medium}>Shivanshubhargava.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Shivanshu's companies information and some random text related to the company
                and some more random text regarding the ad
            </Typography>
        </WidgetWrapper>
    )
};

export default AdvertWidget;