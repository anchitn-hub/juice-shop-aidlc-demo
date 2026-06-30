# AIDLC-19 Design Brief

## Jira Story

- Key: AIDLC-19
- Summary: Change Apple Juice (1000ml) price to 2.99

## Problem

Apple Juice (1000ml) currently uses an outdated configured price. The catalog, basket, and checkout totals should use the updated price of 2.99.

## Scope

- Update the configured price for Apple Juice (1000ml) to 2.99.
- Update relevant tests or fixtures that assert the old price.
- Do not change any other product price.

## Product-Safe Assumptions

- This is a catalog seed data change, not a new challenge or vulnerability change.
- No localization changes are required because the visible product name already exists.
- Basket and checkout totals derive from the configured product price, so updating the source product data is the smallest implementation path unless inspection shows duplicated pricing fixtures.

## Security Considerations

OWASP Juice Shop intentionally contains vulnerabilities for training. This story does not request new challenge behavior or security behavior, so the implementation should avoid modifying challenge logic, authentication, authorization, or payment flows.
