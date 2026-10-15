import type { CharacterFeature } from '@/types/character';
import { GiSparkles as FallbackIcon } from 'react-icons/gi';

export const FeatureList = ({ features }: { features: CharacterFeature[] }) => {
  return (
    <div className="space-y-4">
      {features.map((feature) => {
        const FeatureIcon =
          typeof feature.icon === 'function' ? feature.icon : FallbackIcon;

        return (
          <article
            key={feature.id}
            className="flex gap-3 rounded-lg border border-border bg-muted p-4"
          >
            <FeatureIcon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 fill-primary text-primary"
            />

            <div>
              <h3 className="font-bold text-foreground">{feature.title}</h3>

              <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
