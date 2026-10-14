import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, Flame } from 'lucide-react';
import { CATEGORIES, RESTAURANT, type Dish, type MenuCategory } from './data/categories';
import { VolcanoBackground } from './components/VolcanoBackground';
import devil from './assets/images/diablo2-cutout.webp';
import devilSitting from './assets/images/diablo1-cutout.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

// Acomodo tipo mosaico: una tarjeta ancha y luego dos chicas, repitiendo.
// Si la última queda sola en su fila, también se hace ancha para no dejar huecos.
function isWide(index: number, total: number) {
  return index % 3 === 0 || (index === total - 1 && index % 3 === 1);
}

// Cuánto dura la intro de fuego antes de mostrar el menú.
const INTRO_MS = 2400;

export default function App() {
  const [selected, setSelected] = useState<MenuCategory | null>(null);
  const [intro, setIntro] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (!intro) return;
    const timer = setTimeout(() => setIntro(false), INTRO_MS);
    return () => clearTimeout(timer);
  }, [intro]);

  // El botón "atrás" del celular cierra la categoría en lugar de salir del menú.
  useEffect(() => {
    const onPop = () => setSelected(null);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
  }, [selected]);

  const open = (cat: MenuCategory) => {
    history.pushState({ category: cat.id }, '');
    setSelected(cat);
  };
  const close = () => history.back();

  return (
    <div className="min-h-dvh bg-black text-white">
      <VolcanoBackground intro={intro} />

      <AnimatePresence>
        {intro && <IntroScreen onSkip={() => setIntro(false)} />}
      </AnimatePresence>

      {!intro && (
        <motion.main
          animate={{ opacity: selected ? 0 : 1, scale: selected ? 0.96 : 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={`relative mx-auto max-w-md px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] ${
            selected ? 'pointer-events-none' : ''
          }`}
        >
          <div className="flex flex-col items-center pb-4 pt-[calc(2.5rem+env(safe-area-inset-top))] text-center">
            <motion.div
              layoutId="logo"
              transition={{ duration: 0.9, ease: EASE }}
              className="grid h-28 w-28 place-items-center fire-border rounded-full bg-black"
            >
              <span className="text-3xl font-bold tracking-wider">{RESTAURANT.initials}</span>
            </motion.div>
            <motion.h1
              layoutId="name"
              transition={{ duration: 0.9, ease: EASE }}
              className="mt-5 text-2xl font-semibold tracking-wide"
            >
              {RESTAURANT.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="mt-1 text-sm uppercase tracking-[0.2em] text-white/40"
            >
              {RESTAURANT.tagline}
            </motion.p>
          </div>

          {/* Diablito sentado sobre el borde de los recuadros de categorías. */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { delay: 0.35, type: 'spring', stiffness: 240, damping: 15 },
            }}
            className="pointer-events-none relative z-10 -mb-7 flex justify-center"
          >
            <motion.img
              src={devilSitting}
              alt=""
              animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 drop-shadow-[0_6px_18px_rgba(255,60,0,0.45)]"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat, i) => {
              const wide = isWide(i, CATEGORIES.length);
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.45 + i * 0.07, duration: 0.7, ease: EASE } }}
                  whileTap={{ scale: 0.97 }}
                onClick={() => open(cat)}
                  className={`fire-border relative rounded-2xl text-left ${
                    wide ? 'col-span-2 aspect-[16/9]' : 'aspect-[3/4]'
                  }`}
                >
                  <motion.div
                    layoutId={`cover-${cat.id}`}
                    style={{ borderRadius: 16 }}
                    className="absolute inset-0 overflow-hidden bg-neutral-900"
                  >
                    <motion.img
                      layout
                      src={cat.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  </motion.div>
                  <div className={`absolute inset-x-0 bottom-0 ${wide ? 'p-4' : 'p-3'}`}>
                    <h2 className={`font-semibold ${wide ? 'text-xl' : 'text-base'}`}>{cat.name}</h2>
                    <p className={`text-white/60 ${wide ? 'text-sm' : 'text-xs'}`}>{cat.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.main>
      )}

      <AnimatePresence>
        {selected && <CategoryView key={selected.id} category={selected} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}

function IntroScreen({ onSkip }: { onSkip: () => void }) {
  return (
    <motion.div
      onClick={onSkip}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        layoutId="logo"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8, ease: EASE } }}
        transition={{ duration: 0.9, ease: EASE }}
        className="grid h-40 w-40 place-items-center fire-border rounded-full bg-black"
      >
        <span className="text-5xl font-bold tracking-wider">{RESTAURANT.initials}</span>
      </motion.div>
      <motion.h1
        layoutId="name"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, ease: EASE } }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mt-6 px-6 text-3xl font-bold tracking-wide [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]"
      >
        {RESTAURANT.name}
      </motion.h1>
    </motion.div>
  );
}

function CategoryView({ category, onClose }: { category: MenuCategory; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-20 overflow-y-auto overscroll-contain">
      <div className="mx-auto max-w-md pb-[calc(2rem+env(safe-area-inset-bottom))]">
        {/* Portada: crece desde la tarjeta que se tocó. */}
        <div className="relative h-[46svh] min-h-72">
          <motion.div
            layoutId={`cover-${category.id}`}
            style={{ borderRadius: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-0 overflow-hidden bg-neutral-900 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
          >
            <motion.img
              layout
              src={category.image}
              alt=""
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.button
            onClick={onClose}
            aria-label="Volver al menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="absolute left-4 top-[calc(env(safe-area-inset-top)+12px)] grid h-11 w-11 place-items-center rounded-full bg-black/50 backdrop-blur-md active:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          {/* El diablito presenta la categoría con la mano hacia la información. */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end gap-2 pl-2 pr-5">
            <motion.div
              initial={{ opacity: 0, y: 80, rotate: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: { delay: 0.45, type: 'spring', stiffness: 260, damping: 16 },
              }}
              exit={{ opacity: 0, y: 40, transition: { duration: 0.15 } }}
              className="-mb-8 w-28 shrink-0"
            >
              <motion.img
                src={devil}
                alt=""
                animate={{ y: [0, -6, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full drop-shadow-[0_6px_18px_rgba(255,60,0,0.45)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.6, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="min-w-0 pb-2"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-orange-400">
                {category.dishes.length} platillos
              </p>
              <h1 className="mt-1 text-3xl font-bold leading-tight tracking-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.8)]">
                {category.name}
              </h1>
              <p className="mt-1 text-sm text-white/70">{category.description}</p>
            </motion.div>
          </div>
        </div>

        <ul className="mt-10 space-y-3 px-4">
          {category.dishes.map((dish, i) => (
            <motion.li
              key={dish.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35 + i * 0.06, duration: 0.5, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <DishRow dish={dish} />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DishRow({ dish }: { dish: Dish }) {
  return (
    <article className="fire-border rounded-2xl bg-neutral-950 p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold leading-snug">{dish.name}</h3>
        <span className="shrink-0 text-base font-semibold tabular-nums text-orange-400">${dish.price}</span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-white/60">{dish.description}</p>
      {(dish.tag || dish.spicy) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {dish.tag && (
            <span className="rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-orange-300">
              {dish.tag}
            </span>
          )}
          {!!dish.spicy && (
            <span
              className="flex items-center gap-0.5 rounded-full bg-red-500/15 px-2 py-1 text-red-400"
              aria-label={dish.spicy > 1 ? 'Muy picante' : 'Picante'}
            >
              {Array.from({ length: dish.spicy }, (_, k) => (
                <Flame key={k} className="h-3.5 w-3.5" />
              ))}
            </span>
          )}
        </div>
      )}
    </article>
  );
}
