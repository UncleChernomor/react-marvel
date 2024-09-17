import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true);
        setError(null);
        try {
                const response = await fetch(url, {method, body, headers});
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (e) {
                setError(e.message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError};
}