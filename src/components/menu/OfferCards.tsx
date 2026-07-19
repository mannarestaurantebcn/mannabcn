import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionary";

function formatPrice(price: number) {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

function PriceRow({ label, price }: { label: string; price: number }) {
  return (
    <li className="group -mx-2 flex items-baseline justify-between gap-4 rounded-sm px-2 py-1.5 text-[0.85rem] transition-colors duration-200 hover:bg-charcoal/5">
      <span className="text-charcoal/75 transition-colors duration-200 group-hover:text-charcoal">{label}</span>
      <span className="font-display shrink-0 text-charcoal transition-colors duration-200 group-hover:text-gold">
        {formatPrice(price)}
      </span>
    </li>
  );
}

function DishList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-charcoal/40">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="text-[0.85rem] leading-snug text-charcoal/75">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type OfferCardsProps = {
  breakfast: Dictionary["menu"]["breakfastOffer"];
  menuDelDia: Dictionary["menu"]["menuDelDia"];
};

export function OfferCards({ breakfast, menuDelDia }: OfferCardsProps) {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-2 lg:items-stretch">
      <Reveal delay={1} className="card-hover border border-gold/40 bg-gold/5 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl italic text-charcoal">{breakfast.label}</h3>
          <span className="text-[0.7rem] uppercase tracking-[0.12em] text-charcoal/45">{breakfast.hours}</span>
        </div>
        <ul className="mt-3 divide-y divide-line">
          {breakfast.options.map((option) => (
            <PriceRow key={option.label} label={option.label} price={option.price} />
          ))}
        </ul>
        <h4 className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-charcoal/40">
          {breakfast.supplementsLabel}
        </h4>
        <ul className="mt-1 divide-y divide-line">
          {breakfast.supplements.map((supplement) => (
            <PriceRow key={supplement.label} label={supplement.label} price={supplement.price} />
          ))}
        </ul>
      </Reveal>

      <Reveal delay={2} className="card-hover border border-gold/40 bg-gold/5 p-6">
        <h3 className="font-display text-xl italic text-charcoal">{menuDelDia.label}</h3>
        <p className="mt-2 text-sm text-charcoal/60">{menuDelDia.note}</p>

        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <DishList title={menuDelDia.primerosLabel} items={menuDelDia.primeros} />
          <DishList title={menuDelDia.segundosLabel} items={menuDelDia.segundos} />
          <DishList title={menuDelDia.postresLabel} items={menuDelDia.postres} />
        </div>

        <ul className="mt-6 divide-y divide-line border-t border-line">
          {menuDelDia.tiers.map((tier) => (
            <li
              key={tier.label}
              className="group -mx-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-sm px-2 py-2 transition-colors duration-200 hover:bg-charcoal/5"
            >
              <span className="text-[0.85rem] text-charcoal/75 transition-colors duration-200 group-hover:text-charcoal">
                {tier.label}
              </span>
              <span className="flex items-baseline gap-3">
                <span className="font-display text-charcoal transition-colors duration-200 group-hover:text-gold">
                  {formatPrice(tier.price)}
                </span>
                {tier.halfPrice !== undefined && (
                  <span className="text-[0.72rem] text-charcoal/45">
                    {menuDelDia.halfMenuLabel} {formatPrice(tier.halfPrice)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
