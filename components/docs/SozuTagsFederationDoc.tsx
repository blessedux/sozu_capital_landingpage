import {
  sozuTagsFederationMeta,
  sozuTagsFederationSections,
} from "@/content/docs/sozu-tags-federation";
import { DocsLayout } from "./DocsLayout";
import { DocBlocks } from "./DocBlocks";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function SozuTagsFederationDoc() {
  const toc = sozuTagsFederationSections.map((s) => ({
    id: s.id,
    title: s.title,
  }));

  return (
    <DocsLayout
      title={sozuTagsFederationMeta.title}
      description={sozuTagsFederationMeta.description}
      updated={sozuTagsFederationMeta.updated}
      toc={toc}
    >
      {sozuTagsFederationSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 mb-14 md:mb-16 pb-14 md:pb-16 border-b border-white/10 last:border-0 last:pb-0"
        >
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white mb-6">
            {section.title}
          </h2>
          {section.id === "architecture" ? (
            <>
              <ArchitectureDiagram />
              <DocBlocks blocks={section.blocks} />
            </>
          ) : (
            <DocBlocks blocks={section.blocks} />
          )}
        </section>
      ))}
    </DocsLayout>
  );
}
