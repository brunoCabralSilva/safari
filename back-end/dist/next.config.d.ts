declare const headers: {
    trailingSlash: boolean;
    headers(): Promise<{
        source: string;
        headers: {
            key: string;
            value: string;
        }[];
    }[]>;
    redirects(): Promise<any[]>;
};
export default headers;
