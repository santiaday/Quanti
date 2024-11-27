export const extractUrlParametersFromCurrentUrl = (
    properties: { [key: string]: any },
    currentUrl: string
): { [key: string]: any } => {
    try {
        const url = new URL(currentUrl); // Parse the URL
        url.searchParams.forEach((value, key) => {
            properties[key] = value; 
        });
    } catch (error) {
        console.error("Invalid URL provided:", error);
    }
    return properties;
};
