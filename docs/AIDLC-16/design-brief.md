# AIDLC-16 Design Brief

## Jira Story

- Key: AIDLC-16
- Summary: Change Banana Juice (1000ml) price to 2.49 in Juice Shop demo

## Product-Safe Assumption

The requested price change applies only to the default seeded/demo catalog entry for `Banana Juice (1000ml)`. No translated product names, challenge behavior, or unrelated product data should change.

## Scope

- Update the default product seed price for `Banana Juice (1000ml)` to `2.49`.
- Update existing validation coverage that asserts the configured Banana Juice price.
- Avoid localization changes and avoid introducing or modifying challenges.

## Security Considerations

This is a static catalog data change. It does not alter authentication, authorization, input handling, challenge mechanics, or intentionally vulnerable behavior.
