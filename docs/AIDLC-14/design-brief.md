# AIDLC-14 Design Brief

## Jira Story

- Key: AIDLC-14
- Summary: Change Banana Juice (1000ml) price to 2.49

## Goal

Update the seeded Juice Shop demo product data so Banana Juice (1000ml) uses a price of 2.49 everywhere product prices are derived from the seed data.

## Product-Safe Assumption

The story only requests an existing product price update. It does not ask for new vulnerabilities, new challenges, challenge behavior changes, or localization changes.

## Scope

- Find the canonical seeded product data for Banana Juice (1000ml).
- Update its price to 2.49.
- Update focused tests or fixtures that assert the old price.

## Out of Scope

- New challenge creation or challenge metadata changes.
- Translation file edits.
- API or checkout behavior changes beyond the data value.
