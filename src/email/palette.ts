// Colours for the consultation email. Email apps don't support CSS variables,
// so the email can't use the site's colour names directly. These copy the
// values from the `@theme` block in src/index.css: change both together.
export const emailColors = {
  ink: "#2b2220",
  inkSoft: "#4a3c37",
  subtle: "#6b5a53",
  bronze: "#7a5c2b",
  espresso: "#3e302b",
  white: "#ffffff",
  paper: "#fffdf9",
  cream: "#fbf8f4",
  linen: "#fcf6ee",
  sand: "#f3ebe2",
  line: "#ece3d9",
  onDark: "#e6dacd",
};

/** An espresso-tinted shadow colour, e.g. espressoShadow(0.14). */
export function espressoShadow(opacity: number) {
  return `rgba(62, 48, 43, ${opacity})`;
}
