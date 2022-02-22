import { useCallback, useState, useEffect } from "react";

export default function useService(service, { autoStart, params, onData, onError }) {
    //TODO keep on state the data and error?
    const [isFetching, setIsFetching] = useState(!!autoStart || false);

    const start = useCallback(
        async (p) => {
            try {
                setIsFetching(true);
                const result = await service(p);
                onData(result);
            } catch (error) {
                if (onError) {
                    onError(error);
                }
            } finally {
                setIsFetching(false);
            }
        },
        [service, params]
    );

    useEffect(() => {
        if (autoStart) {
            start(params);
        }
    }, []);

    return [isFetching, start];
}
