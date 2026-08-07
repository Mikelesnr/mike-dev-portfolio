import React, { useEffect, useState } from "react";

function getHarareTime() {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Harare",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date());
}

export default function TimezoneBadge() {
    const [time, setTime] = useState(getHarareTime());

    useEffect(() => {
        const interval = setInterval(() => setTime(getHarareTime()), 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <p className="timezone-badge">
            <span className="timezone-badge-dot"></span>
            {time} CAT (UTC+2) in Harare — happy to work across time zones
        </p>
    );
}
