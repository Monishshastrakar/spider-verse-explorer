import test from "node:test";
import assert from "node:assert/strict";

import { CHARACTERS, getCharacterBySlug, getRelatedCharacters } from "../src/data/characters.ts";

test("Character Dataset contains at least 8 required characters with complete schemas", () => {
  assert.ok(CHARACTERS.length >= 8, `Expected at least 8 characters, got ${CHARACTERS.length}`);

  const requiredSlugs = [
    "miles-morales",
    "peter-parker",
    "gwen-stacy",
    "miguel-ohara",
    "hobie-brown",
    "pavitr-prabhakar",
    "peni-parker",
    "spider-man-noir",
  ];

  for (const slug of requiredSlugs) {
    const char = CHARACTERS.find((c) => c.slug === slug);
    assert.ok(char, `Missing required character: ${slug}`);
    assert.ok(char.name, `Missing name for ${slug}`);
    assert.ok(char.universeId, `Missing universeId for ${slug}`);
    assert.ok(char.universeLabel, `Missing universeLabel for ${slug}`);
    assert.ok(char.powers && char.powers.length > 0, `Missing powers for ${slug}`);
    assert.ok(char.biography, `Missing biography for ${slug}`);
    assert.ok(char.traits && char.traits.length > 0, `Missing traits for ${slug}`);
    assert.ok(char.image, `Missing image for ${slug}`);
    assert.ok(char.stats, `Missing stats for ${slug}`);
    assert.ok(char.relatedCharacterSlugs && char.relatedCharacterSlugs.length > 0, `Missing relatedCharacterSlugs for ${slug}`);
  }
});

test("Filtering by universeId", () => {
  const earth65 = CHARACTERS.filter((c) => c.universeId === "earth-65");
  assert.equal(earth65.length, 1);
  assert.equal(earth65[0].name, "Gwen Stacy");

  const earth1610 = CHARACTERS.filter((c) => c.universeId === "earth-1610");
  assert.equal(earth1610.length, 1);
  assert.equal(earth1610[0].name, "Miles Morales");
});

test("Sorting by name (ascending & descending)", () => {
  const asc = [...CHARACTERS].sort((a, b) => a.name.localeCompare(b.name));
  const desc = [...CHARACTERS].sort((a, b) => b.name.localeCompare(a.name));

  assert.equal(asc[0].name, "Gwen Stacy");
  assert.equal(asc[asc.length - 1].name, "Peter Parker");
  assert.equal(desc[0].name, "Peter Parker");
  assert.equal(desc[desc.length - 1].name, "Gwen Stacy");
});

test("getCharacterBySlug lookup", () => {
  const miles = getCharacterBySlug("miles-morales");
  assert.ok(miles);
  assert.equal(miles.alias, "Spider-Man");

  const unknown = getCharacterBySlug("invalid-slug-404");
  assert.equal(unknown, undefined);
});

test("getRelatedCharacters resolves related slugs", () => {
  const miles = getCharacterBySlug("miles-morales");
  assert.ok(miles);
  const related = getRelatedCharacters(miles.relatedCharacterSlugs);
  assert.ok(related.length > 0);
  assert.ok(related.some((c) => c.slug === "gwen-stacy"));
});
