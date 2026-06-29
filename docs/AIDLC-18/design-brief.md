# AIDLC-18 Design Brief

## Jira Story

- Key: AIDLC-18
- Summary: Change Apple Juice (1000ml) value to 1.99

## Goal

Update the seeded Juice Shop demo product data so Apple Juice (1000ml) uses a value of 1.99 everywhere product values are derived from the default product data.

## Product-Safe Assumption

The story uses "value" for an existing product catalog numeric field. In the current product data, this maps to the product `price`. The story does not ask for new vulnerabilities, new challenges, challenge behavior changes, or localization changes.

## Scope

- Find the canonical seeded product data for Apple Juice (1000ml).
- Update its price to 1.99.
- Update focused tests that assert the previous Apple Juice price.

## Out of Scope

- New challenge creation or challenge metadata changes.
- Translation file edits.
- API or checkout behavior changes beyond the data value.
