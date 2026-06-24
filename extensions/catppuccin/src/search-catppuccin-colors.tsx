import { useState } from "react";
import { ActionPanel, Action, Grid } from "@raycast/api";
import type { Color, Dataset } from "@/types";
import { useColorFormatting } from "@/hooks/use-color-formatting";
import dataset from "../assets/dataset.json";

function GridItem({ item }: { item: Color }) {
  const { rgb, hsl, oklch } = useColorFormatting(item);
  return (
    <Grid.Item
      key={`${item.hex}-${item.name}`}
      content={{ color: item.hex }}
      title={item.name}
      subtitle={item.hex}
      keywords={[item.hex]}
      actions={
        <ActionPanel>
          <Action.Paste content={item.hex} />
          <Action.CopyToClipboard title="Copy Hex" content={item.hex} />
          <Action.CopyToClipboard title="Copy RGB" content={rgb} />
          <Action.CopyToClipboard title="Copy HSL" content={hsl} />
          <Action.CopyToClipboard title="Copy OKLCH" content={oklch} />
          <Action.OpenInBrowser title="Catppuccin Palette" url="https://catppuccin.com/palette/" />
        </ActionPanel>
      }
    />
  );
}

export default function Command() {
  const [flavor, setFlavor] = useState("mocha");
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Grid
      columns={7}
      inset={Grid.Inset.Large}
      isLoading={isLoading}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Flavor"
          storeValue
          onChange={(newValue) => {
            setFlavor(newValue);
            setIsLoading(false);
          }}
        >
          <Grid.Dropdown.Item title="Latte" value={"latte"} />
          <Grid.Dropdown.Item title="Frappé" value={"frappe"} />
          <Grid.Dropdown.Item title="Macchiato" value={"macchiato"} />
          <Grid.Dropdown.Item title="Mocha" value={"mocha"} />
        </Grid.Dropdown>
      }
    >
      {!isLoading &&
        (dataset as Dataset)[flavor]?.map((section) => (
          <Grid.Section key={section.title} title={section.title} aspectRatio="1" fit={Grid.Fit.Fill}>
            {section.items.map((item) => (
              <GridItem key={item.hex} item={item} />
            ))}
          </Grid.Section>
        ))}
    </Grid>
  );
}
