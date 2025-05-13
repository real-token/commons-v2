import { Flex, Image, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface ExplainTransactionHeaderProps {
  url: string;
}
export const ExplainTransactionHeader = ({
  url,
}: ExplainTransactionHeaderProps) => {
  const [favicon, setFavicon] = useState<string | null>(null);
  const fetchFavicon = async (url: string) => {
    try {
      // Extract domain from URL
      const domain = new URL(url).origin;

      // If no direct favicon found, try to parse HTML head
      const response = await fetch(domain);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Look for favicon in link tags
      const linkTags = doc.getElementsByTagName("link");
      // Convert HTMLCollection to an array before iteration
      for (const tag of Array.from(linkTags)) {
        const rel = tag.getAttribute("rel")?.toLowerCase();
        if (rel === "icon" || rel === "shortcut icon") {
          const href = tag.getAttribute("href");
          if (href) {
            // Handle relative and absolute URLs
            return href.startsWith("http") ? href : `${domain}${href}`;
          }
        }
      }

      // Return null if no favicon found
      return null;
    } catch (err) {
      console.error("Error fetching favicon:", err);
      return null;
    }
  };

  useEffect(() => {
    fetchFavicon(url).then((favicon) => {
      if (favicon) setFavicon(favicon);
    });
  }, [url]);

  return (
    <Paper withBorder p={"sm"}>
      <Flex gap={"sm"} align={"center"}>
        <Image src={favicon} width={20} height={20} />
        <Text fw={500}>{url}</Text>
      </Flex>
    </Paper>
  );
};
