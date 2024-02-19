import { TextGenerateEffect } from "../text-generate-effect";

export function Hero() {
  return (
    <section className="text-center">
      <TextGenerateEffect
        words="Notion Note"
        textClassName="text-foreground text-4xl bg-clip-text bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
      />
    </section>
  );
}
