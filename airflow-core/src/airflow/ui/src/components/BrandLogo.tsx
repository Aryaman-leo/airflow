import { Box, Image, type BoxProps } from "@chakra-ui/react";
import { useState } from "react";

import { useConfigServiceGetConfig } from "openapi/queries";
import { AirflowPin } from "src/assets/AirflowPin";

export const BrandLogo = (props: BoxProps) => {
  const { data } = useConfigServiceGetConfig();
  const [failed, setFailed] = useState(false);

  const logo = data?.sections
    ?.find((section) => section.name === "api")
    ?.options.find((option) => option.key === "custom_logo")?.value as string | undefined;

  if (!logo || failed) {
    return (
      <Box {...props}>
        <AirflowPin />
      </Box>
    );
  }

  return (
    <Image src={logo} alt="Airflow Logo" objectFit="contain" onError={() => setFailed(true)} {...props} />
  );
};
