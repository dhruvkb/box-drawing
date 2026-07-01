import { ActionPanel, Action, Grid } from "@raycast/api";
import type { Color, Dataset } from "@/types";
import dataset from "../assets/dataset.json";

function GridItem({ item }: { item: Color }) {
  return (
    <Grid.Item
      key={item.token}
      content={{ color: item.hex }}
      title={item.name}
      subtitle={item.hex}
      keywords={[item.token, item.hex]}
      actions={
        <ActionPanel>
          <Action.Paste content={item.hex} />
          <Action.CopyToClipboard title="Copy Hex" content={item.hex} />
          <Action.CopyToClipboard title="Copy RGB" content={item.rgb} />
          <Action.CopyToClipboard title="Copy HSL" content={item.hsl} />
          <Action.CopyToClipboard title="Copy OKLCH" content={item.oklch} />
          <Action.CopyToClipboard title="Copy Token" content={item.token} />
          <Action.OpenInBrowser title="Tailwind CSS Colors" url="https://tailwindcss.com/docs/colors" />
        </ActionPanel>
      }
    />
  );
}

export default function Command() {
  return (
    <Grid columns={11} inset={Grid.Inset.Large}>
      {(dataset as Dataset).map((section) => (
        <Grid.Section key={section.title} title={section.title} aspectRatio="1" fit={Grid.Fit.Fill}>
          {section.items.map((item) => (
            <GridItem key={item.token} item={item} />
          ))}
        </Grid.Section>
      ))}
    </Grid>
  );
}
