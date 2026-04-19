# FlexMLS Field Inventory (MVP Top 30-50)

This document tracks the prioritized fields for the MLS App MVP, identifying whether they are fillable via Path A (API) or Path B (DOM Injection).

| Priority | Field Name | MLS Field ID (if known) | Type | Path A (API) | Path B (DOM) | Notes |
|----------|------------|-------------------------|------|--------------|--------------|-------|
| 1 | Listing Price | listing_price | Currency | [ ] | [x] | Core |
| 2 | Street Address | street_address | Text | [ ] | [x] | Core |
| 3 | City | city | Text | [ ] | [x] | Core |
| 4 | Zip Code | zip_code | Text | [ ] | [x] | Core |
| 5 | Bedrooms | bedrooms | Int | [ ] | [x] | Core |
| 6 | Bathrooms | bathrooms | Float | [ ] | [x] | Core |
| 7 | Square Footage | sqft | Int | [ ] | [x] | Core |
| 8 | Public Remarks | public_remarks | LongText | [ ] | [x] | AI Generated |
| 9 | Private Remarks | agent_remarks | LongText | [ ] | [x] | Internal notes |
| 10 | Listing Date | listing_date | Date | [ ] | [x] | |
| 11 | Expiration Date | exp_date | Date | [ ] | [x] | |
| 12 | Property Type | prop_type | Dropdown | [ ] | [x] | |
| 13 | School District | school_dist | Dropdown | [ ] | [x] | High impact |
| 14 | Garage Spaces | garage_spaces | Int | [ ] | [x] | |
| 15 | Basement (Y/N) | basement_yn | Boolean | [ ] | [x] | |
| 16 | Year Built | year_built | Int | [ ] | [x] | |
| 17 | Lot Size | lot_size | Text | [ ] | [x] | |
| 18 | Tax ID | tax_id | Text | [ ] | [x] | |
| 19 | HOA Fee | hoa_fee | Currency | [ ] | [x] | |
| 20 | Waterfront (Y/N) | water_yn | Boolean | [ ] | [x] | |

## Next Steps (T0-2)
- [ ] Capture real FlexMLS CSS selectors for Path B.
- [ ] Verify Spark API write permissions for each field for Path A.
- [ ] Map additional 10-30 fields (Basement details, HVAC, etc).
