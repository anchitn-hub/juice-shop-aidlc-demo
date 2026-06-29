# AIDLC-17 Design Brief

## Jira Story

- Key: AIDLC-17
- Summary: Change Berry Juice (1000ml) value to 1.05

## Product-Safe Assumption

The requested value change means the default seeded/demo catalog price for `Berry Juice (1000ml)` should be updated to `1.05`. No translated product names, challenge behavior, or unrelated product data should change.

## Scope

- Update the default product seed price for `Berry Juice (1000ml)` to `1.05`.
- Add focused validation coverage that asserts the configured Berry Juice price.
- Avoid localization changes and avoid introducing or modifying challenges.

## Security Considerations

This is a static catalog data change. It does not alter authentication, authorization, input handling, challenge mechanics, or intentionally vulnerable behavior.
