import { useState, useRef } from "react";
import Cookies from 'js-cookie';
import { usePathname } from "next/navigation";
import axios, { CancelTokenSource } from "axios";

const useGet = (endPoint: string): any => {
    const cancelTokenRef = useRef<CancelTokenSource | null>(null);

    const pathname = usePathname();
    const langCurrent = pathname?.slice(1, 3) || 'en';
    const headers = {
        'Content-Type': 'application/json',
        'Accept-Language': langCurrent || 'en', // Set the Accept-Language header
    }
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getData = () => {
        // Cancel the previous request if it exists
        if (cancelTokenRef.current) {
            cancelTokenRef.current.cancel("Request canceled due to a new request.");
        }
        // Create a new cancel token
        cancelTokenRef.current = axios.CancelToken.source();


        setSuccessMessage("");
        setErrorMessage("")
        setSuccess(false);
        setLoading(true);
        axios
            .get(endPoint, {
                headers, cancelToken: cancelTokenRef.current.token
            })
            .then((res: any) => {
                setSuccess(true);
                setLoading(false);
                setData(res.data?.data);
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000);
            })
            .catch((err: any) => {
                if (axios.isCancel(err)) {
                    console.log("Request canceled:", err.message);
                } else {
                    setLoading(false);
                    console.log(err);

                    setErrorMessage(err.response?.data?.message)
                    setTimeout(() => {
                        setErrorMessage("")
                    }, 3000);
                }
            })
    };

    return [data, loading, getData, success, successMessage, errorMessage, setData];
};

export default useGet;
