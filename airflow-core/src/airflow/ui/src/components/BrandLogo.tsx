import { Box, Image, type BoxProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { useConfigServiceGetConfig } from "openapi/queries";
import { AirflowPin } from "src/assets/AirflowPin";

export const BrandLogo = (props: BoxProps) => {
  const { data } = useConfigServiceGetConfig();
  const [isValid, setIsValid] = useState(false);

  const rawLogo = data
    ? data.sections
        .find((section) => section.name === "api")
        ?.options.find((option) => option.key === "custom_logo")?.value
    : undefined;

  const logo = typeof rawLogo === "string" ? rawLogo : Array.isArray(rawLogo) ? rawLogo[0] : undefined;

  useEffect(() => {
    if (typeof logo !== "string" || logo.trim() === "") {
      setIsValid(false);
      return;
    }

    const img = new window.Image();
    img.src = logo;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [logo]);

  if (!isValid) {
    return (
      <Box {...props}>
        <AirflowPin />
      </Box>
    );
  }

  return <Image alt="Airflow Logo" objectFit="contain" src={logo} {...props} />;
};
