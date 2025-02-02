"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import RadioListDropdown from "@/app/components/common/inputs/RadioListDropdown";

const BookingOtherFilter = () => {
    const { bookings, general } = useDictionaryContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // Options for the dropdown
    const OtherOptions = [
        { label: bookings.withVin, value: "withVin", group: "vin" },
        { label: bookings.withoutVin, value: "withoutVin", group: "vin" },
        { label: bookings.packageReceived, value: "packageReceived", group: "package" },
        { label: bookings.packageNotReceived, value: "packageNotReceived", group: "package" },
    ];

    // Initialize state from query parameters
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const initialOptions: string[] = [];

        if (params.get("withoutVin") === "true") initialOptions.push("withoutVin");
        if (params.get("withoutVin") === "false") initialOptions.push("withVin");
        if (params.get("packageNotReceived") === "true") initialOptions.push("packageNotReceived");
        if (params.get("packageNotReceived") === "false") initialOptions.push("packageReceived");

        setSelectedOptions(initialOptions);
    }, [searchParams]);

    // Handle selection changes
    const handleSelectionChange = (selected: string[]) => {
        setSelectedOptions(selected);

        const params = new URLSearchParams(searchParams.toString());

        if (selected.includes("withVin")) params.set("withoutVin", "false");
        else if (selected.includes("withoutVin")) params.set("withoutVin", "true");
        else params.delete("withoutVin");

        if (selected.includes("packageReceived")) params.set("packageNotReceived", "false");
        else if (selected.includes("packageNotReceived")) params.set("packageNotReceived", "true");
        else params.delete("packageNotReceived");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <RadioListDropdown
            title={general.other}
            options={OtherOptions}
            selectedOptions={selectedOptions}
            onChange={handleSelectionChange}
        />
    );
};

export default BookingOtherFilter;