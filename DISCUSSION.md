https://github.com/mattfortuna/solace-candidate-assignment/pull/1

All changes described in PR.

With more time, I would:

- Change the pagination on the server side and include search terms in the api with paginated responses
- Continue improving the UI, with better font styling, more consistently sized tables so they don't change upon search,
- Error Handling throughout, especially on load and with api calls
- Unit tests
- Caching/Rate limiting on the backend to reduce load on the backend
- Add a loading indicator for table.
- Debounce on search input to avoid searching every keystroke
- Jump to a certain page in pagination (allow user to enter)
- Server side filtering for search logic (rather than client side)
- Memoize the table to prevent unnecessary rerenders
- Screen Reader/Accessibility, add aria-labels to each of the inputs/buttons